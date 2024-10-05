let timer;
let seconds = 0;
let running = false;
let lapTimes = [];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const lapButton = document.getElementById('lap');
const resetButton = document.getElementById('reset');
const lapList = document.getElementById('lapList');

function updateDisplay() {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    display.textContent = 
        String(hours).padStart(2, '0') + ':' + 
        String(minutes).padStart(2, '0') + ':' + 
        String(secs).padStart(2, '0');
}

startButton.addEventListener('click', () => {
    if (!running) {
        running = true;
        timer = setInterval(() => {
            seconds++;
            updateDisplay();
        }, 1000);
    }
});

stopButton.addEventListener('click', () => {
    if (running) {
        running = false;
        clearInterval(timer);
    }
});

lapButton.addEventListener('click', () => {
    if (running) {
        const lapTime = seconds;
        lapTimes.push(lapTime);
        const lapDisplay = document.createElement('li');
        lapDisplay.textContent = formatTime(lapTime);
        lapList.appendChild(lapDisplay);
    }
});

resetButton.addEventListener('click', () => {
    running = false;
    clearInterval(timer);
    seconds = 0;
    updateDisplay();
    lapTimes = [];
    lapList.innerHTML = '';
});

// Format time for display
function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return String(hours).padStart(2, '0') + ':' + 
           String(minutes).padStart(2, '0') + ':' + 
           String(secs).padStart(2, '0');
}

// Initialize the display
updateDisplay();
