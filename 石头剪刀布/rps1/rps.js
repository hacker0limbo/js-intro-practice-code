// created by Stephen

var print = function (content) {
    return document.write(content)
}


function user() {
    var check = document.getElementsByName("userChoice")
    for (var i = 0; i < check.length; i++) {

        if (check[0].checked == true) {
            check = check[0].value
        }
        else if (check[1].checked == true) {
            check = check[1].value
        }
        else if (check[2].checked == true) {
            check = check[2].value
        }
    }
    console.log(check);
    return check
}


// computer random result
function computer() {
    var computerChoice = Math.round(Math.random() * 2)
    switch (computerChoice) {
        case 0:
            document.getElementById("computerChoice").value = "rock"
            break;
        case 1:
            document.getElementById("computerChoice").value = "paper"
            break;
        case 2:
            document.getElementById("computerChoice").value = "scissors"
            break;
    }

    console.log(document.getElementById("computerChoice").value);
    return document.getElementById("computerChoice").value
}



// choice1 is user, choice2 is computer

function compare(choice1, choice2) {
    if (choice1 === choice2) {
        document.getElementById("result").value = "平局(Draw)"
    }

    else {

        if (choice1 === "rock" && choice2 === "paper") {
            document.getElementById("result").value = "你输了(You lose)"
        }
        else if (choice1 === "rock" && choice2 === "scissors") {
            document.getElementById("result").value = "你赢了(You win)"
        }
        else if (choice1 === "paper" && choice2 === "scissors") {
            document.getElementById("result").value = "你输了(You lose)"
        }
        else if (choice1 === "paper" && choice2 === "rock") {
            document.getElementById("result").value = "你赢了(You win)"
        }
        else if (choice1 === "scissors" && choice2 === "rock") {
            document.getElementById("result").value = "你输了(You lose)"
        }
        else if (choice1 === "scissors" && choice2 === "paper") {
            document.getElementById("result").value = "你赢了(You win)"
        }
    }
    console.log(document.getElementById("result").value);
}

// main function
// function start() {
//     var userChoice = document.getElementById("userChoice").value
//     if (userChoice != "rock" || userChoice != "scissors" || userChoice != "paper") {
//         alert("Please type rock / scissors / paper")
//     }
//
//     console.log(userChoice)
//     compare(userChoice, computer())
// }

// 使用 radio 更加方便
function start() {
    compare(user(), computer())
}
