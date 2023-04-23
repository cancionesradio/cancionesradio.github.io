var audio = new Audio('https://eu8.fastcast4u.com/proxy/stephenl13?mp=/1');
var playstopBtn = document.querySelector('.playstop');
var volumeCtrl = document.querySelector('#volume-control');
var songinfo = document.getElementsByClassName("songinfo")[0];
var loadingIcon = document.querySelector('.status-text');
let slowInternetTimeout = null;
audio.volume = 1

window.addEventListener('load', () => {
    songinfo.style.display = "none";
});

audio.addEventListener('waiting', () => {
slowInternetTimeout = setTimeout(() => {
    playstopBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin-pulse"></i>';
    });
});

audio.addEventListener('playing', () => {
if(slowInternetTimeout != null){
    clearTimeout(slowInternetTimeout);
    slowInternetTimeout = null;
    //continue playing
    loadingIcon.innerHTML = "";
    songinfo.style.display = "block";
    playstopBtn.innerHTML = '<i class="fa-solid fa-circle-pause" onclick="playstop()"></i>';
    }
});

audio.addEventListener('ended', () => {
    loadingIcon.innerHTML = '<i class="fa-solid fa-spinner fa-triangle-exclamation"></i> DZCP is now signing off. Thank you for listening.'
    playstopBtn.innerHTML = '<i class="fa-solid fa-circle-play" onclick="playstop()"></i>';
});

audio.addEventListener('error', () => {
    if(audio.error.code === 4) {
        loadingIcon.innerHTML = '<i class="fa-solid fa-spinner fa-triangle-exclamation"></i> The station is offline. Come back soon.'
        playstopBtn.innerHTML = '<i class="fa-solid fa-circle-play" onclick="playstop()"></i>';
    } else if (audio.error.code === 3){
        audio.pause();
        loadingIcon.innerHTML = '<i class="fa-solid fa-spinner fa-triangle-exclamation"></i> A decoding error has occurred. Refresh your browser.'
        playstopBtn.innerHTML = '<i class="fa-solid fa-circle-play" onclick="playstop()"></i>';
    } else if (audio.error.code === 2){
        audio.pause();
        loadingIcon.innerHTML = '<i class="fa-solid fa-spinner fa-triangle-exclamation"></i> A network error has occurred. Please try again.'
        playstopBtn.innerHTML = '<i class="fa-solid fa-circle-play" onclick="playstop()"></i>';
    }
})

function playstop() {
    try {
        if(audio.paused) {
            audio.load()
            audio.play();
        } else {
            audio.pause();
            loadingIcon.innerHTML = '';
            playstopBtn.innerHTML = '<i class="fa-solid fa-circle-play" onclick="playstop()"></i>';
        }
    } catch (err) {
        loadingIcon.innerHTML = '<i class="fa-solid fa-spinner fa-triangle-exclamation"></i> An error has occured.'
        playstopBtn.innerHTML = '<i class="fa-solid fa-circle-play" onclick="playstop()"></i>';
    }
}

function setVolume() {
    audio.volume = volumeCtrl.value / 100;
}