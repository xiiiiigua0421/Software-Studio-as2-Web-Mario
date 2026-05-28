const {ccclass, property} = cc._decorator;

@ccclass
export default class Enemy extends cc.Component {

    @property
    moveSpeed: number = 80;

    @property
    patrolDistance: number = 120;

    @property
    fallSpeed: number = -70;

    @property
    stompTolerance: number = 8;

    @property(cc.Animation)
    enemyAnimation: cc.Animation = null;

    @property
    walkClipName: string = "goomba_walk";

    @property
    flyClipName: string = "goomba_fly";

    @property
    deathClipName: string = "goomba_die";

    @property
    deathDestroyDelay: number = 0.2;

    @property(cc.AudioClip)
    stompSfx: cc.AudioClip = null;

    @property
    scoreValue: number = 100;

    private body: cc.RigidBody = null;
    private startX: number = 0;
    private moveDir: number = -1;
    private isDead: boolean = false;
    private isPaused: boolean = false;
    private currentAnimationName: string = "";

    onLoad() {
        this.body = this.getComponent(cc.RigidBody);
        if (!this.enemyAnimation) {
            this.enemyAnimation = this.getComponent(cc.Animation);
        }
        this.startX = this.node.x;
    }

    start() {
        this.playAnimation(this.walkClipName);
    }

    update(dt: number) {
        if (this.isDead || this.isPaused) {
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
            if (velocity.y < 0) {
                velocity.y = this.fallSpeed;
            }
            this.body.linearVelocity = velocity;
        } else {
            this.node.x += this.moveDir * this.moveSpeed * dt;
        }

        this.node.scaleX = Math.abs(this.node.scaleX) * (this.moveDir > 0 ? -1 : 1);
        this.updateAnimation();
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
            this.playEffect(this.stompSfx);
            this.addScore(this.scoreValue);
            this.die();
            return;
        }

        this.pauseMotion();
        const managerNode = cc.find("Canvas/GameManager") || cc.find("GameManager");
        const gameManager = managerNode ? managerNode.getComponent("GameManager") as any : null;
        if (gameManager && gameManager.hurtPlayer) {
            gameManager.hurtPlayer(this.node);
        }
    }

    pauseMotion() {
        this.isPaused = true;
        if (this.body) {
            this.body.linearVelocity = cc.v2(0, 0);
            this.body.angularVelocity = 0;
        }
    }

    resumeMotion() {
        if (this.isDead) {
            return;
        }

        this.isPaused = false;
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

        if (this.playAnimation(this.deathClipName)) {
            this.scheduleOnce(() => this.node.destroy(), this.deathDestroyDelay);
            return;
        }

        this.node.destroy();
    }

    private updateAnimation() {
        if (this.body && Math.abs(this.body.linearVelocity.y) > 1) {
            this.playAnimation(this.flyClipName);
            return;
        }

        this.playAnimation(this.walkClipName);
    }

    private playAnimation(clipName: string): boolean {
        if (!this.enemyAnimation || !clipName || this.currentAnimationName === clipName) {
            return false;
        }

        const state = this.enemyAnimation.getAnimationState(clipName);
        if (!state) {
            return false;
        }

        this.enemyAnimation.play(clipName);
        this.currentAnimationName = clipName;
        return true;
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
