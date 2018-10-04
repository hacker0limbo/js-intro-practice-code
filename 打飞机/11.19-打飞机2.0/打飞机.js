var canvas = document.querySelector('#id-canvas')
var context = canvas.getContext('2d')
context.fillText('Click to start game', 160, 150)

canvas.addEventListener('click', main, false)
function main() {
    // 擦除文字
    context.clearRect(0, 0, canvas.width, canvas.height)
    var x = 190
    var y = 280
    var speed = 10

    var bulletSpeed = 5

    var imageFromPath = function(path) {
        var img = new Image()
        img.src = path
        return img
    }
    //画飞机
    var imgFlyer = imageFromPath('flyer.png')
    context.drawImage(imgFlyer, x, y)

    var imgBullet = imageFromPath('bullet.png')

    var leftDown = false
    var rightDown = false
    var upDown = false
    var belowDown = false

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

        if (k == 'j') {
            context.drawImage(imgBullet, bulletX, bulletY)
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
