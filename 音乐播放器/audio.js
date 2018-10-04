window.onload = function() {
    var main = function() {
        var Music = function() {
            // 相关的变量
            var audio = document.getElementById("music")
            var Src = audio.attributes[1].value // 推测 Src 永远是不会改的, 但是 audio.src 可以改
            var musicName = {
                name1: "And then you.mp3",
                name2: "除了春天爱情和樱花.mp3",
                name3: "fish in the pool.mp3",
            }
            var musicArray = [musicName.name1, musicName.name2, musicName.name3]
            var srcIndex = musicArray.indexOf(Src)
            // 定义一个对象来存储所有有关 music 的数据
            var o = {
                audio: audio,
                Src: Src,
                musicName: musicName,
                musicArray: musicArray,
                srcIndex: srcIndex,
            }
            return o
        }
        // play settings
        var buttons = document.getElementById('btns');
        buttons.addEventListener('click', playSet, false);
        function playSet(e){
            var E = e.target;
            var music = Music()

            if (E.nodeName.toUpperCase() === 'BUTTON') {
                if (E.id == "btn-play") {
                    music.audio.play()
                }
                else if (E.id == "btn-stop") {
                    music.audio.pause()
                }
                else if (E.id == "btn-replay") {
                    music.audio.load()
                }
                else if (E.id == "btn-pre" || E.id == "btn-next") {
                    if (E.id == "btn-pre") {
                        if (music.srcIndex == 0) {
                            music.srcIndex = music.musicArray.length - 1
                        }
                        else {
                            music.srcIndex--
                        }
                    }
                    else {
                        if (music.srcIndex == music.musicArray.length - 1) {
                            music.srcIndex = 0
                        }
                        else {
                            music.srcIndex++
                        }
                    }
                    music.audio.src = music.musicArray[music.srcIndex]
                    document.getElementById("name").innerHTML = "Music Name: " + music.musicArray[music.srcIndex]
                    music.audio.play()
                }
            }
        }
        // music list settings
        var musicList = document.getElementById('music-list');
        musicList.addEventListener('click',listSet,false);
        function listSet(e){
            var E = e.target;
            var music = Music()
            if (E.nodeName.toLowerCase() === 'li') {
                music.audio.src = E.id
                // console.log(E.id);
                // console.log(music.audio.src);
                document.getElementById("name").innerHTML = "Music Name: " + E.id
                music.audio.play()
            }
        }
    }
    main()
}

// 每次加入或者修改歌名都要现在 html 里面修改list name, 再在 js 里面修改 src
// 是否有简单方法可以添加
