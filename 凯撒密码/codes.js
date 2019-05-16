var codes = "VRPHWLPHV L ZDQW WR FKDW ZLWK BRX,EXW L KDYH QR UHDVRQ WR FKDW ZLWK BRX"

// 全部小写
var lowerCodes = codes.toLowerCase()
var shift = 1
// 使用fromCharCode() 该方法可接受一个指定的 Unicode 值，然后返回一个字符串。
// 生成小写字母顺序表
var generateAlphabet = function() {
    var str = ""
    for (var i = 0; i < 26; i++) {
        str += String.fromCharCode(i + "a".charCodeAt())
    }
    return str
}
var alphabet = generateAlphabet()

// 定义一个 find() 函数, 显示 s2 在 s1 里的位置, 若不存在显示 -1
// 由于下面使用的时候, s1 的范围永远是大于 s2的, 除了空格
var find = function(s1, s2) {
    if (s1.includes(s2)) {
        for (var i = 0; i < s1.length; i++) {
            if (s1[i] == s2) {
                return i
            }
        }
    }
    return -1
}

var rank = function(wordList) {
    var score = 0
    for (var i = 0; i < wordList.length; i++) {
        var word = wordList[i]
        if (words.includes(word)) {
            score++
        }
    }
    var r = score / wordList.length * 100
    r = Math.floor(r)
    console.log(`比率是 ${r}%`)
    return score
}

var showResult = function(shift, shiftMax) {
    for (; shift < shiftMax; shift++) {
        var result = ""
        for (var i = 0; i < lowerCodes.length; i++) {
            var index = find(alphabet, lowerCodes[i])
            if (index == -1) {
                result += " "
            }
            else {
                result += alphabet[(index + shift) % (alphabet.length)]
            }
        }
        var wordList = result.split(' ')
        var score = rank(wordList)
        if (score > 10) {
            console.log(result)
        }
    }
}
showResult(1, alphabet.length)
// while (shift < alphabet.length) {
//     for (var i = 0; i < lowerCodes.length; i++) {
//         var index = find(alphabet, lowerCodes[i])
//         if (index == -1) {
//             result += " "
//         }
//         else {
//             result += alphabet[(index + shift) % (alphabet.length)]
//         }
//     }
//     shift++
//     result += '\n'
// }
// console.log(result);
