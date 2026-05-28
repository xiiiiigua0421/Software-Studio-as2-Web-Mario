const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerController extends cc.Component {

    @property
    moveSpeed: number = 110;

    @property
    jumpSpeed: number = 520;

    @property
    enemyBounceSpeed: number = 420;

    @property
    growScale: number = 1.5;

    @property
    groundSensorTag: number = 10;

    @property
    finishTag: number = 20;

    @property(cc.Node)
    gameManagerNode: cc.Node = null;

    @property(cc.Animation)
    playerAnimation: cc.Animation = null;

    @property
    idleClipName: string = "player_idle";

    @property
    walkClipName: string = "player_walk";

    @property
    jumpClipName: string = "player_jump";

    @property(cc.AudioClip)
    jumpSfx: cc.AudioClip = null;

    private body: cc.RigidBody = null;
    private moveDir: number = 0;
    private groundContactCount: number = 0;
    private baseScaleX: number = 1;
    private baseScaleY: number = 1;
    private isBig: boolean = false;
    private currentAnimationName: string = "";
    private paused: boolean = false;

    onLoad() {
        this.body = this.getComponent(cc.RigidBody);
        if (!this.playerAnimation) {
            this.playerAnimation = this.getComponent(cc.Animation);
        }
        this.baseScaleX = Math.abs(this.node.scaleX);
        this.baseScaleY = Math.abs(this.node.scaleY);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    update() {
        if (!this.body || this.paused) {
            return;
        }

        const velocity = this.body.linearVelocity;
        velocity.x = this.moveDir * this.moveSpeed;
        this.body.linearVelocity = velocity;

        if (this.moveDir !== 0) {
            this.node.scaleX = Math.abs(this.node.scaleX) * (this.moveDir > 0 ? 1 : -1);
        }

        this.updateAnimation();
    }

    onBeginContact(contact: cc.PhysicsContact, self: cc.PhysicsCollider, other: cc.PhysicsCollider) {
        if (this.isFinishCollider(other)) {
            this.finishLevel();
            return;
        }

        if (!this.isGroundSensor(self)) {
            return;
        }

        this.groundContactCount++;
    }

    onEndContact(contact: cc.PhysicsContact, self: cc.PhysicsCollider) {
        if (!this.isGroundSensor(self)) {
            return;
        }

        this.groundContactCount = Math.max(0, this.groundContactCount - 1);
    }

    resetMotion() {
        this.paused = false;
        if (this.body) {
            this.body.linearVelocity = cc.v2(0, 0);
            this.body.angularVelocity = 0;
        }
        this.moveDir = 0;
        this.groundContactCount = 0;
        this.playAnimation(this.idleClipName);
    }

    pauseMotion() {
        this.paused = true;
        this.moveDir = 0;
        if (this.body) {
            this.body.linearVelocity = cc.v2(0, 0);
            this.body.angularVelocity = 0;
        }
    }

    bounceFromEnemy() {
        if (!this.body) {
            return;
        }

        const velocity = this.body.linearVelocity;
        velocity.y = this.enemyBounceSpeed;
        this.body.linearVelocity = velocity;
        this.groundContactCount = 0;
    }

    grow() {
        if (this.isBig) {
            return;
        }

        this.isBig = true;
        const direction = this.node.scaleX < 0 ? -1 : 1;
        this.node.scaleX = this.baseScaleX * this.growScale * direction;
        this.node.scaleY = this.baseScaleY * this.growScale;
    }

    private onKeyDown(event: cc.Event.EventKeyboard) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.moveDir = -1;
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.moveDir = 1;
                break;
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
            case cc.macro.KEY.space:
                this.jump();
                break;
        }
    }

    private onKeyUp(event: cc.Event.EventKeyboard) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                if (this.moveDir < 0) {
                    this.moveDir = 0;
                }
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                if (this.moveDir > 0) {
                    this.moveDir = 0;
                }
                break;
        }
    }

    private jump() {
        if (!this.body || this.groundContactCount <= 0) {
            return;
        }

        const velocity = this.body.linearVelocity;
        velocity.y = this.jumpSpeed;
        this.body.linearVelocity = velocity;
        this.groundContactCount = 0;
        this.playEffect(this.jumpSfx);
        this.playAnimation(this.jumpClipName);
    }

    private isGroundSensor(collider: cc.PhysicsCollider): boolean {
        return collider && collider.tag === this.groundSensorTag;
    }

    private isFinishCollider(collider: cc.PhysicsCollider): boolean {
        return collider && collider.tag === this.finishTag;
    }

    private finishLevel() {
        const managerNode = this.gameManagerNode || cc.find("Canvas/GameManager");
        const manager = managerNode && managerNode.getComponent("GameManager") as any;

        if (manager && manager.finishLevel) {
            manager.finishLevel();
        }
    }

    private updateAnimation() {
        if (this.groundContactCount <= 0) {
            this.playAnimation(this.jumpClipName);
            return;
        }

        if (this.moveDir !== 0) {
            this.playAnimation(this.walkClipName);
            return;
        }

        this.playAnimation(this.idleClipName);
    }

    private playAnimation(clipName: string) {
        if (!this.playerAnimation || !clipName || this.currentAnimationName === clipName) {
            return;
        }

        const state = this.playerAnimation.getAnimationState(clipName);
        if (!state) {
            return;
        }

        this.playerAnimation.play(clipName);
        this.currentAnimationName = clipName;
    }

    private playEffect(clip: cc.AudioClip) {
        if (!clip) {
            return;
        }

        cc.audioEngine.playEffect(clip, false);
    }
}
