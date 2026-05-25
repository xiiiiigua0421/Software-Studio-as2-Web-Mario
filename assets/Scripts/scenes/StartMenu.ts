const {ccclass, property} = cc._decorator;

@ccclass
export default class StartMenu extends cc.Component {

    @property
    levelSelectScene: string = "Level select";

    goToLevelSelect() {
        cc.director.loadScene(this.levelSelectScene);
    }
}
