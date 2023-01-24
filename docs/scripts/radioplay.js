var audio = document.querySelector('#mainaudio');
var playstopBtn = document.querySelector('#playstop');
var volumeCtrl = document.querySelector('#volume-control');
audio.volume = 1

function playstop() {
    if(audio.paused) {
        audio.load()
        audio.play();
        playstopBtn.src = 'images/stop.png';
    } else {
        audio.pause();
        playstopBtn.src = 'images/play.png';
    }
}

function setVolume() {
    audio.volume = volumeCtrl.value / 100;
}