var audio = new Audio('https://eu8.fastcast4u.com/proxy/stephenl13?mp=/1');
var playstopBtn = document.querySelector('#playstop');
var volumeCtrl = document.querySelector('#volume-control');
var loadingIcon = document.querySelector('.loading-icon');
let slowInternetTimeout = null;
audio.volume = 1

audio.addEventListener('waiting', () => {
slowInternetTimeout = setTimeout(() => {
    //show buffering
    loadingIcon.innerHTML = '<i class="fa-solid fa-spinner fa-spin-pulse"></i> Stream loading.';
    });
});
audio.addEventListener('playing', () => {
if(slowInternetTimeout != null){
    clearTimeout(slowInternetTimeout);
    slowInternetTimeout = null;
    //continue playing
    loadingIcon.innerHTML = '';
    }
});
audio.addEventListener('ended', () => {
    loadingIcon.innerHTML = '<i class="fa-solid fa-spinner fa-triangle-exclamation"></i> DZCP is now signing off. Thank you for listening.'
    playstopBtn.src = 'images/play.png';
});
audio.addEventListener('error', () => {
    if(audio.error.code === 4) {
        loadingIcon.innerHTML = '<i class="fa-solid fa-spinner fa-triangle-exclamation"></i> The station is offline. Come back later.'
    } else {
        loadingIcon.innerHTML = '<i class="fa-solid fa-spinner fa-triangle-exclamation"></i> An error has occured.'
    }
})

function playstop() {
    if(audio.paused) {
        audio.load()
        audio.play().catch(() => {
            loadingIcon.innerHTML = '<i class="fa-solid fa-spinner fa-triangle-exclamation"></i> An error has occured.'
            playstopBtn.src = 'images/play.png';
        });
        playstopBtn.src = 'images/stop.png';
    } else {
        audio.pause();
        playstopBtn.src = 'images/play.png';
    }
}

function setVolume() {
    audio.volume = volumeCtrl.value / 100;
}