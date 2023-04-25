var audio = new Audio('https://eu8.fastcast4u.com/proxy/stephenl13?mp=/1');
var playstopBtn = document.querySelector('.playstop');
var volumeCtrl = document.querySelector('#volume-control');
var volumeIcon = document.querySelector('.volume-speaker');
var songinfo = document.getElementsByClassName("songinfo")[0];
var loadingIcon = document.querySelector('.status-text');
let slowInternetTimeout = null;
audio.volume = 1

window.addEventListener('load', () => {
});

audio.addEventListener('waiting', () => {
slowInternetTimeout = setTimeout(() => {
    playstopBtn.innerHTML = '<i class="fa-solid fa-spinner fa-3x fa-spin-pulse"></i>';
    });
});

audio.addEventListener('playing', () => {
if(slowInternetTimeout != null){
    clearTimeout(slowInternetTimeout);
    slowInternetTimeout = null;
    playstopBtn.innerHTML = '<i class="fa-solid fa-circle-pause fa-3x" onclick="playstop()"></i>';
    }
});

audio.addEventListener('ended', () => {
    loadingIcon.innerHTML = '<i class="fa-solid fa-spinner fa-triangle-exclamation"></i> DZCP leaves off-air. Thank you for listening.'
    playstopBtn.innerHTML = '<i class="fa-solid fa-circle-play fa-3x" onclick="playstop()"></i>';
});

audio.addEventListener('error', () => {
    if(audio.error.code === 4) {
        songinfo.innerHTML = '<i class="fa-solid fa-spinner fa-triangle-exclamation"></i> The station is currently offline. Be sure to refresh your browser once it returns on-air.'
        playstopBtn.innerHTML = '<i class="fa-solid fa-circle-play fa-3x" onclick="playstop()"></i>';
    } else if (audio.error.code === 3){
        audio.pause();
        songinfo.innerHTML = '<i class="fa-solid fa-spinner fa-triangle-exclamation"></i> A decoding error has occurred. Refreshing your browser.'
        playstopBtn.innerHTML = '<i class="fa-solid fa-circle-play fa-3x" onclick="playstop()"></i>';
        setTimeout(function(){
           window.location.reload(1);
        }, 5000);
    } else if (audio.error.code === 2){
        audio.pause();
        songinfo.innerHTML = '<i class="fa-solid fa-spinner fa-triangle-exclamation"></i> A network error has occurred. Please try again.'
        playstopBtn.innerHTML = '<i class="fa-solid fa-circle-play fa-3x" onclick="playstop()"></i>';
    }
})

function playstop() {
    try {
        if(audio.paused) {
            audio.load()
            audio.play();
        } else {
            audio.pause();
            playstopBtn.innerHTML = '<i class="fa-solid fa-circle-play fa-3x" onclick="playstop()"></i>';
        }
    } catch (err) {
        songinfo.innerHTML = '<i class="fa-solid fa-spinner fa-triangle-exclamation"></i> An error has occured.';
        playstopBtn.innerHTML = '<i class="fa-solid fa-circle-play fa-3x" onclick="playstop()"></i>';
    }
}

function setVolume() {
    audio.volume = volumeCtrl.value / 100;
    if(audio.volume < 0.01) {
        volumeIcon.innerHTML = '<i class="fa-solid fa-volume-mute"></i>'
    } else {
        volumeIcon.innerHTML = '<i class="fa-solid fa-volume-up"></i>'
    }
}

function speakerIcon() {
    if(audio.volume <= 0) {
        volumeIcon.innerHTML = '<i class="fa-solid fa-volume-up"></i>'
        volumeCtrl.value = 100
        audio.volume = 1
    } else if (audio.volume == 100 || audio.volume <= 99) {
        volumeIcon.innerHTML = '<i class="fa-solid fa-volume-mute"></i>'
        volumeCtrl.value = 0
        audio.volume = 0
    }
}