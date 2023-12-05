const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/Rewrite The Stars.mp3',
        displayName: 'Rewrite The Stars',
        cover: 'assets/img/jamesarthur.jpg',
        artist: 'James Arthur, Anne-Marie',
    },
    {
        path: 'assets/Untuk Mencintaimu.mp3',
        displayName: 'Untuk Mencintaimu',
        cover: 'assets/img/seventeen.jpg',
        artist: 'Seventeen',
    },
    {
        path: 'assets/Yang Tlah Merelakanmu.mp3',
        displayName: 'Yang Tlah Merelakanmu',
        cover: 'assets/img/seventeen.jpg',
        artist: 'seventeen',
    },
    {
        path: 'assets/Jaga Slalu Hatimu.mp3',
        displayName: 'Jaga Slalu Hatimu',
        cover: 'assets/img/seventeen.jpg',
        artist: 'seventeen',
    },
    {
        path: 'assets/Tanpa Pesan Terakhir.mp3',
        displayName: 'Tanpa Pesan Terakhir',
        cover: 'assets/img/seventeen.jpg',
        artist: 'Seventeen',
    },
    {
        path: 'assets/Tanpa Cinta.mp3',
        displayName: 'Tanpa Cinta',
        cover: 'assets/img/yovie-nuno.jpg',
        artist: 'Yovie & Nuno',
    },
    {
        path: 'assets/Clocks.mp3',
        displayName: 'Clocks',
        cover: 'assets/img/coldplay.jpg',
        artist: 'Coldplay',
    },
    {
        path: 'assets/December.mp3',
        displayName: 'December',
        cover: 'assets/img/neckdeep.jpg',
        artist: 'Neck Deep',
    },
    {
        path: 'assets/Andai Kau Datang Kembali.mp3',
        displayName: 'Andai Kau Datang Kembali',
        cover: 'assets/img/andmesh.jpg',
        artist: 'Andmesh',
    },
    {
        path: 'assets/Rahasia Hati.mp3',
        displayName: 'Rahasia Hati',
        cover: 'assets/img/element.jpg',
        artist: 'Element',
    },
    {
        path: 'assets/Walking Back Home.mp3',
        displayName: 'Walking Back Home',
        cover: 'assets/img/FUR.jpg',
        artist: 'FUR',
    },
    {
        path: 'assets/Anything You Want.mp3',
        displayName: 'Anything You Want',
        cover: 'assets/img/realityclub.jpg',
        artist: 'Reality Club',
    },
    {
        path: 'assets/risalah-hati.mp3',
        displayName: 'Risalah Hati',
        cover: 'assets/img/pamungkas.jpg',
        artist: 'Pamungkas',
    },
    {
        path: 'assets/rumah-singgah.mp3',
        displayName: 'Rumah Singgah',
        cover: 'assets/img/Fabio Asher.jpg',
        artist: 'Fabio Asher',
    },
    {
        path: 'assets/komang.mp3',
        displayName: 'Komang',
        cover: 'assets/img/Raim Laode.jpg',
        artist: 'Raim Laode',
    },
    {
        path: 'assets/Closed Doors.mp3',
        displayName: 'Closed Doors',
        cover: 'assets/img/Ismail.jpg',
        artist: 'Ismail',
    },
    {
        path: 'assets/Muak.mp3',
        displayName: 'Muak',
        cover: 'assets/img/Aruma.jpg',
        artist: 'Aruma',
    },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);