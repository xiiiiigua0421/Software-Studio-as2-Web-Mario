const {ccclass, property} = cc._decorator;

@ccclass
export default class CameraFollow extends cc.Component {

    @property(cc.Node)
    target: cc.Node = null;

    @property
    minX: number = 0;

    @property
    smooth: number = 0.15;

    private fixedY: number = 0;

    start() {
        this.fixedY = this.node.y;
    }

    lateUpdate() {
        if (!this.target) {
            return;
        }

        const targetX = Math.max(this.minX, this.target.x);
        const nextX = this.node.x + (targetX - this.node.x) * this.smooth;
        this.node.setPosition(nextX, this.fixedY);
    }
}
