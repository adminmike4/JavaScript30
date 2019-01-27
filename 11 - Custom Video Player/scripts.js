//Get Our Elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressFilled = player.querySelector('.progress__filled');
const playerButton = player.querySelector('.player__button');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = document.getElementById("fullscreen");
const videoPlayer = document.getElementById("videoPlayer");

//Build Functions

function displayTime() {
    var str = "";

    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    var seconds = currentTime.getSeconds()

    if (minutes < 10) {
        minutes = "0" + minutes
    }
    if (seconds < 10) {
        seconds = "0" + seconds
    }
    str += hours + ":" + minutes + ":" + seconds + " ";
    if(hours > 11){
        str += "PM"
    } else {
        str += "AM"
    }
    return str;
}

function togglePlay() {
    if (video.paused) {
        video.play()
    } else {
        video.pause();
    }
    console.log("togglePlay toggled! @ " + displayTime());
}

function updatePlayButton() {
    console.log("update button");
    const icon = this.paused ? '►' : 'II';
    playerButton.textContent = icon;
    console.log(icon);
}

function skip() {
    const skippedTime = this.dataset.skip;
    var direction;
    video.currentTime += parseFloat(skippedTime);
    skippedTime > 0 ? direction = " forwards" : direction = " back";
    console.log("Jumped " + skippedTime + " seconds" + direction);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
    console.log(this.name + " adjusted to " + (this.value *100).toFixed(0) + "%");
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressFilled.style.flexBasis = `${percent}%`;
    //console.log(percent);
}

function scrub(e) {
    const offsetPercent = (e.offsetX/progress.offsetWidth)*100;
    //console.log(offsetPercent);
    progressFilled.style.flexBasis = `${offsetPercent}%`;

    const jumpTo = (video.duration/100) * offsetPercent;
    console.log("User jumped to: " + (jumpTo/60).toFixed(2));
    video.currentTime = jumpTo;
}

function toggleFullscreen() {
video.requestFullscreen();
    console.log("fullscreen mode launched");
};


// Event listeners

video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('timeupdate', handleProgress);


playerButton.addEventListener('click', togglePlay);
window.addEventListener("keyup", function(e) { if(e.keyCode == 32) console.log("spacebar hit!") + togglePlay()});

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

fullscreen.addEventListener('click', toggleFullscreen);