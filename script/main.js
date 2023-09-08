var workTime = 25,
    breakTime = 5,
    currentTime = 0,
    isWork = true,
    isPaused = true,
    isRunning = false,
    currentInterval = null;
const timerElement = document.getElementById("timer"),
    startButton = document.getElementById("startButton"),
    resetButton = document.getElementById("resetButton");
resetButton.style.display = "none";

// A function used to start the timer
function startTimer() {
    isPaused = !isPaused;
    if (isPaused == false) {
        startButton.textContent = "Pause";
        resetButton.style.display = "none";

        if (isRunning == false && isWork == true) {
            currentTime = workTime * 60;
            isRunning = true;
        } else if (isRunning == false && isWork == false) {
            currentTime = breakTime * 60;
            isRunning = true;
        }

        updateTimer();
        currentInterval = setInterval(() => updateTimer(), 1000);
    } else {
        startButton.textContent = "Resume";
        resetButton.style.display = "inline-block";
        clearInterval(currentInterval);
    }
}

// A function used to update the timer
function updateTimer() {
    currentTime = currentTime <= 0 ? 0 : currentTime - 1;

    if (currentTime <= 0) {
        isWork = !isWork;
        isPaused = true;
        clearInterval(currentInterval);
        if (isWork) {
            currentTime = workTime * 60;
        } else {
            currentTime = breakTime * 60;
        }
    }
    updateUI();
}

// A function used to update UI and play a sound when changing state
function updateUI() {
    
    let minutes = parseInt(currentTime / 60, 10);
    let secondes = parseInt(currentTime % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    secondes = secondes < 10 ? "0" + secondes : secondes;
    timerElement.innerText = `${minutes}:${secondes}`;

    if (isWork) {
        // document.body.style.backgroundImage = "linear-gradient(90deg, rgba(240,84,84,1) 0%, rgba(240,84,84,1) 50%, rgba(22,160,133,1) 50%)";
        document.getElementById("workPhase").style.backgroundColor = "#ffffff";
        document.getElementById("breakPhase").style.backgroundColor = "transparent";
    } else {
        // document.body.style.backgroundImage = "linear-gradient(90deg, rgba(22,160,133,1) 0%, rgba(22,160,133,1) 50%, rgba(240,84,84,1) 50%)";
        document.getElementById("workPhase").style.backgroundColor = "transparent";
        document.getElementById("breakPhase").style.backgroundColor = "#ffffff";
    }

    if (isPaused && isRunning == true) {
        startButton.textContent = "Resume";
        resetButton.style.display = "inline-block";
    } else if (isPaused && isRunning == false) {
        startButton.textContent = "Start";
        resetButton.style.display = "none";
    } else {
        startButton.textContent = "Pause";
        resetButton.style.display = "none";
    }

    // Change the background position based on the timer
    let percent = ((currentTime / (isWork ? workTime * 60 : breakTime * 60)) * 100);
    if (isWork) {
        percent = 100 - percent;
    }
    document.body.style.backgroundPositionX = `${percent}%`;
    console.log(percent);

    // Play a sound when changing state
    if (currentTime == 1) {
        let audio = new Audio("sound/bell.mp3");
        audio.play();
    }
}

// A function used to reset the timer
function resetTimer() {
    isPaused = true;
    isWork = true;
    isRunning = false;
    startButton.textContent = "Start";
    resetButton.style.display = "none";
    clearInterval(currentInterval);
    currentTime = workTime * 60;

    updateUI();
}

// A function used to decrease the timer value
function devTime() {
    currentTime = 3;
}

// A function used to add Event Listeners to the inputs
function monitorTimesInputs() {
    document.getElementById("workTime").addEventListener("change", function () {
        workTime = this.value;
        if (isWork) {
            currentTime = workTime * 60;
            updateUI();
        }
        localStorage.setItem("workTime", workTime);
    });
    document
        .getElementById("breakTime")
        .addEventListener("change", function () {
            breakTime = this.value;
            if (!isWork) {
                currentTime = breakTime * 60;
                updateUI();
            }
            localStorage.setItem("breakTime", breakTime);
        });
}

// A function used to initialize the page
function onPageLoad() {
    monitorTimesInputs();

    if (localStorage.getItem("workTime") != null) {
        workTime = localStorage.getItem("workTime");
        document.getElementById("workTime").value = workTime;
    }
    if (localStorage.getItem("breakTime") != null) {
        breakTime = localStorage.getItem("breakTime");
        document.getElementById("breakTime").value = breakTime;
    }

    currentTime = workTime * 60;

    updateUI();
}

onPageLoad();