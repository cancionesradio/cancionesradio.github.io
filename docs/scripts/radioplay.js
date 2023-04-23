var audio = new Audio('https://eu8.fastcast4u.com/proxy/stephenl13?mp=/1');
var playstopBtn = document.querySelector('#playstop');
var volumeCtrl = document.querySelector('#volume-control');
var loadingIcon = document.querySelector('.loading-icon');
let slowInternetTimeout = null;
audio.volume = 1

window.addEventListener('load', () => {
    document.getElementsByClassName("songinfo")[0].style.display = "none";
});

audio.addEventListener('waiting', () => {
slowInternetTimeout = setTimeout(() => {
    document.getElementsByClassName("songinfo")[0].style.display = "none";
    //show buffering
    loadingIcon.innerHTML = '<i class="fa-solid fa-spinner fa-spin-pulse"></i> Stream loading.';
    });
});

audio.addEventListener('playing', () => {
if(slowInternetTimeout != null){
    clearTimeout(slowInternetTimeout);
    slowInternetTimeout = null;
    //continue playing
    loadingIcon.innerHTML = "";
    document.getElementsByClassName("songinfo")[0].style.display = "block";
    }
});

audio.addEventListener('ended', () => {
    loadingIcon.innerHTML = '<i class="fa-solid fa-spinner fa-triangle-exclamation"></i> DZCP is now signing off. Thank you for listening.'
    playstopBtn.src = 'images/play.png';
});

audio.addEventListener('error', () => {
    if(audio.error.code === 4) {
        loadingIcon.innerHTML = '<i class="fa-solid fa-spinner fa-triangle-exclamation"></i> The station is offline. Come back soon.'
    } else if (audio.error.code === 3){
        audio.pause();
        loadingIcon.innerHTML = '<i class="fa-solid fa-spinner fa-triangle-exclamation"></i> A decoding error has occurred. Refresh your browser.'
    } else if (audio.error.code === 2){
        audio.pause();
        loadingIcon.innerHTML = '<i class="fa-solid fa-spinner fa-triangle-exclamation"></i> A network error has occurred. Please try again.'
    }
})

function playstop() {
    try {
        if(audio.paused) {
            audio.load()
            audio.play();
            playstopBtn.src = 'images/stop.png';
        } else {
            audio.pause();
            playstopBtn.src = 'images/play.png';
        }
    } catch (err) {
        loadingIcon.innerHTML = '<i class="fa-solid fa-spinner fa-triangle-exclamation"></i> An error has occured.'
        playstopBtn.src = 'images/play.png';
    }
}

function setVolume() {
    audio.volume = volumeCtrl.value / 100;
}