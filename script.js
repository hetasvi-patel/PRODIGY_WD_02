const stopwatch = document.querySelector('.stopwatch');
const timeDisplay = stopwatch.querySelector('.time');
const lapTimes = stopwatch.querySelector('.lap-times');
const startButton = stopwatch.querySelector('.start');
const stopButton = stopwatch.querySelector('.stop');
const resetButton = stopwatch.querySelector('.reset');
const lapButton = stopwatch.querySelector('.lap');

let startTime;
let pausedTime = 0;
let timerInterval;
let isRunning = false;

function startStopwatch() {
  if (!isRunning) {
    startTime = Date.now() - pausedTime;
    timerInterval = setInterval(updateStopwatch, 10);
    isRunning = true;
  }
}

function stopStopwatch() {
  if (isRunning) {
    clearInterval(timerInterval);
    pausedTime = Date.now() - startTime;
    isRunning = false;
  }
}

function resetStopwatch() {
  clearInterval(timerInterval);
  isRunning = false;
  pausedTime = 0;
  startTime = 0;
  timeDisplay.textContent = '00:00:00';
  lapTimes.innerHTML = '';
}

function lapStopwatch() {
  if (isRunning) {
    const lapTime = getFormattedTime(Date.now() - startTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapTimes.appendChild(lapItem);
  }
}

function updateStopwatch() {
  const elapsedTime = Date.now() - startTime;
  const formattedTime = getFormattedTime(elapsedTime);
  timeDisplay.textContent = formattedTime;
}

function getFormattedTime(milliseconds) {
  const centiseconds = Math.floor(milliseconds / 10) % 100;
  const seconds = Math.floor(milliseconds / 1000) % 60;
  const minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
  return `${padTime(minutes)}:${padTime(seconds)}:${padTime(centiseconds)}`;
}

function padTime(time) {
  return time < 10 ? '0' + time : time;
}

startButton.addEventListener('click', startStopwatch);
stopButton.addEventListener('click', stopStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', lapStopwatch);
