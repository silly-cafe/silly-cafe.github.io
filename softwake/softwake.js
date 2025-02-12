let testButton = document.getElementById("test-button");
let primeButton = document.getElementById("prime-button");

let mainContainer = document.getElementById("main-container");
let timePicker = document.getElementById("time-picker");
let audio = document.getElementById("wake-mix");
let buttons = document.getElementById("buttons");

let timeSelected;
timePicker.addEventListener("input", () => {
    timeSelected = timePicker.value;
}, false, );

let hours;
let minutes;
let time;

function StartSoftWake(){
    fadeOut("main-container");
    document.body.classList.add("anim-bg-wake");
    audio.play();
}

function PrimeTimer(){
    fadeOut("buttons");
    checkTime();
    setInterval(checkTime, 5000);
}

function checkTime(){
    let now = new Date();
    hours = now.getHours();
    minutes = now.getMinutes();
    let minutesFormatted = (minutes>10 ? minutes : `0${minutes}`)
    time = `${hours}:${minutesFormatted}`
    console.log(`current time: ${time}, looking for: ${timeSelected}`)
    if(time == timeSelected) StartSoftWake();
}

function ChangeMusic(){
    //TODO
}

function playAudio() {
    audio.play();
}
   
function pauseAudio() {
    audio.pause();
}

function fadeOut(element) {
    var fadeTarget = document.getElementById(element);
    var fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.01;
        } else {
            clearInterval(fadeEffect);
        }
    }, 10);
 }