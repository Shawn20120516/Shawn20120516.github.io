document.addEventListener('DOMContentLoaded', () => {  
    let targetNumber = Math.floor(Math.random() * 100) + 1;  
    let guessCount = 0; // 记录猜测次数  
    let gameOver = false; // 游戏是否结束  
    const submitBtn = document.getElementById('submitBtn');  
    const message = document.getElementById('message');  
    const guessInput = document.getElementById('guess');  
  
    function handleGuess() {  
        const guess = parseInt(guessInput.value, 10);  
  
        if (isNaN(guess) || guess < 1 || guess > 100) {  
            message.textContent = '请输入一个1到100之间的有效数字。';  
            return;  
        }  
  
        guessCount++; // 每次猜测都增加计数  
  
        if (gameOver) {  
            // 如果游戏已经结束（即已经猜对过），则重置游戏  
            resetGame();  
        }  
  
        if (guess < targetNumber) {  
            message.textContent = `太小了，再试一次！（你已猜了 ${guessCount} 次）`;  
        } else if (guess > targetNumber) {  
            message.textContent = `太大了，再试一次！（你已猜了 ${guessCount} 次）`;  
        } else {  
            message.textContent = `恭喜你，猜对了！你总共猜了 ${guessCount} 次。`;  
            gameOver = true; // 游戏结束  
            submitBtn.textContent = '再来一局';  
            // 无需再次绑定点击事件，因为下面会处理  
        }  
    }  
  
    function resetGame() {  
        targetNumber = Math.floor(Math.random() * 100) + 1;  
        guessCount = 0; // 重置猜测次数  
        gameOver = false; // 游戏未结束  
        guessInput.value = '';  
        message.textContent = '猜一个1到100之间的数字:';  
        submitBtn.textContent = '提交';  
    }  
  
    // 初次加载时，绑定 handleGuess 事件  
    submitBtn.addEventListener('click', handleGuess);  
});