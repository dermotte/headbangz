class TheEnd {
    constructor() {
        this.scene;

        this.hud;
        this.playerTwoScoreLabel;
        this.playerOneScoreLabel;
        this.centerMessageLabel;
        this.scoreMessageLabel;
        this.displayMessage;
        this.playerOneScore;
        this.playerTwoScore;
        this.gameTime;
        this.rockstar; // boolean that signals which sound to play (rockstar or fool)
    }

    createScene () {

        // Create the scene space
        var scene = new BABYLON.Scene(engine);
        
        let soundPath = "assets/music/shouts/fool.mp3";
        if (this.rockstar) {
            soundPath = "assets/music/shouts/rockstar.mp3";
        }
        
        new BABYLON.Sound("bangShout", soundPath, scene, null, {autoplay: true, loop: false, volume: 1});        

        // Add a camera to the scene and attach it to the canvas
        var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0,0,5), scene);

        // Add lights to the scene
        var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);

        this.addHUD();
        this.updatePlayerScores();

        // Meshes on the stage:
        let assetsManager = new BABYLON.AssetsManager(scene);
        let meshTask = assetsManager.addMeshTask("task05", "", "assets/models/", "hb_logo.obj");
        meshTask.onSuccess = function (task) {
            task.loadedMeshes[0].position = new BABYLON.Vector3(0, 2, -4);
            task.loadedMeshes[1].position = new BABYLON.Vector3(0, 2, -4);
            task.loadedMeshes[2].position = new BABYLON.Vector3(0, 2, -4);
            task.loadedMeshes[2].rotation.y= Math.PI/2;
            task.loadedMeshes[0].rotation.y= Math.PI;

            task.loadedMeshes[0].material.maxSimultaneousLights = 8;
            task.loadedMeshes[1].material.maxSimultaneousLights = 8;
            task.loadedMeshes[2].material.maxSimultaneousLights = 8;

        };
        assetsManager.load();

        this.scene = scene;
    }

    updatePlayerScores() {
        // console.log(this.playerOneScoreLabel);
        if (this.playerOneScoreLabel) this.playerOneScoreLabel.text = "Player 1: " + this.playerOneScore;
        if (this.playerTwoScoreLabel) this.playerTwoScoreLabel.text = this.playerTwoScore + " : Player 2";
        if (this.centerMessageLabel) this.centerMessageLabel.text = this.displayMessage;

        if (this.scoreMessageLabel && this.gameTime) {
            // The fastest possible time is 25 seconds. This is normalized to 1000 points. Every 500 ms slower results
            // in one point reduction.

            let highscore = 25*2; // 25 seconds, 2 beats per second
            let gametime = this.gameTime / 1000 * 2; // game time in beats

            let score = 1000 - (gametime - highscore);
            this.scoreMessageLabel.text = "Score: " + Math.round(score);
        }
    }

    addHUD() {
        // GUI
        this.hud = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        var playerTwoScore = new BABYLON.GUI.TextBlock("playerTwoScore");
        playerTwoScore.text = "";
        playerTwoScore.fontSize = 50;
        playerTwoScore.color = '#A5400C';
        playerTwoScore.fontFamily = 'New Rocker';
        playerTwoScore.shadowBlur = 3;
        playerTwoScore.shadowColor = "#000";
        playerTwoScore.textVerticalAlignment = BABYLON.GUI.TextBlock.VERTICAL_ALIGNMENT_TOP;
        playerTwoScore.textHorizontalAlignment = BABYLON.GUI.TextBlock.HORIZONTAL_ALIGNMENT_RIGHT;
        playerTwoScore.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        playerTwoScore.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        playerTwoScore.paddingRight = "50px";
        playerTwoScore.paddingTop = "50px";
        this.playerTwoScoreLabel = playerTwoScore;
        this.hud.addControl(playerTwoScore);

        var playerOneScore = new BABYLON.GUI.TextBlock("playerOneScore");
        playerOneScore.text = "";
        playerOneScore.fontSize = 50;
        playerOneScore.color = '#A5400C';
        playerOneScore.fontFamily = 'New Rocker';
        playerOneScore.shadowBlur = 3;
        playerOneScore.shadowColor = "#000";
        playerOneScore.textVerticalAlignment = BABYLON.GUI.TextBlock.VERTICAL_ALIGNMENT_TOP;
        playerOneScore.textHorizontalAlignment = BABYLON.GUI.TextBlock.HORIZONTAL_ALIGNMENT_LEFT;
        playerOneScore.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        playerOneScore.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        playerOneScore.paddingLeft = "50px";
        playerOneScore.paddingTop = "50px";
        this.playerOneScoreLabel = playerOneScore;
        this.hud.addControl(playerOneScore);

        var centerMessage = new BABYLON.GUI.TextBlock("centerMessage");
        centerMessage.text = "";
        centerMessage.fontSize = 90;
        centerMessage.color = '#A5400C';
        centerMessage.fontFamily = 'New Rocker';
        centerMessage.shadowBlur = 3;
        centerMessage.shadowColor = "#000";
        centerMessage.textVerticalAlignment = BABYLON.GUI.TextBlock.VERTICAL_ALIGNMENT_CENTER;
        centerMessage.textHorizontalAlignment = BABYLON.GUI.TextBlock.HORIZONTAL_ALIGNMENT_CENTER;
        centerMessage.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        centerMessage.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        centerMessage.paddingTop = "100px";
        this.centerMessageLabel = centerMessage;
        this.hud.addControl(centerMessage);

        var scoreMessage = new BABYLON.GUI.TextBlock("scoreMessage");
        scoreMessage.text = "";
        scoreMessage.fontSize = 70;
        scoreMessage.color = '#732c08';
        scoreMessage.fontFamily = 'New Rocker';
        scoreMessage.shadowBlur = 3;
        scoreMessage.shadowColor = "#000";
        scoreMessage.textVerticalAlignment = BABYLON.GUI.TextBlock.VERTICAL_ALIGNMENT_CENTER;
        scoreMessage.textHorizontalAlignment = BABYLON.GUI.TextBlock.HORIZONTAL_ALIGNMENT_CENTER;
        scoreMessage.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        scoreMessage.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        scoreMessage.paddingTop = "350px";
        this.scoreMessageLabel = scoreMessage;
        this.hud.addControl(scoreMessage);
    }

    onLoad() {
    }

    isReady() {
        return (this.scene && this.scene.isReady());
    }

    render() {
        this.scene.render();
    }

    dispose() {
        this.scene.dispose();
    }

}
