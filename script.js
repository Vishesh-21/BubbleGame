let time = 60;
let score = 0;
let count = 0;
let missed = 0;
let number;

// Call this function when the DOM is loaded
window.onload = function () {
  main();
};

// function to make bubbles

function makeBubble() {
  let clutter = "";

  for (let i = 0; i < 98; i++) {
    let number = Math.floor(Math.random() * 10);
    clutter += `<div id="circle">${number}</div>`;
  }

  document.querySelector("#bottombox").innerHTML = clutter;
}

// function for timer

function timer() {
  let interval = setInterval(() => {
    if (time > 0) {
      time--;
      document.querySelector("#timer").textContent = time;
      if (time < 10) {
        document.querySelector("#timer").style.color = "red";
      }
    } else {
      clearInterval(interval);
      document.querySelector("#timer").style.color = "#fff";
      endGame();
    }
  }, 1000);
}

// End game function
function endGame() {
  document.querySelector("#bottombox").innerHTML = `
        <div id="result">
            <h1>Game Over</h1>
            <h2>Total Score: ${score}</h2>
            <h2>Total Hits: ${count}</h2>
            <h2>Missed: ${missed}</h2>
            <button id='newGame'>New Game</button>
        </div>`;
  document.querySelector("#rmNum").textContent = "0";
  document.querySelector("#score").textContent = "0";

  // Add event listener to "New Game" button
  document.querySelector("#newGame").addEventListener("click", () => {
    restartGame();
  });
}

// function for generate random number

function randomNumber() {
  number = Math.floor(Math.random() * 10);
  document.querySelector("#rmNum").textContent = number;
}

// function to increase score

function incScore() {
  score += 10;
  document.querySelector("#score").textContent = score;
}

// funtion for bubbles click

function hitBubble() {
  document.querySelector("#bottombox").addEventListener("click", (dets) => {
    //    console.log(dets.target.textContent);
    if (number === Number(dets.target.textContent)) {
      incScore();
      count++;
      randomNumber();
      makeBubble();
    } else {
      missed++;
      if (dets.target.textContent < 10) {
        dets.target.style.backgroundColor = "red";
        setTimeout(function () {
          makeBubble();
          randomNumber();
        }, 150);
      }
    }
  });
}

// funciton for start new game

function restartGame() {
  time = 60;
  score = 0;
  count = 0;
  missed = 0;
  main();
}

// father of all functions

function main() {
  makeBubble();
  timer();
  randomNumber();
  hitBubble();
}
