// Storage of state variables and important DOM elements
let workTime = 25,
    breakTime = 5,
    currentTime = 0,
    isWork = true,
    isRunning = false,
    currentInterval = null,
    title = "Pomodoro Timer";
    // notificationAllowed = true;
const timerElement = document.getElementById("timer"),
    startButton = document.getElementById("startButton");
    // notificationCheck = document.getElementById("notificationCheck");

// A function used to start the timer
function startTimer() {
    startButton.textContent = "Reset";

    if (isRunning == false && isWork == true) {
        currentTime = workTime * 60;
        isRunning = true;
    } else if (isRunning == false && isWork == false) {
        currentTime = breakTime * 60;
        isRunning = true;
    }

    updateTimer();
    currentInterval = setInterval(() => updateTimer(), 1000);
}

// A function used to update the timer
function updateTimer() {
    currentTime = currentTime <= 0 ? 0 : currentTime - 1;

    if (currentTime <= 0) {
        isWork = !isWork;
        isRunning = false;
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
    timerElement.innerText = minutes + ":" + secondes;

    if (isWork) {
        document.getElementById("workPhase").style.backgroundColor = "#ffffff";
        document.getElementById("breakPhase").style.backgroundColor =
            "transparent";
        document.getElementById("timer").style.backgroundColor =
            "var(--timer-work)";
    } else {
        document.getElementById("workPhase").style.backgroundColor =
            "transparent";
        document.getElementById("breakPhase").style.backgroundColor = "#ffffff";
        document.getElementById("timer").style.backgroundColor =
            "var(--timer-break)";
    }

    if (isRunning == true) {
        startButton.textContent = "Reset";
    } else {
        startButton.textContent = "Start";
    }

    // Change the background position based on the timer
    let percent =
        (currentTime / (isWork ? workTime * 60 : breakTime * 60)) * 100;
    if (isWork) {
        percent = 100 - percent;
    }
    document.body.style.backgroundPositionX = percent + "%";

    // Change the title based on the timer
    if (isWork) {
        document.title = minutes + ":" + secondes + " - " + title;
    } else {
        document.title = minutes + ":" + secondes + " - Break - " + title;
    }

    // Play a sound when changing state
    if (currentTime == 1) {
        let audio = new Audio("sound/bell.mp3");
        audio.play();
    }
}

// A function used to reset the timer
function resetTimer() {
    isRunning = false;
    startButton.textContent = "Start";
    clearInterval(currentInterval);
    if (isWork) {
        currentTime = workTime * 60;
    } else {
        currentTime = breakTime * 60;
    }

    updateUI();
}

// A function used to decrease the timer value
function devTime() {
    currentTime = 3;
}

// A function used to add Event Listeners to the inputs
function monitorTimesInputs() {
    document.getElementById("workTime").addEventListener("change", function () {
        if (this.value >= 1 && this.value <= 60) {
            workTime = this.value;
        } else {
            this.value = workTime;
        }

        if (isWork) {
            currentTime = workTime * 60;
            updateUI();
        }
        localStorage.setItem("workTime", workTime);
    });
    document
        .getElementById("breakTime")
        .addEventListener("change", function () {
            if (this.value >= 1 && this.value <= 60) {
                breakTime = this.value;
            } else {
                this.value = breakTime;
            }

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
    // if (localStorage.getItem("notificationAllowed") != null) {
    //     notificationAllowed = localStorage.getItem("notificationAllowed");
    // }
    currentTime = workTime * 60;

    document.getElementById("workPhase").addEventListener("click", function () {
        isWork = true;
        isRunning = false;
        currentTime = workTime * 60;
        clearInterval(currentInterval);
        updateUI();
    });
    document
        .getElementById("breakPhase")
        .addEventListener("click", function () {
            isWork = false;
            isRunning = false;
            currentTime = breakTime * 60;
            clearInterval(currentInterval);
            updateUI();
        });

    updateUI();

    // Add event listeners to dev tools
    document
        .getElementById("devToolsTitle")
        .addEventListener("click", function () {
            if (document.getElementById("devButtons").className == "active") {
                document.getElementById("devButtons").style.display = "none";
                document.getElementById("devToolsTitle").textContent =
                    "Dev tools +";
                document.getElementById("devButtons").className = "inactive";
            } else {
                document.getElementById("devButtons").style.display = "flex";
                document.getElementById("devToolsTitle").textContent =
                    "Dev tools -";
                document.getElementById("devButtons").className = "active";
            }
        });

    // Add event listeners to Start and Reset button
    startButton.addEventListener("click", function () {
        if (isRunning == false) {
            startTimer();
        } else {
            resetTimer();
        }
    });

    // Check if notifications are enabled
    // if (Notification.permission == "granted" && notificationAllowed == true) {
    //     notificationCheck.checked = true;
    // } else {
    //     console.log("Notifications are not allowed");
    // }

    // Add event listerner to the notification button
    // notificationCheck.addEventListener("click", function () {
    //         if (notificationCheck.checked == true) {
    //             notificationAllowed = true;
    //             localStorage.setItem("notificationAllowed", true);
    //             if (Notification.permission != "granted") {
    //                 Notification.requestPermission();
    //             }
    //         } else {
    //             notificationAllowed = false;
    //             localStorage.setItem("notificationAllowed", false);
    //         }
    //         console.log(notificationAllowed);
    //     });
}

// A function used to delete the local storage
function deleteAllLocalStorage() {
    localStorage.removeItem("workTime");
    localStorage.removeItem("breakTime");
    location.reload();
}

onPageLoad();
