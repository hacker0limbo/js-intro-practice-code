var canvas = document.querySelector('#id-canvas')
var context = canvas.getContext('2d')
// 开始界面
context.fillText('Click to start game', 160, 150)
// 用户点击了开始文字, 开始加载游戏
canvas.addEventListener('click', main, false)
function main() {
    // 擦除文字
    context.clearRect(0, 0, canvas.width, canvas.height)
    // 获得图像的地址
    var imageFromPath = function(path) {
        var img = new Image()
        img.src = path
        return img
    }

    // 本飞机的坐标, 速度和图像
    var x = 190
    var y = 280
    var speed = 10
    var imgFlyer = imageFromPath('flyer.png')

    // 子弹的速度和图像
    var imgBullet = imageFromPath('bullet.png')
    var bulletSpeed = 5

    // 敌机的图像, 坐标和速度
    var imgEnemy = imageFromPath('enemy.png')
    // 坐标是随机数
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    var enemySpeed = 15

    // 音效
    var audioFire = document.getElementById('fire-music')
    var audioExplode = document.getElementById('explode-music')

    // 判断 按键是否按下
    var leftDown = false
    var rightDown = false
    var upDown = false
    var belowDown = false

    window.addEventListener('keydown', move, false)
    window.addEventListener('keyup', stop, false)
    // 使用 bind 对 addEventListener进行参数传递
    // 结合 callback 函数能够获取到 bulletX, bulletY 的值
    window.addEventListener('keydown', fire.bind(this, function(positionX, positionY) {
        console.log(positionX, positionY);

        var collide2 = collide(positionX, enemyX, positionX, enemyY, imgBullet.height, imgEnemy.height, imgBullet.width, imgEnemy.width)
        if (collide2) {
            context.clearRect(bulletX, bulletY, imgBullet.width, imgBullet.height)
            context.clearRect(enemyX, enemyY, imgEnemy.width, imgEnemy.height)
        }
    }), false)

    function move() {
        var k = event.key
        if (k == 'a' || k == 'A') {
            leftDown = true
        }
        else if (k == 'd' || k == 'D') {
            rightDown = true
        }
        else if (k == 'w' || k == 'W') {
            upDown = true
        }
        else if (k == 's' || k == 'S') {
            belowDown = true
        }
    }

    function stop() {
        var k = event.key
        if (k == 'a' || k == 'A') {
            leftDown = false
        }
        else if (k == 'd' || k == 'D') {
            rightDown = false
        }
        else if (k == 'w' || k == 'W') {
            upDown = false
        }
        else if (k == 's' || k == 'S') {
            belowDown = false
        }
    }

    // 边界判断
    var Restrict = function() {
        var o = {
            r1: true,
            r2: true,
            r3: true,
            r4: true,
        }
        // 这里注意, 不能用 else if 进行判断 因为每一种条件都要进行判断
        if (x < imgFlyer.width / 2) {
            o.r1 = false
        }
        if (x > canvas.width - imgFlyer.width * 1.5) {
            o.r2 = false
        }
        if (y < imgFlyer.height / 2) {
            o.r3 = false
        }
        if (y > canvas.height - imgFlyer.height * 1.5) {
            o.r4 = false
        }
        return o
    }

    // 飞机的移动
    var t1 = setInterval(function() {
        var restrict = Restrict()
        // 先擦再画, 否则飞机的 x 和 y 是无法及时更新的
        context.clearRect(x, y, imgFlyer.width, imgFlyer.height)
        // update x
        if (leftDown && restrict.r1) {
            x -= speed
        }
        else if (rightDown && restrict.r2) {
            x += speed
        }
        else if (upDown && restrict.r3) {
            y -= speed
        }
        else if (belowDown && restrict.r4) {
            y += speed
        }
        // draw
        context.drawImage(imgFlyer, x, y)
    }, 1000/30)

    // 根据飞机的坐标定位发射子弹
    function fire(callback) {
        var k = event.key
        var bulletX = x + 5
        var bulletY = y - 3
        // 射击音效
        if (k == 'j' || k == 'J') {
            // 发射时候的声音
            audioFire.play()
            var t2 = setInterval(function() {
                if (bulletY < 0) {
                    context.save()
                    context.clearRect(bulletX, bulletY, imgBullet.width, imgBullet.height)
                    context.restore()
                    // console.log('子弹的最后位置', bulletY);
                }
                else {
                    // 先擦掉子弹
                    context.clearRect(bulletX, bulletY, imgBullet.width, imgBullet.height)
                    bulletY -= bulletSpeed
                    context.drawImage(imgBullet, bulletX, bulletY)
                }
                // callback 检测子弹
                callback(bulletX, bulletY)
            }, 1000/50)
        }
    }

    // 敌机出现
    // 先对一架飞机进行出现, 移动
     function enemyAppear() {
         var enemyX = getRandomInt(imgEnemy.width, canvas.width - imgEnemy.width)
         var enemyY = getRandomInt(0, 0)
         context.drawImage(imgEnemy, enemyX, enemyY)

         var t3 = setInterval(function() {
             // 首先判断敌机是否在 canvas 的范围里面
             if (enemyY >= canvas.height) {
                 context.clearRect(enemyX, enemyY, imgEnemy.width, imgEnemy.height)
             }
             else if (0 < enemyY < canvas.height) {
                 // 碰撞检测1 飞机撞敌机, 游戏结束
                 var collide1 = collide(x, enemyX, y, enemyY, imgFlyer.height, imgEnemy.height, imgFlyer.width, imgEnemy.width)
                 if (collide1) {
                     // 移除所有事件监听
                     window.removeEventListener('keydown', move)
                     window.removeEventListener('keyup', stop)
                     window.removeEventListener('keydown', fire)

                     // 清除所有的定时器, (这种方法很傻逼, 可是我有那么多定时器也是很无奈啊, 定时器这东西我是真的不会玩啊)
                     for (var i = 1; i < 99999; i++)
                     window.clearInterval(i);

                     // 爆炸音效
                     setTimeout(function() {
                         audioExplode.play()
                         alert('hh, You die')
                     }, 1)

                     // 打印结束的页面
                     context.clearRect(0, 0, canvas.width, canvas.height)
                     context.fillText('Game Over', 160, 150)
                 }
                 else {
                     // 更新敌机的位置
                     context.clearRect(enemyX, enemyY, imgEnemy.width, imgEnemy.height)
                     enemyY += enemySpeed
                     context.drawImage(imgEnemy, enemyX, enemyY)
                 }
             }
         }, 500)
    }
    // 每次再执行该函数进行多架飞机的出现
    var t4 = setInterval(enemyAppear, 1000)

    // 碰撞函数
    function collide(x1, x2, y1, y2, h1, h2, w1, w2) {
        if (x1 + w1 >= x2 && x2 + w2 >= x1 && y1 + h1 >= y2 && y2 + h2 >= y1) {
            return true
        }
    }
    // 结束事件监听
    canvas.removeEventListener('click', main)
}

// 增加了飞机与敌机碰撞的功能, 有结束页面, 也有音效
// 尝试使用callback 进行对子弹, 敌机的坐标进行获取
