const {ccclass, property} = cc._decorator;

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

    private spawnPosition: cc.Vec3 = null;

    onLoad() {
        const physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
        physicsManager.gravity = cc.v2(0, this.gravityY);
    }

    start() {
        if (this.player) {
            this.spawnPosition = this.player.position.clone();
        }
        cc.log("Mario lives: " + this.lives);
    }

    update() {
        if (!this.player || !this.spawnPosition) {
            return;
        }

        if (this.player.y < this.deathY) {
            this.loseLifeAndRespawn();
        }
    }

    private loseLifeAndRespawn() {
        this.lives = Math.max(0, this.lives - 1);
        cc.log("Mario lives: " + this.lives);

        this.player.setPosition(this.spawnPosition);
        const controller = this.player.getComponent("PlayerController") as any;
        if (controller && controller.resetMotion) {
            controller.resetMotion();
        }
    }
}
