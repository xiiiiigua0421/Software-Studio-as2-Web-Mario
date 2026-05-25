const {ccclass, property} = cc._decorator;

@ccclass
export default class QuestionBlock extends cc.Component {

    @property(cc.Node)
    powerUpNode: cc.Node = null;

    @property
    hitTolerance: number = 10;

    @property
    spawnPadding: number = 4;

    @property(cc.AudioClip)
    itemAppearSfx: cc.AudioClip = null;

    private used: boolean = false;

    start() {
        if (this.powerUpNode) {
            this.powerUpNode.active = false;
        }
    }

    onBeginContact(contact: cc.PhysicsContact, self: cc.PhysicsCollider, other: cc.PhysicsCollider) {
        if (this.used || !this.powerUpNode) {
            return;
        }

        const playerController = other.node.getComponent("PlayerController");
        if (!playerController || !this.wasHitFromBelow(other.node)) {
            return;
        }

        this.used = true;
        this.spawnPowerUp();
    }

    private wasHitFromBelow(player: cc.Node): boolean {
        const playerBody = player.getComponent(cc.RigidBody);
        const isMovingUp = !playerBody || playerBody.linearVelocity.y > 0;
        const playerBox = player.getBoundingBoxToWorld();
        const blockBox = this.node.getBoundingBoxToWorld();
        const playerTop = playerBox.y + playerBox.height;
        const blockBottom = blockBox.y;

        return isMovingUp && playerTop <= blockBottom + this.hitTolerance;
    }

    private spawnPowerUp() {
        const blockBox = this.node.getBoundingBoxToWorld();
        const parent = this.powerUpNode.parent || this.node.parent;
        const worldPosition = cc.v2(
            blockBox.x + blockBox.width / 2,
            blockBox.y + blockBox.height + this.powerUpNode.height / 2 + this.spawnPadding
        );
        const localPosition = parent.convertToNodeSpaceAR(worldPosition);

        this.powerUpNode.setPosition(localPosition);
        this.powerUpNode.active = true;
        this.playEffect(this.itemAppearSfx);
    }

    private playEffect(clip: cc.AudioClip) {
        if (!clip) {
            return;
        }

        cc.audioEngine.playEffect(clip, false);
    }
}
