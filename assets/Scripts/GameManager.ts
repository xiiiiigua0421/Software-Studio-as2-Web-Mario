const {ccclass, property} = cc._decorator;

enum PlayerState {
    Alive = "Alive",
    Dead = "Dead",
    Respawning = "Respawning",
    GameOver = "GameOver",
}

@ccclass
export default class GameManager extends cc.Component {

    @property(cc.Node)
    player: cc.Node = null;

    @property
    lives: number = 3;

    @property
    deathY: number = -260;

    @property
    gravityY: number = -1200;

    @property
    respawnDelay: number = 0.5;

    @property
    gameOverScene: string = "Game over";

    private spawnPosition: cc.Vec3 = null;
    private playerState: PlayerState = PlayerState.Alive;

    onLoad() {
        const physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
        physicsManager.gravity = cc.v2(0, this.gravityY);
    }

    start() {
        if (this.player) {
            this.spawnPosition = this.player.position.clone();
        }
        this.playerState = PlayerState.Alive;
        cc.log("Mario lives: " + this.lives);
    }

    update() {
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

    private loseLifeAndRespawn() {
        this.playerState = PlayerState.Dead;
        this.lives = Math.max(0, this.lives - 1);
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
        cc.director.loadScene(this.gameOverScene);
    }
}
