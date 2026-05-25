const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerController extends cc.Component {

    @property
    moveSpeed: number = 220;

    @property
    jumpSpeed: number = 520;

    private body: cc.RigidBody = null;
    private moveDir: number = 0;
    private groundContactCount: number = 0;

    onLoad() {
        this.body = this.getComponent(cc.RigidBody);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    update() {
        if (!this.body) {
            return;
        }

        const velocity = this.body.linearVelocity;
        velocity.x = this.moveDir * this.moveSpeed;
        this.body.linearVelocity = velocity;

        if (this.moveDir !== 0) {
            this.node.scaleX = Math.abs(this.node.scaleX) * (this.moveDir > 0 ? 1 : -1);
        }
    }

    onBeginContact() {
        this.groundContactCount++;
    }

    onEndContact() {
        this.groundContactCount = Math.max(0, this.groundContactCount - 1);
    }

    resetMotion() {
        if (this.body) {
            this.body.linearVelocity = cc.v2(0, 0);
            this.body.angularVelocity = 0;
        }
        this.moveDir = 0;
        this.groundContactCount = 0;
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
    }
}
