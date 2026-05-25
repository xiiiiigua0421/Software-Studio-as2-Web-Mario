const {ccclass, property} = cc._decorator;

@ccclass
export default class Enemy extends cc.Component {

    @property
    moveSpeed: number = 80;

    @property
    patrolDistance: number = 120;

    @property
    stompTolerance: number = 8;

    private body: cc.RigidBody = null;
    private startX: number = 0;
    private moveDir: number = -1;
    private isDead: boolean = false;

    onLoad() {
        this.body = this.getComponent(cc.RigidBody);
        this.startX = this.node.x;
    }

    update(dt: number) {
        if (this.isDead) {
            return;
        }

        if (this.node.x <= this.startX - this.patrolDistance) {
            this.moveDir = 1;
        } else if (this.node.x >= this.startX + this.patrolDistance) {
            this.moveDir = -1;
        }

        if (this.body) {
            const velocity = this.body.linearVelocity;
            velocity.x = this.moveDir * this.moveSpeed;
            this.body.linearVelocity = velocity;
        } else {
            this.node.x += this.moveDir * this.moveSpeed * dt;
        }

        this.node.scaleX = Math.abs(this.node.scaleX) * (this.moveDir > 0 ? -1 : 1);
    }

    onBeginContact(contact: cc.PhysicsContact, self: cc.PhysicsCollider, other: cc.PhysicsCollider) {
        if (this.isDead) {
            return;
        }

        const playerController = other.node.getComponent("PlayerController") as any;
        if (!playerController) {
            return;
        }

        if (this.isStompedBy(other.node)) {
            playerController.bounceFromEnemy();
            this.die();
            return;
        }

        const managerNode = cc.find("GameManager");
        const gameManager = managerNode ? managerNode.getComponent("GameManager") as any : null;
        if (gameManager && gameManager.hurtPlayer) {
            gameManager.hurtPlayer();
        }
    }

    private isStompedBy(player: cc.Node): boolean {
        const playerBody = player.getComponent(cc.RigidBody);
        const isFalling = !playerBody || playerBody.linearVelocity.y <= 0;
        const playerBox = player.getBoundingBoxToWorld();
        const enemyBox = this.node.getBoundingBoxToWorld();
        const playerBottom = playerBox.y;
        const enemyTop = enemyBox.y + enemyBox.height;

        return isFalling && playerBottom >= enemyTop - this.stompTolerance;
    }

    private die() {
        this.isDead = true;
        if (this.body) {
            this.body.linearVelocity = cc.v2(0, 0);
        }
        this.node.destroy();
    }
}
