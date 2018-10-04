var canvas = document.querySelector('#id-canvas')
var context = canvas.getContext('2d')
context.fillText('Click to start game', 160, 150)

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

    // 判断 按键是否按下
    var leftDown = false
    var rightDown = false
    var upDown = false
    var belowDown = false

    // 敌机出现
    // 先对一架飞机进行出现, 移动
    function enemyAppear() {
        var enemyX = getRandomInt(imgEnemy.width, canvas.width - imgEnemy.width)
        var enemyY = getRandomInt(0, 0)
        context.drawImage(imgEnemy, enemyX, enemyY)
        setInterval(function() {
            context.clearRect(enemyX, enemyY, imgEnemy.width, imgEnemy.height)
            enemyY += enemySpeed
            context.drawImage(imgEnemy, enemyX, enemyY)
        }, 500)
    }
    // 每次再执行该函数进行多架飞机的出现
    setInterval(enemyAppear, 1000)

    window.addEventListener('keydown', move, false)
    window.addEventListener('keyup', stop, false)
    window.addEventListener('keydown', fire, false)

    function move() {
        var k = event.key
        if (k == 'a') {
            leftDown = true
        }
        else if (k == 'd') {
            rightDown = true
        }
        else if (k == 'w') {
            upDown = true
        }
        else if (k == 's') {
            belowDown = true
        }
    }

    function stop() {
        var k = event.key
        if (k == 'a') {
            leftDown = false
        }
        else if (k == 'd') {
            rightDown = false
        }
        else if (k == 'w') {
            upDown = false
        }
        else if (k == 's') {
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
    setInterval(function() {
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

    function fire() {
        var k = event.key
        var bulletX = x + 5
        var bulletY = y - 3
        // 射击音效
        var audio = document.getElementById('fire-music')
        if (k == 'j') {
            // 发射时候的声音
            audio.play()
            setInterval(function() {
                // 先擦掉子弹
                context.clearRect(bulletX, bulletY, imgBullet.width, imgBullet.height)
                bulletY -= bulletSpeed
                context.drawImage(imgBullet, bulletX, bulletY)
            }, 1000/50)
        }
    }

    // 结束事件监听
    canvas.removeEventListener('click', main)
}

// 增加了敌机的随机出现功能
// 增加了飞机射击时的音效
