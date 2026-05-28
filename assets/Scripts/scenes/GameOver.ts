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

    @property(cc.Label)
    titleLabel: cc.Label = null;

    @property(cc.EditBox)
    nameEditBox: cc.EditBox = null;

    start() {
        this.resolveTitleLabel();
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

        if (this.titleLabel) {
            this.titleLabel.string = result.title;
        }

        this.updateNameInputVisibility(result.finished);
        this.updateDefaultPlayerName(result.finished);

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
            return this.createDefaultResult(false);
        }

        try {
            const result = JSON.parse(json);
            const finished = result.finished === true;
            return {
                score: Number(result.score) || 0,
                time: Number(result.time) || 0,
                finished: finished,
                title: this.getResultTitle(finished),
            };
        } catch (error) {
            return this.createDefaultResult(false);
        }
    }

    private createDefaultResult(finished: boolean): any {
        return {
            score: 0,
            time: 0,
            finished: finished,
            title: this.getResultTitle(finished),
        };
    }

    private getResultTitle(finished: boolean): string {
        return finished ? "FINISH" : "GAME OVER";
    }

    private resolveTitleLabel() {
        if (this.titleLabel) {
            return;
        }

        const titleNode = cc.find("Canvas/Title");
        if (titleNode) {
            this.titleLabel = titleNode.getComponent(cc.Label);
        }
    }

    private updateNameInputVisibility(finished: boolean) {
        if (this.nameEditBox) {
            this.nameEditBox.node.active = finished;
        }
    }

    private updateDefaultPlayerName(finished: boolean) {
        if (!this.nameEditBox) {
            return;
        }

        if (!finished) {
            this.nameEditBox.string = "";
            return;
        }

        this.nameEditBox.string = this.getLoggedInName();
    }

    private getLoggedInName(): string {
        try {
            const auth = (window as any).WebMarioFirebaseAuth;
            if (!auth || !auth.getCurrentUser) {
                return "";
            }

            const user = auth.getCurrentUser();
            if (!user || !user.email) {
                return "";
            }

            return user.email.split("@")[0];
        } catch (error) {
            return "";
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
