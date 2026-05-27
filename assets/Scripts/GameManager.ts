const {ccclass, property} = cc._decorator;

enum PlayerState {
    Alive = "Alive",
    Dead = "Dead",
    Respawning = "Respawning",
    Finished = "Finished",
    GameOver = "GameOver",
}

@ccclass
export default class GameManager extends cc.Component {

    private static readonly FinalScoreKey: string = "web_mario_final_score";

    @property(cc.Node)
    player: cc.Node = null;

    @property
    lives: number = 3;

    @property
    deathY: number = -260;

    @property
    gravityY: number = -800;

    @property
    respawnDelay: number = 0.5;

    @property(cc.Node)
    movingPlatform: cc.Node = null;

    @property
    gameOverScene: string = "Game over";

    @property(cc.AudioClip)
    bgm: cc.AudioClip = null;

    @property(cc.AudioClip)
    deathSfx: cc.AudioClip = null;

    @property(cc.Label)
    lifeLabel: cc.Label = null;

    @property(cc.Label)
    scoreLabel: cc.Label = null;

    @property(cc.Label)
    timerLabel: cc.Label = null;

    @property
    score: number = 0;

    @property
    elapsedTime: number = 0;

    private spawnPosition: cc.Vec3 = null;
    private playerState: PlayerState = PlayerState.Alive;

    onLoad() {
        const physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
        physicsManager.gravity = cc.v2(0, this.gravityY);
    }

    start() {
        this.playBgm();
        this.startMovingPlatform();
        if (this.player) {
            this.spawnPosition = this.player.position.clone();
        }
        this.playerState = PlayerState.Alive;
        cc.log("Mario lives: " + this.lives);
        this.updateAllUI();
    }

    update(dt: number) {
        if (this.playerState !== PlayerState.GameOver) {
            this.elapsedTime += dt;
            this.updateTimerUI();
        }

        if (!this.player || !this.spawnPosition || this.playerState !== PlayerState.Alive) {
            return;
        }

        if (this.player.y < this.deathY) {
            this.loseLifeAndRespawn();
        }
    }

    hurtPlayer() {
        if (this.playerState !== PlayerState.Alive) {
            return;
        }

        this.loseLifeAndRespawn();
    }

    addScore(points: number) {
        if (points <= 0) {
            return;
        }

        this.score += points;
        this.updateScoreUI();
    }

    finishLevel() {
        if (this.playerState !== PlayerState.Alive) {
            return;
        }

        this.playerState = PlayerState.Finished;
        this.saveFinalScore();
        cc.director.loadScene(this.gameOverScene);
    }

    private loseLifeAndRespawn() {
        this.playerState = PlayerState.Dead;
        this.lives = Math.max(0, this.lives - 1);
        this.playEffect(this.deathSfx);
        this.updateLifeUI();
        cc.log("Mario lives: " + this.lives);

        if (this.lives <= 0) {
            this.enterGameOver();
            return;
        }

        this.playerState = PlayerState.Respawning;
        this.scheduleOnce(() => this.respawnPlayer(), this.respawnDelay);
    }

    private respawnPlayer() {
        if (!this.player || !this.spawnPosition) {
            return;
        }

        this.player.setPosition(this.spawnPosition);
        const controller = this.player.getComponent("PlayerController") as any;
        if (controller && controller.resetMotion) {
            controller.resetMotion();
        }
        this.playerState = PlayerState.Alive;
    }

    private enterGameOver() {
        this.playerState = PlayerState.GameOver;
        this.saveFinalScore();
        cc.director.loadScene(this.gameOverScene);
    }

    private saveFinalScore() {
        cc.sys.localStorage.setItem(GameManager.FinalScoreKey, Math.floor(this.score).toString());
    }

    private startMovingPlatform() {
        if (!this.movingPlatform) {
            return;
        }

        const moveRight = cc.moveBy(1.5, cc.v2(64, 0)).easing(cc.easeInOut(2));
        const moveLeft = cc.moveBy(1.5, cc.v2(-64, 0)).easing(cc.easeInOut(2));
        const loop = cc.repeatForever(cc.sequence(moveRight, moveLeft));

        this.movingPlatform.stopAllActions();
        this.movingPlatform.runAction(loop);
    }

    private playBgm() {
        if (!this.bgm) {
            return;
        }

        cc.audioEngine.playMusic(this.bgm, true);
    }

    private playEffect(clip: cc.AudioClip) {
        if (!clip) {
            return;
        }

        cc.audioEngine.playEffect(clip, false);
    }

    private updateAllUI() {
        this.updateLifeUI();
        this.updateScoreUI();
        this.updateTimerUI();
    }

    private updateLifeUI() {
        if (!this.lifeLabel) {
            return;
        }

        this.lifeLabel.string = "LIFE x" + this.lives;
    }

    private updateScoreUI() {
        if (!this.scoreLabel) {
            return;
        }

        this.scoreLabel.string = "SCORE " + this.formatNumber(this.score, 6);
    }

    private updateTimerUI() {
        if (!this.timerLabel) {
            return;
        }

        this.timerLabel.string = "TIME " + this.formatNumber(this.elapsedTime, 3);
    }

    private formatNumber(value: number, digits: number): string {
        let text = Math.max(0, Math.floor(value)).toString();
        while (text.length < digits) {
            text = "0" + text;
        }
        return text;
    }
}
