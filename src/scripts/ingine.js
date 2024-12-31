const state ={
    view:{
        squares:document.querySelectorAll(".square"),
        enemy:document.querySelector(".enemy"),
        timeLeft:document.querySelector("#time-left"),
        yourScore:document.querySelector("#your-score")
    },
    values:{
        timeId:setInterval(randomSquare,1000),
        gameVelocity: 1000,
        countDownTimerId:setInterval(countDown,1000),
        hitposition:0,
        result:0,
        currentTime:60
    }
}

function playSound(){
    let audio = new Audio("./src/audios/pontos.mp3");
    audio.play();
}

function reset(){
    clearInterval(state.values.countDownTimerId);
    clearInterval(state.values.timeId);
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <=0){
        alert("Game Over Seu tempo Acabou !! Seu resultado foi:" + state.values.result);
        reset();
    }
}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });

    //Sorteando um numero aleatorio
    let randomNumber = Math.floor(Math.random()*9);

    //Pegando um numero aleatorio gerado pelo ramdomNumber e colocando no square
    let randomSquare = state.view.squares[randomNumber];

    randomSquare.classList.add("enemy");
    state.values.hitposition = randomSquare.id;
}


function addListenerHitBox(){
        state.view.squares.forEach((square)=>{
            square.addEventListener("mousedown", ()=>{
               if(square.id === state.values.hitposition){
                    state.values.result ++;
                    state.view.yourScore.textContent = state.values.result;
                    state.values.hitposition = null;
                    playSound();
               }
            })
        });
}


function main(){
   addListenerHitBox();
}

main();
