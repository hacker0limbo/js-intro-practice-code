// Created by Stephen

// clear function
function clearResult1(){
    document.getElementsByName("num_1")[0].value='';
}

function clearResult2(){
    document.getElementsByName("num_2")[0].value='';
}

//验证是否是数字 function of verify it is string-number or not
function validateNum(num){
    var reg=/^(\d+)(\.(\d+))?$/;
    if(isNaN(num) || !reg.test(num)){
        return false;
    }
    return true;
}

//把字符串格式化成数字 function of convert string to numbers
function formatNum(num){
    if(num.indexOf('.') >= 0){
        return parseFloat(num);
    }else {
        return parseInt(num);
    }
}


// calculate function
function calculateResult() {

    var first_num = document.getElementsByName("num_1")[0].value;		// 就算返回的数组里面只有一个元素仍旧是数组, 因此返回该元素仍旧需要
    var second_num = document.getElementsByName("num_2")[0].value;
    var finalResult = document.getElementsByName("num_3")[0].value;

    first_num = formatNum(first_num);
    second_num = formatNum(second_num);

    // Exculde exception

    if(!validateNum(first_num)){
        alert("First Number should be number！");
    }

    if(!validateNum(second_num)){
        alert("Second Number should be number");
    }

    var operaArry = document.getElementsByName("method");
    for (var i = 0; i < operaArry.length; i++) {

        if (operaArry[0].checked == true) {
            finalResult = addition(first_num, second_num);
            console.log(finalResult);  // bug1 can not show the fianl result
        }

        else if (operaArry[1].checked == true) {
            document.getElementsByName("num_3")[0].value = subtraction(first_num, second_num);
        }

        else if (operaArry[2].checked == true) {
            document.getElementsByName("num_3")[0].value = multiplication(first_num, second_num);
        }

        else if (operaArry[3].checked == true) {
            document.getElementsByName("num_3")[0].value = division(first_num, second_num);
        }
    }

}

// 4 operation function
function addition (num1, num2) {
    return num1 + num2;
}

function subtraction (num1, num2) {
    return num1 - num2;
}

function multiplication (num1, num2) {
    return num1 * num2;
}

function division (num1, num2) {
    return num1 / num2;
}
