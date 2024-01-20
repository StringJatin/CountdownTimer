document.addEventListener('DOMContentLoaded', function () {
    const add10SecButton = document.getElementById('add-10-sec');
    const skipButton = document.getElementById('skip');

    add10SecButton.addEventListener('click', function () {
        addTime(11);
    });

    skipButton.addEventListener('click', function () {
        resetTimer();
    });

    startCountdown(1);
});

let remainingTime = 60; // seconds
const totalTime = remainingTime;

function addTime(seconds) {
    remainingTime += seconds;
    remainingTime = Math.min(remainingTime, 60);
}

function resetTimer() {
    remainingTime = totalTime;
}

function startCountdown(minutes) {
    const totalTime = minutes * 60;
    remainingTime = totalTime;

    const countdownCircleBase = document.querySelector('.progress-ring-circle-base');
    const countdownCircleOverlay = document.querySelector('.progress-ring-circle-overlay');
    const minutesElement = document.querySelector('.timer-minutes');
    const secondsElement = document.querySelector('.timer-seconds');

    const circumference = 2 * Math.PI * 90;

    countdownCircleBase.style.strokeDasharray = circumference;
    countdownCircleBase.style.strokeDashoffset = 0;
    countdownCircleOverlay.style.strokeDasharray = circumference;
    countdownCircleOverlay.style.strokeDashoffset = circumference;

    const updateTimer = () => {
        const minutes = Math.floor(remainingTime / 60).toString().padStart(2, '0');
        const seconds = (remainingTime % 60).toString().padStart(2, '0');

        minutesElement.textContent = minutes;
        secondsElement.textContent = seconds;

        const progress = (totalTime - remainingTime) / totalTime;
        const baseOffset = 0;
        const overlayOffset = progress * circumference;
        countdownCircleBase.style.strokeDashoffset = baseOffset;
        countdownCircleOverlay.style.strokeDashoffset = overlayOffset;

        remainingTime--;

        if (remainingTime < 0) {
            clearInterval(countdownInterval);

            console.log('Countdown is completed!');
        }
    };


    updateTimer();
    const countdownInterval = setInterval(updateTimer, 1000);
}
