const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const songs = [
    {
        name: 'ActinCrazy',
        displayName: 'Actin Crazy',
        artist: 'Action Bronson'
    },
    {
        name: 'KennyHoopla',
        displayName: 'How Will I Rest In Peace If I\'m Burried By A Highway?',
        artist: 'KennyHoopla'
    },
    {
        name: 'PissyPamper',
        displayName: 'Pissy Pamper Ft. Playboi Carti',
        artist: 'Young Nudy'
    },
    {
        name: 'Sandman',
        displayName: 'Sandman',
        artist: 'A$AP Rocky'
    }
];

let isPlaying = false;

const playSong = () => {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
};

const pauseSong = () => {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
};

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

const loadSong = (song) => {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
};

let songIndex = 0;

const prevSong = () => {
    songIndex--;
    if (songIndex < 0) {
      songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

const nextSong = () => {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

loadSong(songs[songIndex]);

const updateProgressBar = (e) => {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }

        if(durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);