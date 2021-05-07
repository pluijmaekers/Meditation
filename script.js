let controller = new ScrollMagic.Controller();
let timeline = new TimelineMax();

timeline
    .to('.lotus', 3, { y: -40, x: -110 })
    .to('.woman', 3, { y: -150, x: 75 }, '-=3')
    .to('.background', 3, { y: 200 }, '-=3')
    .to('.app', 3, { top: '70%' }, '-=3')
    .fromTo('.logo1', { opacity: 1 }, { opacity: 0, duration: 3 }, '-=3')
    .fromTo('.fadeIn', { opacity: 0 }, { opacity: 1, duration: 3 }, '-=2')
    .fromTo('.logo2', { opacity: 0 }, { opacity: 1, duration: 3 }, '-=3');

let scene = new ScrollMagic.Scene({
    triggerElement: 'mousewheel',
    duration: '100%',
})
    .setTween(timeline)
    .addTo(controller);

const song = document.querySelector('.song');
const play = document.querySelector('.play');
const video = document.querySelector('.vid-container video');
const timeSelect = document.querySelectorAll('.time-select button');
const timeDisplay = document.querySelector('.time-display');
const sounds = document.querySelectorAll('.sound-picker button');

function changeColor() {
    let query = window.matchMedia('(max-width: 1175px)');
    if (query.matches) {
        const change = document.getElementById('time-display');
        timeDisplay.style.color = '#333';
        document.getElementById('btn1').style.color = '#333';
        document.getElementById('btn1').style.border = '4px solid #333';
        document.getElementById('btn2').style.color = '#333';
        document.getElementById('btn2').style.border = '4px solid #333';
    } else {
        const change = document.getElementById('time-display');
        timeDisplay.style.color = '#333';
        document.getElementById('btn1').style.color = '#333';
        document.getElementById('btn1').style.border = '4px solid #333';
        document.getElementById('btn2').style.color = '#333';
        document.getElementById('btn2').style.border = '4px solid #333';
    }
}

function keepColor() {
    let query = window.matchMedia('(max-width: 1175px)');
    if (query.matches) {
        const change = document.getElementById('time-display');
        timeDisplay.style.color = 'whitesmoke';
        document.getElementById('btn1').style.color = 'whitesmoke';
        document.getElementById('btn1').style.border = '4px solid whitesmoke';
        document.getElementById('btn2').style.color = 'whitesmoke';
        document.getElementById('btn2').style.border = '4px solid whitesmoke';
    } else {
        const change = document.getElementById('time-display');
        timeDisplay.style.color = '#333';
        document.getElementById('btn1').style.color = '#333';
        document.getElementById('btn1').style.border = '4px solid #333';
        document.getElementById('btn2').style.color = '#333';
        document.getElementById('btn2').style.border = '4px solid #333';
    }
}

sounds.forEach((sound) => {
    sound.addEventListener('click', function () {
        song.src = this.getAttribute('data-sound');
        video.src = this.getAttribute('data-video');
        checkPlaying(song);
    });
});

song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = duration - currentTime;
    let minutes = Math.floor(elapsed / 60);
    let seconds = Math.floor(elapsed % 60);

    timeDisplay.textContent = `${minutes}:${seconds}`;
    if (seconds < 10) {
        timeDisplay.textContent = `${minutes}:0${seconds}`;
    }

    if (currentTime >= duration) {
        song.pause();
        video.pause();
        song.currentTime = 0;
        play.src = './img/play-circle-regular.svg';
    }
};

timeSelect.forEach((option) => {
    option.addEventListener('click', function () {
        duration = this.getAttribute('data-time');
        timeDisplay.textContent = `${Math.floor(duration / 60)}:0${Math.floor(
            duration % 60
        )}`;
    });
});

play.addEventListener('click', () => {
    checkPlaying(song);
});

const checkPlaying = (song) => {
    if (song.paused) {
        song.play();
        video.play();
        play.src = './img/pause.svg';
    } else {
        song.pause();
        video.pause();
        play.src = './img/play-circle-regular.svg';
    }
};
