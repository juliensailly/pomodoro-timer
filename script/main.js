var workTime = 25,
    breakTime = 5,
    currentTime = 0,
    isWork = true,
    isPaused = true,
    currentInterval = null;
const timerElement = document.getElementById("timer"), startButton = document.getElementById("startButton"), resetButton = document.getElementById("resetButton");
resetButton.style.display = "none";
// A function used to start the timer
function startTimer() {
    isPaused = !isPaused;
    if (isPaused == false) {
        startButton.textContent = "Pause";
        resetButton.style.display = "none";
        if (isWork) {
            currentTime = workTime * 60;
            currentInterval = setInterval(() => updateTimer(), 1000);
        } else {
            currentTime = breakTime * 60;
            currentInterval = setInterval(() => updateTimer(), 1000);
        }
    } else {
        startButton.textContent = "Resume";
        resetButton.style.display = "inline-block";
        clearInterval(currentInterval);
    }
}

// A function used to update the timer
function updateTimer() {
    currentTime = currentTime <= 0 ? 0 : currentTime - 1;

    let minutes = parseInt(currentTime / 60, 10);
    let secondes = parseInt(currentTime % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    secondes = secondes < 10 ? "0" + secondes : secondes;
    timerElement.innerText = `${minutes}:${secondes}`;

    console.log(currentTime);

    if (currentTime <= 0) {
        isWork = !isWork;
        isPaused = true;
        clearInterval(currentInterval);
    }
    updateUI();
}

// A function used to update UI and play a sound when changing state
function updateUI() {
    if (isWork) {
        document.body.style.backgroundColor = "#f05454";
        document.getElementById("title").innerText = "Work";
    } else {
        document.body.style.backgroundColor = "#16a085";
        document.getElementById("title").innerText = "Break";
    }
}

// A function used to reset the timer
function resetTimer() {
    isPaused = true;
    isWork = true;
    startButton.textContent = "Start";
    resetButton.style.display = "none";
    clearInterval(currentInterval);
    currentTime = workTime * 60;
}

// A function used to decrease the timer value
function devTime() {
    currentTime = 3;
}