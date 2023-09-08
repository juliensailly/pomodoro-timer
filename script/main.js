var workTime = 25,
    breakTime = 5,
    currentTime = 0,
    isWork = true,
    isPaused = true;
const timerElement = document.getElementById("timer");

// A function used to start the timer
function startTimer() {
    isPaused = false;
    var time = 0;
    if (isWork) {
        currentTime = workTime*60;
        setInterval(() => updateTimer(), 1000);
        console.log("Work time started");
    } else {
        currentTime = breakTime*60;
        setInterval(() => updateTimer(), 1000);
    }
}

// A function used to update the timer
function updateTimer() {
    let minutes = parseInt(currentTime / 60, 10);
    let secondes = parseInt(currentTime % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    secondes = secondes < 10 ? "0" + secondes : secondes;

    timerElement.innerText = `${minutes}:${secondes}`;
    currentTime = currentTime <= 0 ? 0 : currentTime - 1;
    console.log(currentTime);
    if (currentTime <= 0) {
        isWork = !isWork;
        startTimer();
    }
}