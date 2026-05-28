const {ccclass, property} = cc._decorator;

@ccclass
export default class StartMenu extends cc.Component {

    private static readonly LeaderboardKey: string = "web_mario_leaderboard";

    @property
    levelSelectScene: string = "Level select";

    @property(cc.Label)
    leaderboardLabel: cc.Label = null;

    @property(cc.EditBox)
    emailEditBox: cc.EditBox = null;

    @property(cc.EditBox)
    passwordEditBox: cc.EditBox = null;

    @property(cc.Label)
    authStatusLabel: cc.Label = null;

    private unsubscribeAuthState: Function = null;

    start() {
        this.updateLeaderboardLabel();
        this.initAuthState();
    }

    onDestroy() {
        if (this.unsubscribeAuthState) {
            this.unsubscribeAuthState();
            this.unsubscribeAuthState = null;
        }
    }

    goToLevelSelect() {
        cc.director.loadScene(this.levelSelectScene);
    }

    signIn() {
        const auth = this.getAuthClient();
        const credentials = this.getCredentials();
        if (!auth || !credentials) {
            return;
        }

        this.setAuthStatus("LOGGING IN...");
        try {
            auth.signIn(credentials.email, credentials.password)
                .then((result) => this.setAuthStatus("LOGIN: " + result.email))
                .catch((error) => this.setAuthStatus(this.formatAuthError(error)));
        } catch (error) {
            this.setAuthStatus(this.formatAuthError(error));
        }
    }

    signUp() {
        const auth = this.getAuthClient();
        const credentials = this.getCredentials();
        if (!auth || !credentials) {
            return;
        }

        this.setAuthStatus("REGISTERING...");
        try {
            auth.signUp(credentials.email, credentials.password)
                .then((result) => this.setAuthStatus("REGISTERED: " + result.email))
                .catch((error) => this.setAuthStatus(this.formatAuthError(error)));
        } catch (error) {
            this.setAuthStatus(this.formatAuthError(error));
        }
    }

    signOut() {
        const auth = this.getAuthClient();
        if (!auth) {
            return;
        }

        try {
            auth.signOut()
                .then(() => this.setAuthStatus("SIGNED OUT"))
                .catch((error) => this.setAuthStatus(this.formatAuthError(error)));
        } catch (error) {
            this.setAuthStatus(this.formatAuthError(error));
        }
    }

    private initAuthState() {
        const auth = this.getAuthClient();
        if (!auth) {
            return;
        }

        try {
            auth.init();
            this.unsubscribeAuthState = auth.onAuthStateChanged((user) => {
                if (user) {
                    this.setAuthStatus("LOGIN: " + user.email);
                } else {
                    this.setAuthStatus("SIGNED OUT");
                }
            });
        } catch (error) {
            this.setAuthStatus(this.formatAuthError(error));
        }
    }

    private getAuthClient(): any {
        const root = window as any;
        const auth = root.WebMarioFirebaseAuth;
        if (!auth) {
            this.setAuthStatus("AUTH SDK NOT READY");
            return null;
        }

        return auth;
    }

    private getCredentials(): any {
        const email = this.emailEditBox ? this.emailEditBox.string.trim() : "";
        const password = this.passwordEditBox ? this.passwordEditBox.string : "";

        if (!email || !password) {
            this.setAuthStatus("ENTER EMAIL / PASSWORD");
            return null;
        }

        return {
            email: email,
            password: password,
        };
    }

    private setAuthStatus(message: string) {
        if (this.authStatusLabel) {
            this.authStatusLabel.string = message;
        }

        cc.log("[Auth] " + message);
    }

    private formatAuthError(error: any): string {
        if (!error) {
            return "AUTH FAILED";
        }

        if (error.message) {
            return error.message;
        }

        return String(error);
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
