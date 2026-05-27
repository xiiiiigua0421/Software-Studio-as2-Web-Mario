const {ccclass, property} = cc._decorator;

@ccclass
export default class GameOver extends cc.Component {

    private static readonly FinalScoreKey: string = "web_mario_final_score";

    @property
    gameScene: string = "Game scene";

    @property
    startMenuScene: string = "Start menu";

    @property(cc.Label)
    finalScoreLabel: cc.Label = null;

    start() {
        this.updateFinalScoreLabel();
    }

    restartLevel() {
        cc.director.loadScene(this.gameScene);
    }

    goToStartMenu() {
        cc.director.loadScene(this.startMenuScene);
    }

    private updateFinalScoreLabel() {
        if (!this.finalScoreLabel) {
            return;
        }

        const scoreText = cc.sys.localStorage.getItem(GameOver.FinalScoreKey) || "0";
        this.finalScoreLabel.string = "FINAL SCORE " + this.formatNumber(Number(scoreText), 0);
    }

    private formatNumber(value: number, digits: number): string {
        let text = Math.max(0, Math.floor(value || 0)).toString();
        while (text.length < digits) {
            text = "0" + text;
        }
        return text;
    }
}
