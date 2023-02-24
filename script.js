const appendHour = document.querySelector(".hour");
const appendSecond = document.querySelector(".second");
const appendMinute = document.querySelector(".minute");
const btnStart = document.querySelector(".start");
const btnStop = document.querySelector(".stop");
const btnReset = document.querySelector(".reset");
const btnLap = document.querySelector(".lap");
const liContainer = document.querySelector(".laps-list");
const toggleIcon = document.querySelector(".toggle-icon");
const sidebarContainer = document.querySelector(".sidebar-container");
const quoteContainer = document.querySelector(".quotes-container");

let lapsData = JSON.parse(localStorage.getItem("laps")) || [];
let hour = 0;
let minute = 0;
let second = 0;
let start = false;
let intervalId;
let isPaused = false;
let lapCount;
if (lapsData.length) {
  lapCount = lapsData[lapsData.length - 1].count;
  renderLaps();
} else {
  lapCount = 0;
}

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
  localStorage.removeItem("laps");
  lapsData = [];
  lapCount = 0;
  renderLaps();
};

const stopTimer = function () {
  clearInterval(intervalId);
  start = false;
  buttonColorChange(btnStop);
  lapCount = 0;
};

const lapTime = function () {
  if (!start) return;
  lapCount++;
  lapsData.push({
    hour: appendHour.innerHTML,
    minute: appendMinute.innerHTML,
    second: appendSecond.innerHTML,
    count: lapCount,
  });
  localStorage.setItem("laps", JSON.stringify(lapsData));
  // console.log(lapsData, lapsData[lapsData.length - 1].count);

  renderLaps();
};
function renderLaps() {
  clearLapContainer();
  if (!lapsData.length) return;
  lapsData.forEach((lap) => {
    let html = `<li class="lap__item">
  <span class="lap__number">🏃‍♂️${lap.count}</span>
  <span class="lap__time">${lap.hour}:${lap.minute}:${lap.second}</span>
  </li>
  `;
    liContainer.insertAdjacentHTML("beforeend", html);
    // liContainer.innerHTML = html;
  });
}
const buttonColorChange = function (button = 0) {
  btnStart.style.backgroundColor = "#333";
  btnStop.style.backgroundColor = "#333";
  if (button) {
    button.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
  }
};

function clearLapContainer() {
  while (liContainer.firstChild) {
    liContainer.removeChild(liContainer.firstChild);
  }
}
btnStart.addEventListener("click", startTimer);
btnReset.addEventListener("click", reset);
btnStop.addEventListener("click", stopTimer);
btnLap.addEventListener("click", lapTime);

toggleIcon.addEventListener("click", () => {
  sidebarContainer.classList.toggle("show-sidebar");
});

// localStorage.removeItem("laps");

function getRandomQuote() {
  fetch("https://api.quotable.io/random?tags=famous-quotes")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const quote = data.content;
      const author = data.author || "Unknown";
      const quoteHTML = `
        <div class="quote">
          <p class="quote-text">${quote}</p>
          <p class="quote-author">- ${author}</p>
        </div>
      `;
      quoteContainer.insertAdjacentHTML("beforeend", quoteHTML);
    })
    .catch((error) => console.error(error));
}

getRandomQuote();
