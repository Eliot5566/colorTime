var t; // 全局變量存計時
var defaultTimezoneOffset = 0; // 默認時間偏移
var timezoneOffset = defaultTimezoneOffset; // 全局變量存時間偏移量

$(document).ready(function () {
    time(); // 頁面跑好 執行

    function changeTimezone() {
        var newTimezone = prompt('請輸入新的時區（0-24整数）：');
        if (newTimezone !== null && !isNaN(newTimezone)) {
            timezoneOffset = parseInt(newTimezone);
            updateTimeAndColor();
        }
    }

    function updateTimeAndColor() {
        var now = new Date();
        now.setHours(now.getHours() + timezoneOffset);

        var hour = now.getHours();
        var min = now.getMinutes();
        var sec = now.getSeconds();
        var color = timeColor(hour, min, sec);
        //改為12小時制
        if (hour > 12) {
            hour = hour - 12;
        }

        //010203040506070809
        hour = formatTime(hour);
        min = formatTime(min);
        sec = formatTime(sec);

        $('#cur_hour').text(hour);
        $('#cur_min').text(min);
        $('#cur_sec').text(sec);

        $('body').css('background-color', '#' + color);
        $('#cur_color').text(color);
    }

    function time() {
        updateTimeAndColor();
        t = setTimeout(function () {
            time()
        }, 1000);
    }

    function formatTime(i) {
        if (i < 10) {
            i = '0' + i;
        }
        return i;
    }

    function formatColor(i) {
        if (i.length < 2) {
            i = '0' + i;
        }
        return i;
    }

    function timeColor(hour, min, sec) {
        var red = Math.round(255 * (hour / 23)).toString(16);
        var green = Math.round(255 * (min / 59)).toString(16);
        var blue = Math.round(255 * (sec / 59)).toString(16);

        red = formatColor(red);
        green = formatColor(green);
        blue = formatColor(blue);

        return (red + green + blue).toUpperCase();
    }

    //恢復時區
    function resetTimezone() {
        timezoneOffset = defaultTimezoneOffset;
        updateTimeAndColor();
    }

    $('#change_timezone').click(function () {
        changeTimezone();
        $('#reset_timezone').click(function () {
            resetTimezone();
        });
    });

    // 圖片路徑陣列
    var imagePaths = [
        'img/001.png',
        'img/002.png',
        'img/003.png',
        'img/004.png',
        'img/005.png',
        'img/006.png',
        

    ];
    // 設定初始索引
    var currentIndex = 0;

    // 取得 img 元素
    var imageElement = document.getElementById("image");


    // 每秒切換圖片
    setInterval(function () {
        // 更新圖片路徑
        imageElement.src = imagePaths[currentIndex];

        // 增加索引，判斷是否已到最後一張圖片，若是，則重置為第一張圖片
        currentIndex++;
        if (currentIndex >= imagePaths.length) {
            currentIndex = 0;
        }
    }, 1000);
    

    function foo(){
        console.log('a');
        return function(){
            console.log('b')
        }
        setInterval(foo(),1000)
    }
    function foo(){
        console.log('a');
        return function(){
            console.log('b')
        }
        var bar = foo();
        console.log(bar);
    }
})