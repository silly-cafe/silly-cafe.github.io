let testButton = document.getElementById("test-button");
let primeButton = document.getElementById("prime-button");
let ytInput = document.getElementById("yt-input");
let ytPlayer = document.getElementById("yt-player");

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

let url = new URL(window.location.href);
let vidParam = url.searchParams.get('vid');
ytPlayer.setAttribute("data-video", vidParam)

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
    let hoursFormatted = (hours>10 ? hours : `0${hours}`)
    time = `${hoursFormatted}:${minutesFormatted}`
    console.log(`current time: ${time}, looking for: ${timeSelected}`)
    if(time == timeSelected) StartSoftWake();
}

function youtube_parser(url){
    let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    let match = url.match(regExp);
    return match[7];
}

function GetURLParameter(sParam){
    let sPageURL = window.location.search.substring(1);
    let sURLVariables = sPageURL.split('&');
    for (let i = 0; i < sURLVariables.length; i++) 
    {
        let sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

function ChangeMusic(){
    //let player = document.getElementById("yt-player-placer");
    let videoId = youtube_parser(ytInput.value);
    url.searchParams.set('vid', videoId); 
    window.location.href = url
    //layer.setAttribute('data-video', videoId);
    //player.innerHTML=`<div id=\"yt-player\" data-video=\"${videoId}\" data-autoplay=\"1\" data-loop=\"1\" class=\"youtube-audio\"></div>`;

    //player.click();
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

