const {ccclass, property} = cc._decorator;

@ccclass
export default class LevelSelect extends cc.Component {

    @property
    gameScene: string = "Game scene";

    startLevelOne() {
        cc.director.loadScene(this.gameScene);
    }
}
