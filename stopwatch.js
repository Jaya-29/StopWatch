let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let paused = false;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const dateElem = document.getElementById('date');

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000));

    display.innerHTML = (hours < 10 ? "0" + hours : hours) + ":" +
                        (minutes < 10 ? "0" + minutes : minutes) + ":" +
                        (seconds < 10 ? "0" + seconds : seconds) + "." +
                        (milliseconds < 100 ? (milliseconds < 10 ? "00" + milliseconds : "0" + milliseconds) : milliseconds);
}

startBtn.addEventListener('click', function() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 1);
        running = true;
        paused = false;
    }
});

pauseBtn.addEventListener('click', function() {
    if (running && !paused) {
        clearInterval(tInterval);
        paused = true;
    } else if (running && paused) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(updateTime, 1);
        paused = false;
    }
});

stopBtn.addEventListener('click', function() {
    clearInterval(tInterval);
    running = false;
    paused = false;
    display.innerHTML = "00:00:00.000";
});

resetBtn.addEventListener('click', function() {
    clearInterval(tInterval);
    running = false;
    paused = false;
    display.innerHTML = "00:00:00.000";
    difference = 0;
});

document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    dateElem.innerText = `Date: ${today}`;
});
