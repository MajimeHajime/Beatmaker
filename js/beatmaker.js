class Musician {
    constructor(){
        this.pads = document.querySelectorAll(".pad");
        this.startButton = document.querySelector(".start-button");
        this.index = 0;
        this.kickSelect = document.getElementById("kick-select");
        this.snareSelect = document.getElementById("snare-select");
        this.hihatSelect = document.getElementById("hihat-select");
        this.kickAudio = document.getElementById("kick-sound");
        this.snareAudio = document.getElementById("snare-sound");
        this.hihatAudio = document.getElementById("hihat-sound");
        this.slider = document.getElementById("slider-bpm")
        this.tempoId = document.getElementById("tempo-value");
    }

    padActive(){
        this.classList.toggle("active");
    }
    bActive(){
        this.activeIndexes.forEach(indexed=> {
            indexed.style.animation = `startMusician 1s alternate`;
            indexed.addEventListener('animationend', () => indexed.style.animation="");
            if (indexed.classList.contains("active")) {
                if (indexed.classList.contains("kick-pad")) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (indexed.classList.contains("snare-pad")) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if (indexed.classList.contains("hihat-pad")) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });
    }
    start(){
        let fuck = this.index % 8;
        this.index++;
        this.activeIndexes = document.querySelectorAll(`.b${fuck}`);
        this.bActive();
    }
    tempo(){
        let interval = (60/this.slider.value) * 1000;
        if (this.startButton.classList.contains("started")) {
            this.startButton.classList.remove("started");
            this.stop();
        }else{
            this.startButton.classList.add("started");
            this.idInter =setInterval(() => {
            this.start()
            }, interval);
        }
    }
    stop(){
        this.index = 0;
        clearInterval(this.idInter);
    }
}

const testing = new Musician();

testing.pads.forEach(pad =>{
    pad.addEventListener("click", testing.padActive);
    console.log("it is clicked!");
}
)
testing.startButton.addEventListener("click", () => {testing.tempo()})

testing.kickSelect.addEventListener("click", () =>{
    console.log(testing.kickAudio.src);
    testing.kickAudio.src = testing.kickSelect.value;
});

testing.snareSelect.addEventListener("click", () =>{
    console.log(testing.snareAudio.src);
    testing.snareAudio.src = testing.snareSelect.value;
});

testing.hihatSelect.addEventListener("click", () =>{
    console.log(testing.hihatAudio.src);
    testing.hihatAudio.src = testing.hihatSelect.value;
});

testing.slider.addEventListener('click', () => {testing.tempoId.innerText = testing.slider.value; testing.stop(); if (testing.startButton.classList.contains('started')) {
    testing.startButton.classList.remove('started');
    testing.tempo();
}});