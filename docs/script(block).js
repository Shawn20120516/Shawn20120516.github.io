// script.js  
document.addEventListener('mousemove', function(event) {  
    var ball = document.getElementById('ball');  
    var rect = ball.getBoundingClientRect();  
    var root = document.documentElement;  
  
    // 计算鼠标位置相对于视口的位置  
    var mouseX = event.clientX - window.pageXOffset;  
    var mouseY = event.clientY - window.pageYOffset;  
  
    // 限制小球在视口内移动  
    var maxX = root.clientWidth - rect.width;  
    var maxY = root.clientHeight - rect.height;  
  
    // 防止小球超出视口边界  
    var ballX = mouseX - rect.width / 2;  
    var ballY = mouseY - rect.height / 2;  
  
    ballX = Math.max(0, Math.min(maxX, ballX));  
    ballY = Math.max(0, Math.min(maxY, ballY));  
  
    // 设置小球的位置  
    ball.style.left = ballX + 'px';  
    ball.style.top = ballY + 'px';  
});

        let score = 0;  
        let difficulty = 1;  
        let spawnInterval = 1000;  
        let squareSize = 50;  
        let squares = [];  
        let maxSquaresAllowed = 10; // 设置允许的最大方块数量  
        let gameRunning = true; // 游戏运行状态  
  
        function spawnSquare() {  
            if (squares.length -score>= maxSquaresAllowed) {  
                gameOver();  
                return;  
            }  
  
            const square = document.createElement('div');  
            square.classList.add('square');  
            square.style.width = `${squareSize}px`;  
            square.style.height = `${squareSize}px`;  
            square.style.left = `${Math.random() * (window.innerWidth - squareSize)}px`;  
            square.style.top = `${Math.random() * (window.innerHeight - squareSize)}px`;  
  
            square.addEventListener('click', () => {  
                score++;  
                document.getElementById('score').textContent = `得分: ${score}`;  
                square.remove();  
  
                if (score % 10 === 0) {  
                    difficulty++;  
                    adjustDifficulty();  
                }  
            });  
  
            document.body.appendChild(square);  
            squares.push(square);  
        }  
  
        function adjustDifficulty() {  
            spawnInterval = Math.max(100, spawnInterval - difficulty * 50);  
            squareSize = Math.max(20, squareSize - difficulty * 2);  
            clearInterval(gameLoop);  
            gameLoop = setInterval(spawnSquare, spawnInterval);  
        }  
  
        function gameOver() {  
            gameRunning = false;  
            clearInterval(gameLoop);  
            squares.forEach(square => square.remove());  
            squares = [];  
            document.getElementById('game-over').style.display = 'block';  
            document.getElementById('restart-button').style.display = 'block';  
        }  
  
        function restartGame() {  
            score = 0;  
            difficulty = 1;  
            spawnInterval = 1000;  
            squareSize = 50;  
            squares = [];  
            gameRunning = true;  
            document.getElementById('score').textContent = `Score: ${score}`;  
            document.getElementById('game-over').style.display = 'none';  
            document.getElementById('restart-button').style.display = 'none';  
            gameLoop = setInterval(spawnSquare, spawnInterval);  
        }  
  
        let gameLoop = setInterval(spawnSquare, spawnInterval);  
  
        document.getElementById('restart-button').addEventListener('click', restartGame);  
  
        window.addEventListener('resize', () => {  
            if (gameRunning) {  
                squares.forEach(square => {  
                    square.style.left = `${Math.random() * (window.innerWidth - squareSize)}px`;  
                    square.style.top = `${Math.random() * (window.innerHeight - squareSize)}px`;  
                });  
            }  
        });  