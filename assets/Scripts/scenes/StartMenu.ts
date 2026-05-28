const {ccclass, property} = cc._decorator;

@ccclass
export default class StartMenu extends cc.Component {

    private static readonly LeaderboardKey: string = "web_mario_leaderboard";

    @property
    levelSelectScene: string = "Level select";

    @property(cc.Label)
    leaderboardLabel: cc.Label = null;

    start() {
        this.updateLeaderboardLabel();
    }

    goToLevelSelect() {
        cc.director.loadScene(this.levelSelectScene);
    }

    private updateLeaderboardLabel() {
        if (!this.leaderboardLabel) {
            return;
        }

        const records = this.loadLeaderboard();
        const lines = ["LEADERBOARD"];

        for (let i = 0; i < records.length && i < 5; i++) {
            const record = records[i];
            lines.push(
                (i + 1) + ". " +
                this.formatName(record.name) + "  " +
                this.formatNumber(Number(record.score) || 0, 0) + "pt  " +
                this.formatNumber(Number(record.time) || 0, 3) + "s"
            );
        }

        this.leaderboardLabel.string = lines.join("\n");
    }

    private loadLeaderboard(): any[] {
        const json = cc.sys.localStorage.getItem(StartMenu.LeaderboardKey);
        if (!json) {
            return [];
        }

        try {
            const records = JSON.parse(json);
            if (!Array.isArray(records)) {
                return [];
            }

            records.sort((a, b) => {
                const scoreDiff = (Number(b.score) || 0) - (Number(a.score) || 0);
                if (scoreDiff !== 0) {
                    return scoreDiff;
                }

                return (Number(a.time) || 0) - (Number(b.time) || 0);
            });
            return records.slice(0, 5);
        } catch (error) {
            return [];
        }
    }

    private formatName(name: string): string {
        if (!name) {
            return "PLAYER";
        }

        return name.substring(0, 12);
    }

    private formatNumber(value: number, digits: number): string {
        let text = Math.max(0, Math.floor(value || 0)).toString();
        while (text.length < digits) {
            text = "0" + text;
        }
        return text;
    }
}
