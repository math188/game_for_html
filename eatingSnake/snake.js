// window.prompt("請輸入您的大名：")



var maps = document.getElementById('maps').getContext('2d');

var cnt = 10;
var snake = [];
var key = 0;
var foodX = 0;
var foodY = 0;
var scoreNum = 0;
var snakeL = 0;


function drawmaps() {
    // 畫蛇添色
    for (var i = 0; i < snake.length; i++) {
        maps.fillStyle = "blue";
        if (i == snake.length - 1) {
            maps.fillStyle = "red";
        }
        maps.fillRect(snake[i]['x'], snake[i]['y'], 20, 20)
    }
    // 畫地圖
    for (let i = 0; i * 20 <= 600; i++) {
        maps.beginPath();
        maps.strokeStyle = "black";
        maps.moveTo(i * 20, 0);
        maps.lineTo(i * 20, 400);
        maps.closePath();
        maps.stroke();
    }
    for (let i = 0; i * 20 <= 400; i++) {
        maps.beginPath();
        maps.strokeStyle = "black";
        maps.moveTo(0, i * 20);
        maps.lineTo(600, i * 20);
        maps.closePath();
        maps.stroke();
    }
    // 畫食物
    maps.fillStyle = 'orange';
    maps.fillRect(foodX, foodY, 20, 20);
    // 更新得分
    document.getElementById('number').innerText = scoreNum;

}

// 移動
function move() {
    switch (key) {
        case 38:
            snake.push({ x: snake[snake.length - 1]['x'], y: snake[snake.length - 1]['y'] - 20 });
            break;
        case 40:
            snake.push({ x: snake[snake.length - 1]['x'], y: snake[snake.length - 1]['y'] + 20 });
            break;
        case 37:
            snake.push({ x: snake[snake.length - 1]['x'] - 20, y: snake[snake.length - 1]['y'] });
            break;
        case 39:
            snake.push({ x: snake[snake.length - 1]['x'] + 20, y: snake[snake.length - 1]['y'] });
            break;
        default:
            snake.push({ x: snake[snake.length - 1]['x'] + 20, y: snake[snake.length - 1]['y'] });
            break;
    }
    snake.shift();
    maps.clearRect(0, 0, 600, 400);
    eatFood();
    beDead();
    drawmaps();
    choose();
}

// 產生食物
function food() {
    foodX = Math.floor(Math.random() * 30) * 20;
    foodY = Math.floor(Math.random() * 20) * 20;
    // 防止食物在自己身上
    for (var obj of snake) {
        if (obj['x'] == foodX && obj['y'] == foodY) {
            food();
        }
    }
}

// 吃到食物
function eatFood() {
    var snakeX = snake[snake.length - 1]['x']
    var snakeY = snake[snake.length - 1]['y']
    if (snakeX == foodX && snakeY == foodY) {
        snake.unshift({ x: snake[0]['x'], y: snake[0]['y'] })
        food();
        getPoint();
    }
}

// 死掉
function beDead() {
    var snakeX = snake[snake.length - 1]['x']
    var snakeY = snake[snake.length - 1]['y']
    if (snakeX < 0 || snakeX >= 600 || snakeY < 0 || snakeY >= 400) {
        alert('登愣！你撞牆囉 居居～')
        alert(`您的得分為${scoreNum}分！`)
        clearInterval(interval);
        window.location.reload();
    }
    for (let i = 0; i < (snake.length - 1); i++) {
        var x = snake[i]['x']
        var y = snake[i]['y']
        if (x == snakeX && y == snakeY) {
            alert('你吃自己 不要也讓蛇蛇吃自己QQ')
            alert(`您的得分為${scoreNum}分！`)
            clearInterval(interval);
            window.location.reload();
        }
        for (var item of snake) {
        }
    }
}

// 難度加速裝置
function choose() {
    if (snake.length == 10 || snakeL == 10) {
        clearInterval(interval);
        interval = window.setInterval(move, 200);
    } else if (snake.length == 15 || snakeL == 15) {
        clearInterval(interval);
        interval = window.setInterval(move, 150);
    } else if (snake.length == 20|| snakeL == 20) {
        clearInterval(interval);
        interval = window.setInterval(move, 100);
    } else if (snake.length == 25) {
        clearInterval(interval);
        interval = window.setInterval(move, 50);
    } else if (snake.length == 30) {
        clearInterval(interval);
        interval = window.setInterval(move, 30);
    }
}

// 加分裝置
function getPoint() {
    if (snake.length < 15) {
        scoreNum += 10;
    } else if (snake.length >= 15 && snake.length < 20) {
        scoreNum += 30;
    } else if (snake.length >= 20 && snake.length < 25) {
        scoreNum += 50;
    } else if (snake.length >= 25 && snake.length < 30) {
        scoreNum += snake.length * 5;
    }
}



// 執行程式從這裡開始：
// 畫蛇(起始座標)
for (var i = 0; i < cnt; i++) {
    snake[i] = { x: i * 20, y: 0 };
}
food();
// 開始
function start() {
    var text = document.getElementById("start").innerText;
    if (text == '開始') {
        key = key;   // 保持原本的行進方向 
        interval = window.setInterval(move, 200);
        text = '暫停';
    } else {
        clearInterval(interval);
        text = '開始';
    }
    document.getElementById("start").innerText = text;
}





// 按按鍵轉彎(javascript)
// document.onkeydown = function (event) {
//     var e = event["keyCode"]  // event 是一個 object
//     keyDown(e);
// };
// function keyDown(e) {    // key 才能傳給 move 函式裡面使用
//     key = e;
// };















