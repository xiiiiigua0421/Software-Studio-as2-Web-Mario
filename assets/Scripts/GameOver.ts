const {ccclass, property} = cc._decorator;

@ccclass
export default class GameOver extends cc.Component {

    @property
    gameScene: string = "Game scene";

    @property
    startMenuScene: string = "Start menu";

    restartLevel() {
        cc.director.loadScene(this.gameScene);
    }

    goToStartMenu() {
        cc.director.loadScene(this.startMenuScene);
    }
}
