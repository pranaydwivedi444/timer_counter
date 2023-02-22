const appendHour = document.querySelector(".hour");
const appendSecond = document.querySelector(".second");
const appendMinute = document.querySelector(".minute");
const btnStart = document.querySelector(".start");
const btnStop = document.querySelector(".stop");
const btnReset = document.querySelector(".reset");

let hour = 0;
let minute = 0;
let second = 0;
let start = false;
let intervalId;
let isPaused = false;

function startCounter() {
  if (!start) return;
  second++;
  if (second == 60) {
    minute++;
  }
  if (minute == 60) {
    hour++;
  }
  updateDisplay();
}
function updateDisplay() {
  appendSecond.innerHTML = `${Math.trunc(second % 60)}`.padStart(2, 0);
  appendHour.innerHTML = `${Math.trunc(hour % 60)}`.padStart(2, 0);
  appendMinute.innerHTML = `${Math.trunc(minute % 60)}`.padStart(2, 0);
}
function startTimer() {
  if (start) return;
  start = true;
  buttonColorChange(btnStart);
  intervalId = setInterval(startCounter, 1000);
}

const reset = function () {
  start = false;
  clearInterval(intervalId);
  hour = 0;
  minute = 0;
  second = 0;
  updateDisplay();
  buttonColorChange();
  intervalId = null;
};

const stopTimer = function () {
  clearInterval(intervalId);
  start = false;
  buttonColorChange(btnStop);
};

const buttonColorChange = function (button = 0) {
  btnStart.style.backgroundColor = "#333";
  btnStop.style.backgroundColor = "#333";
  if (button) {
    button.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
  }
};
btnStart.addEventListener("click", startTimer);
btnReset.addEventListener("click", reset);
btnStop.addEventListener("click", stopTimer);
