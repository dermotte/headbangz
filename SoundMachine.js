class SoundMachine {
    constructor() {
        this.songBaseUrl = "assets/music/songs";
        this.songParts = {
            slow: ["Headbangz_song1.mp3", "Headbangz_song2.mp3", "Headbangz_song2a.mp3", "Headbangz_song2b.mp3"],
            fast: ["Headbangz_song1_toms.mp3"],
            silent: ["Headbangz_song1_drums.mp3", "Headbangz_song1_drums_bass.mp3", "Headbangz_song1_lighter.mp3"]
        };
    }

    // type = "slow", "fast", "silent"
    getSpecificPart(type) {
        let songPart = this.songParts[""+type];
        return songPart[this.generateRandomInteger(songPart.length)];
    }


    getRandomPart() {
        let one = this.songParts.slow;
        let two = one.concat(this.songParts.fast);
        let three = two.concat(this.songParts.silent);
        return three[this.generateRandomInteger(three.length)];
    }

    generateRandomInteger(max_value) {
        return Math.floor(Math.random() * max_value);
    }

}