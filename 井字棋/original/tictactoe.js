// created by stephen

// var decision = true


// 几个问题
// 1. *** 事件的绑定需要重新改写
// 2. ** 增加 draw 的显示
// 3. ** 一个 box 里面只能改变一次颜色, 意味着实际上一共改变了9次颜色
// 4. (获胜的算法问题是否可以优化)


var counter = 0;
function choice(e) {
    var currentElement = e.target
    if (counter % 2 == 0) {
        // console.log(counter);
        currentElement.style.setProperty('background-color', '#00ffff')
        // decision = false
    }
    else {
        // console.log(counter);
        currentElement.style.setProperty('background-color', '#ff00ff')
        // decision = true
    }
    console.log(currentElement.style.getPropertyValue('background-color'));
    counter++
    win("a", "b", "c")
    win("d", "e", "f")
    win("g", "h", "i")
    win("a", "d", "g")
    win("b", "e", "n")
    win("c", "f", "i")
    win("a", "e", "i")
    win("c", "e", "g")

}

function win(i, j, k) {
    var win1 = document.getElementById(i).style.getPropertyValue('background-color')
    var win2 = document.getElementById(j).style.getPropertyValue('background-color')
    var win3 = document.getElementById(k).style.getPropertyValue('background-color')
    console.log(win1, win2, win3);
    if (win1 == "rgb(0, 255, 255)" && win2 == "rgb(0, 255, 255)" && win3 == "rgb(0, 255, 255)") {
        alert("Blue win")
    }
    if (win1 == "rgb(255, 0, 255)" && win2 == "rgb(255, 0, 255)" && win3 == "rgb(255, 0, 255)") {
        alert("Pink win")
    }
}
