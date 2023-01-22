var audio = document.querySelector('#mainaudio');
var playstopBtn = document.querySelector('#playstop');

playstopBtn.addEventListener('click', function() {
    if(audio.paused) {
        audio.load()
        audio.play();
        playstopBtn.src = 'images/stop.png';
    } else {
        audio.pause();
        playstopBtn.src = 'images/play.png';
    }
})