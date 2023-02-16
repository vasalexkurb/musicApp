let container = document.querySelector(`.album`);
let playlist = document.querySelector(`.playlist`);

let search = new URLSearchParams(window.location.search);
let i = search.get(`i`);

let album = albums[i];

container.innerHTML = `
    <div class="card mb-3">
        <div class="row">
            <div class="col-md-4">
                <img src="${album.img}" alt="" class="img-fluid w-100 rounded-start">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                <h5 class="card-title">${album.title}</h5>
                <p class="card-text">${album.descriprion}</p>
                <p class="card-text"><small class="tetx-muted">Сборник выпущен в ${album.year} году</small></p>
                </div>
            </div>
        </div>
    </div>
`;   

let tracks = album.tracks;
for(let i = 0; i < tracks.length; i++) {
    let track = tracks[i];

    playlist.innerHTML += `
        <li class="track list-group-item d-flex align-items-center">
            <img src="./assets/play.svg" class="img-play me-3" height="25px" alt="">
            <img src="./assets/pause.svg" class="img-pause d-none me-3" height="20px" alt="">
            <div>
                <div>${track.title}</div>
                <div>${track.author}</div>
            </div>
            <span class="d-flex gap-5 align-items-center"></span>
            <div class="ms-auto time">${track.time}</div>
            <audio class="audio" src="${track.src}"></audio>
        </li>
    `;
}

// <div class="progress" style="width: 300px;">
//     <div style="width: 0px" class="progress-bar" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>
// </div>

function setupAudio() {
    let trackNodes = document.querySelectorAll(`.track`);
    let tracks = album.tracks;
    
    for (let i = 0; i < trackNodes.length; i++) {
        let node = trackNodes[i];
        let timeNode = node.querySelector(`.time`);
        let setupAudio = node.querySelector(`.audio`); 
        let track = tracks[i];

        let imgPlay = node.querySelector(`.img-play`);
        let imgPause = node.querySelector(`.img-pause`);

        node.addEventListener(`click`, function() {
            if (track.isPlaying) {
                track.isPlaying = false;
                setupAudio.pause();
                imgPause.classList.add("d-none");
                imgPlay.classList.remove("d-none");
            } else {
                track.isPlaying = true;
                setupAudio.play();
                imgPause.classList.remove("d-none");
                imgPlay.classList.add("d-none");
                updateProgress()
            }
        });
        function updateProgress() {
            let time = getTime(setupAudio.currentTime);

            if (time != timeNode.innerHTML) {
                timeNode.innerHTML = time;
            }

            if (true) {
                requestAnimationFrame(updateProgress);
            }
        }
    }
}

setupAudio()

function getTime(time) {
    let currSeconds = Math.floor(time)
    let minutes = Math.floor(currSeconds / 60);
    let seconds = Math.floor(currSeconds % 60);
    if (minutes < 10) {
        minutes = `0` + minutes;
    } else if (seconds < 10) {
        seconds = `0` + seconds;
    }
    return `${minutes}:${seconds}`;
}
