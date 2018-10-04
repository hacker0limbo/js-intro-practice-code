var canvas = document.querySelector('#id-canvas')
var context = canvas.getContext('2d')
context.fillText('点击开始游戏', 175, 150)

canvas.addEventListener('click', main, false)
function main() {
    var x = 190
    var y = 280
    var speed = 10

    var bulletSpeed = 5

    var imgFlyer = new Image()
    imgFlyer.src = 'flyer.png'
    context.drawImage(imgFlyer, x, y)

    var imgBullet = new Image()
    imgBullet.src = 'bullet.png'

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
        if (x < 10) {
            o.r1 = false
        }
        else if (x > 370) {
            o.r2 = false
        }
        else if (y < 10) {
            o.r3 = false
        }
        else if (y > 270) {
            o.r4 = false
        }
        return o
    }

    setInterval(function() {
        var restrict = Restrict()
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
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.drawImage(imgFlyer, x, y)
    }, 1000/30)

    function fire() {
        var k = event.key
        var bulletX = x + 5
        var bulletY = y + 5

        if (k == 'j') {
            context.drawImage(imgBullet, bulletX, bulletY)
            // setInterval(function() {
            //     bulletY -= bulletSpeed
            //     context.clearRect(0, 0, canvas.width, canvas.height)
            //     context.drawImage(imgFlyer, x, y)
            //     context.drawImage(imgBullet, bulletX, bulletY)
            // // }, 1000/50)
            // console.log(bulletX);
        }
    }


    // 结束事件监听
    canvas.removeEventListener('click', main)
}
