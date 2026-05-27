const {ccclass, property} = cc._decorator;

@ccclass
export default class GameOver extends cc.Component {

    private static readonly LastResultKey: string = "web_mario_last_result";
    private static readonly LeaderboardKey: string = "web_mario_leaderboard";

    @property
    gameScene: string = "Game scene";

    @property
    startMenuScene: string = "Start menu";

    @property(cc.Label)
    finalScoreLabel: cc.Label = null;

    @property(cc.Label)
    finalTimeLabel: cc.Label = null;

    @property(cc.EditBox)
    nameEditBox: cc.EditBox = null;

    start() {
        this.updateFinalResultLabels();
    }

    restartLevel() {
        cc.director.loadScene(this.gameScene);
    }

    goToStartMenu() {
        cc.director.loadScene(this.startMenuScene);
    }

    submitScore() {
        const result = this.loadLastResult();
        if (result.finished) {
            const leaderboard = this.loadLeaderboard();
            leaderboard.push({
                name: this.getPlayerName(),
                score: result.score,
                time: result.time,
                timestamp: Date.now(),
            });
            this.saveLeaderboard(leaderboard);
        }

        this.goToStartMenu();
    }

    private updateFinalResultLabels() {
        const result = this.loadLastResult();

        if (this.finalScoreLabel) {
            this.finalScoreLabel.string = "FINAL SCORE " + this.formatNumber(result.score, 0);
        }

        if (this.finalTimeLabel) {
            this.finalTimeLabel.string = "FINAL TIME " + this.formatNumber(result.time, 3);
        }
    }

    private getPlayerName(): string {
        if (!this.nameEditBox) {
            return "PLAYER";
        }

        const name = this.nameEditBox.string.trim();
        if (!name) {
            return "PLAYER";
        }

        return name.substring(0, 12);
    }

    private loadLastResult(): any {
        const json = cc.sys.localStorage.getItem(GameOver.LastResultKey);
        if (!json) {
            return { score: 0, time: 0, finished: false };
        }

        try {
            const result = JSON.parse(json);
            return {
                score: Number(result.score) || 0,
                time: Number(result.time) || 0,
                finished: result.finished === true,
            };
        } catch (error) {
            return { score: 0, time: 0, finished: false };
        }
    }

    private loadLeaderboard(): any[] {
        const json = cc.sys.localStorage.getItem(GameOver.LeaderboardKey);
        if (!json) {
            return [];
        }

        try {
            const records = JSON.parse(json);
            return Array.isArray(records) ? records : [];
        } catch (error) {
            return [];
        }
    }

    private saveLeaderboard(records: any[]) {
        records.sort((a, b) => {
            const scoreDiff = (Number(b.score) || 0) - (Number(a.score) || 0);
            if (scoreDiff !== 0) {
                return scoreDiff;
            }

            return (Number(a.time) || 0) - (Number(b.time) || 0);
        });

        cc.sys.localStorage.setItem(GameOver.LeaderboardKey, JSON.stringify(records.slice(0, 5)));
    }

    private formatNumber(value: number, digits: number): string {
        let text = Math.max(0, Math.floor(value || 0)).toString();
        while (text.length < digits) {
            text = "0" + text;
        }
        return text;
    }
}
