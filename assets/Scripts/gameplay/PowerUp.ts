const {ccclass, property} = cc._decorator;

@ccclass
export default class PowerUp extends cc.Component {

    @property
    moveSpeed: number = 80;

    @property(cc.AudioClip)
    powerUpSfx: cc.AudioClip = null;

    @property
    scoreValue: number = 100;

    private body: cc.RigidBody = null;
    private collected: boolean = false;

    onLoad() {
        this.body = this.getComponent(cc.RigidBody);
    }

    onEnable() {
        this.collected = false;
        this.setMoveVelocity();
    }

    update(dt: number) {
        if (this.collected) {
            return;
        }

        if (this.body) {
            this.setMoveVelocity();
        } else {
            this.node.x += this.moveSpeed * dt;
        }
    }

    onBeginContact(contact: cc.PhysicsContact, self: cc.PhysicsCollider, other: cc.PhysicsCollider) {
        if (this.collected) {
            return;
        }

        const playerController = other.node.getComponent("PlayerController") as any;
        if (!playerController) {
            return;
        }

        this.collected = true;
        playerController.grow();
        this.playEffect(this.powerUpSfx);
        this.addScore(this.scoreValue);
        this.node.destroy();
    }

    private setMoveVelocity() {
        if (!this.body) {
            return;
        }

        const velocity = this.body.linearVelocity;
        velocity.x = this.moveSpeed;
        this.body.linearVelocity = velocity;
    }

    private playEffect(clip: cc.AudioClip) {
        if (!clip) {
            return;
        }

        cc.audioEngine.playEffect(clip, false);
    }

    private addScore(points: number) {
        const managerNode = cc.find("GameManager");
        const gameManager = managerNode ? managerNode.getComponent("GameManager") as any : null;
        if (gameManager && gameManager.addScore) {
            gameManager.addScore(points);
        }
    }
}
