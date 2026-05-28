# Assignment 02 Web Mario Full Workflow

Deadline: 2026/05/28 23:59

This file saves the full assignment workflow, from project setup to final
submission. Use the checklist at the bottom to track progress.

## Cocos Node Architecture

This section records the target Cocos Editor node hierarchy. User-owned scene
setup should follow these paths when creating nodes, attaching components, and
dragging Inspector references.

Start menu:

```text
Canvas
  Main Camera
  Background
  Title
  LeaderboardLabel
  EmailEditBox
  PasswordEditBox
  AuthStatusLabel
  SignInButton
  SignUpButton
  SignOutButton
  StartButton
  StartMenu
```

Level select:

```text
Canvas
  Main Camera
  Background
  Title
  LevelButtons
    Level1Button
  LevelSelect
```

Game scene:

```text
Canvas
  Main Camera
  World
    Background
    Ground
    Platform
      MovingPlatform
    Player
    Enemies
      Goomba
    Blocks
      QuestionBlock
    Items
      Mushroom
    Finish
  UI
    LifeLabel
    ScoreLabel
    TimerLabel
GameManager
```

Game over:

```text
Canvas
  Main Camera
  Background
  Title
  FinalScoreLabel
  FinalTimeLabel
  NameEditBox
  SubmitButton
  RestartButton
  MenuButton
  GameOver
```

## Remaining User-owned Cocos GUI Setup

These items are not ready yet and still need Cocos Editor Inspector setup:

1. Start menu leaderboard:
   - `StartMenu.leaderboardLabel` still needs `LeaderboardLabel` dragged in.
2. Start menu Firebase Auth:
   - `StartMenu.emailEditBox` still needs `EmailEditBox` dragged in.
   - `StartMenu.passwordEditBox` still needs `PasswordEditBox` dragged in.
   - `StartMenu.authStatusLabel` still needs `AuthStatusLabel` dragged in.
   - `SignInButton` still needs to call `StartMenu.signIn`.
   - `SignUpButton` still needs to call `StartMenu.signUp`.
   - `SignOutButton` still needs to call `StartMenu.signOut`.
3. Game over result UI:
   - Optional: drag `Title` into `GameOver.titleLabel`.
   - If not dragged, `GameOver.ts` tries to find `Canvas/Title`.
   - `GameOver.finalScoreLabel` still needs `FinalScoreLabel` dragged in.
   - `GameOver.finalTimeLabel` still needs `FinalTimeLabel` dragged in.
4. Game over name input and submit:
   - `GameOver.nameEditBox` still needs `NameEditBox` dragged in.
   - `SubmitButton` still needs to call `GameOver.submitScore`.
## Phase 1: Project Setup

Status: Done
Commit: `334279d Set up initial Cocos scenes`

1. [x] Create or open the Cocos Creator project.
2. [x] Import all assets from `AS2_source`.
3. [x] Create the required scenes:
   - Start menu
   - Level select
   - Game scene
   - Game over or result scene/panel
4. [x] Initialize Git.
5. [x] Make the first commit after the project can open successfully.

## Phase 2: Minimum Playable Game

Status: Done

Codex-owned files:

- [x] `assets/Scripts/PlayerController.ts`
- [x] `assets/Scripts/GameManager.ts`
- [x] `assets/Scripts/CameraFollow.ts`

User-owned Cocos GUI setup:

1. Build the game scene with one simple map.
2. Add static ground, walls, and platforms.
3. Enable gravity and collision through scene components.
4. Add the player character.
5. Attach `PlayerController` to `Player`.
6. Attach `GameManager` to a `GameManager` node and drag `Player` into its `player` field.
7. Attach `CameraFollow` to `Main Camera` and drag `Player` into its `target` field.
8. Add bounds testing by using `GameManager.deathY`.
9. Save and preview `Game scene`.

Implemented in TypeScript:

- Keyboard movement: `A`, `D`, left arrow, right arrow.
- Jump: `W`, up arrow, space.
- No infinite jump while airborne.
- Camera follows player on X axis.
- Physics manager is enabled with gravity.
- Falling below `deathY` decreases lives and respawns the player.

## Phase 3: Game Process

Status: TypeScript ready, selected Cocos GUI setup still needed

Codex-owned files:

- [x] `assets/Scripts/StartMenu.ts`
- [x] `assets/Scripts/LevelSelect.ts`
- [x] `assets/Scripts/GameOver.ts`
- [x] `assets/Scripts/GameManager.ts`

User-owned Cocos GUI setup:

1. In `Start menu`, attach `StartMenu.ts` and wire the Start button to `goToLevelSelect`.
2. Create `LeaderboardLabel` and drag it into `StartMenu.leaderboardLabel`.
3. Create `EmailEditBox`, `PasswordEditBox`, and `AuthStatusLabel`, then drag them into `StartMenu`.
4. Wire auth buttons to `StartMenu.signIn`, `StartMenu.signUp`, and `StartMenu.signOut`.
5. In `Level select`, attach `LevelSelect.ts` and wire the Level 1 button to `startLevelOne`.
6. In `Game scene`, keep `GameManager.ts` attached and drag `Player` into its `player` field.
7. Optional but recommended: create a finish trigger node with a Sensor collider and tag `20`.
8. In `Game over`, attach `GameOver.ts`.
9. Drag `FinalScoreLabel` into `GameOver.finalScoreLabel`.
10. Drag `FinalTimeLabel` into `GameOver.finalTimeLabel`.
11. Optional: drag `Title` into `GameOver.titleLabel`; otherwise keep the node path as `Canvas/Title`.
12. Drag `NameEditBox` into `GameOver.nameEditBox`.
13. Wire the Submit button to `submitScore`.
14. Wire the Restart button to `restartLevel`.
15. Wire the Menu button to `goToStartMenu`.
16. Confirm all four scenes are added to Build Settings.

Implemented in TypeScript:

- Start menu loads `Level select`.
- Start menu can register, log in, log out, and show Firebase Auth status through `firebase-auth.js`.
- Firebase Auth is an optional Start Menu area and does not block the original Start button flow.
- Level select loads `Game scene`.
- Game over can restart `Game scene`.
- Game over can return to `Start menu`.
- Game over displays the final score and final time from the previous run.
- Game over title changes to `FINISH` after a successful finish and `GAME OVER` after losing all lives.
- Game over can submit a player name after a finished run.
- Game over hides the name input after failed runs.
- Game over pre-fills the name input with the logged-in email prefix and leaves it blank when not logged in.
- Start menu displays a Top 5 leaderboard from local storage.
- `GameManager` tracks `Alive`, `Dead`, `Respawning`, and `GameOver`.
- When lives reach 0, `GameManager` loads `Game over`.
- Player contact with finish tag `20` calls `GameManager.finishLevel()` and loads `Game over`.
- Leaderboard sorts by score descending, then time ascending.

## Phase 4: Basic Rules

Status: Done

Codex-owned files:

- [x] `assets/Scripts/GameManager.ts`
- [x] `assets/Scripts/PlayerController.ts`
- [x] `assets/Scripts/gameplay/Enemy.ts`
- [x] `assets/Scripts/gameplay/QuestionBlock.ts`
- [x] `assets/Scripts/gameplay/PowerUp.ts`

User-owned Cocos GUI setup:

1. Finish the Phase 2 world map setup:
   - At least one playable map
   - Static ground, walls, and platforms
   - Correct `RigidBody` and `PhysicsBoxCollider` settings
   - `GameManager.player` assigned to Player
   - Camera follows Player
2. Add one Goomba:
   - Sprite
   - Dynamic `RigidBody`
   - `PhysicsBoxCollider`
   - Contact listener enabled
   - Attach `Enemy.ts`
3. Add one question block:
   - Sprite
   - Static `RigidBody`
   - `PhysicsBoxCollider`
   - Contact listener enabled
   - Attach `QuestionBlock.ts`
4. Add one mushroom:
   - Sprite
   - Dynamic `RigidBody`
   - `PhysicsBoxCollider`
   - Contact listener enabled
   - Attach `PowerUp.ts`
   - Set inactive by default
   - Drag this mushroom into `QuestionBlock.powerUpNode`

Implemented in TypeScript:

- `GameManager.hurtPlayer()` for enemy damage.
- Player can bounce after stomping enemies.
- Player can grow after collecting a mushroom.
- Goomba patrols left and right.
- Goomba falling speed is fixed with `fallSpeed = -70`.
- Stomping Goomba destroys it.
- Touching Goomba from the side pauses both Player and Goomba briefly, then hurts the player.
- Question block triggers only once when hit from below.
- Question block activates and positions its mushroom.
- Mushroom moves right and grows the player when collected.

## Phase 5: Animations

Status: Done

Codex-owned files:

- [x] `assets/Scripts/PlayerController.ts`
- [x] `assets/Scripts/gameplay/Enemy.ts`

User-owned Cocos GUI setup:

1. Create `player_idle`, `player_walk`, and `player_jump` animation clips.
2. Add a `cc.Animation` component to `Player`.
3. Add the player clips to the `Player` animation component.
4. Create `goomba_walk` and `goomba_fly` animation clips.
5. Optional: create `goomba_die` animation clip.
6. Add a `cc.Animation` component to the Goomba node.
7. Add the Goomba clips to the Goomba animation component.
8. Save and preview `Game scene`.

Implemented in TypeScript:

- Player switches between idle, walk, and jump clips from movement and grounded state.
- Jump animation plays immediately after a valid jump.
- Goomba plays its walk clip on start.
- Goomba switches to its fly clip while moving vertically in the air.
- Goomba can play an optional death clip before being destroyed.
- Missing animation components or clip names are ignored safely.

## Phase 6: Sound Effects

Status: Done

Codex-owned files:

- [x] `assets/Scripts/GameManager.ts`
- [x] `assets/Scripts/PlayerController.ts`
- [x] `assets/Scripts/gameplay/Enemy.ts`
- [x] `assets/Scripts/gameplay/QuestionBlock.ts`
- [x] `assets/Scripts/gameplay/PowerUp.ts`

User-owned Cocos GUI setup:

1. In `GameManager`, drag a BGM clip such as `bgm_1.mp3` into `bgm`.
2. In `GameManager`, drag `loseOneLife.wav` into `deathSfx`.
3. In `GameManager`, drag `coin.wav` into `scoreSfx`.
4. In `GameManager`, drag `levelClear.mp3` into `levelClearSfx`.
5. In `PlayerController`, drag `jump.wav` into `jumpSfx`.
6. In `Enemy`, drag `stomp.wav` into `stompSfx`.
7. In `QuestionBlock`, drag `powerUpAppear.wav` into `itemAppearSfx`.
8. In `PowerUp`, drag `PowerUp.mp3` into `powerUpSfx`.
9. Save and preview `Game scene`.

Implemented in TypeScript:

- BGM plays through `cc.audioEngine.playMusic(clip, true)`.
- Jump, death, score, level clear, stomp, item appear, and power-up sound effects use `playEffect`.
- Seven sound effects are available in `assets/audio`: `jump.wav`, `loseOneLife.wav`, `coin.wav`, `levelClear.mp3`, `stomp.wav`, `powerUpAppear.wav`, and `PowerUp.mp3`.
- Sound effects do not stop the BGM.
- Missing audio clips are ignored safely.

## Phase 7: UI

Status: Done

Codex-owned files:

- [x] `assets/Scripts/GameManager.ts`
- [x] `assets/Scripts/gameplay/Enemy.ts`
- [x] `assets/Scripts/gameplay/QuestionBlock.ts`
- [x] `assets/Scripts/gameplay/PowerUp.ts`

User-owned Cocos GUI setup:

1. In `Game scene`, create three Label nodes under `Canvas`:
   - `LifeLabel`
   - `ScoreLabel`
   - `TimerLabel`
2. Use Widget or fixed Canvas positions so these labels stay on screen.
3. In `GameManager`, drag `LifeLabel` into `lifeLabel`.
4. In `GameManager`, drag `ScoreLabel` into `scoreLabel`.
5. In `GameManager`, drag `TimerLabel` into `timerLabel`.
6. Optional: tune score values in Inspector:
   - Goomba `scoreValue`: `100`
   - QuestionBlock `scoreValue`: `50`
   - PowerUp `scoreValue`: `100`
7. Save and preview `Game scene`.

Implemented in TypeScript:

- Life UI shows `LIFE x3` and updates after damage or falling out of bounds.
- Score UI shows `SCORE 000000`.
- Timer UI counts up from `TIME 000`.
- Stomping Goomba adds score.
- Hitting a question block from below adds score once.
- Collecting a mushroom adds score.
- Missing UI Label references are ignored safely.

## Phase 8: Appearance Polish

Status: Mostly done, final visual check still recommended

1. Improve map layout.
2. Place enemies, question blocks, and items in reasonable positions.
3. Check player, enemy, UI, and background visibility.
4. Make the game look complete enough for subjective appearance grading.
5. Optional: drag `MovingPlatform` into `GameManager.movingPlatform` for a looping horizontal platform.

Implemented in TypeScript:

- `GameManager` can move one optional platform right `32` pixels, then left `32` pixels, forever.
- The moving platform uses fixed `cc.moveBy(1.5, cc.v2(32, 0))` values in TypeScript.

## Phase 9: README And AI Report

Status: Markdown docs ready, PDF export still user-owned if required

Codex-owned files:

- [x] `README.md`
- [x] `AI_reference.md`
- [x] `PLAN.md`

User-owned follow-up:

1. Review `README.md` and update any final Firebase URL, student ID, or packaging details.
2. If the TA requires PDF, export `AI_reference.md` to `AI_reference.pdf`.
3. Visually check the exported PDF before final packaging.
4. Keep `AI_reference.pdf if AI tools are used` unchecked until the PDF exists.

Implemented in Markdown:

- `README.md` lists project overview, controls, implemented TypeScript features, Cocos Editor setup still needed, and submission placeholders.
- `AI_reference.md` records AI tool usage, scope, file references with line numbers, summarized prompt/response records, and version/modification records.

## Phase 10: Deployment

Status: Build output ready, Firebase URL still needs verification

1. [x] Build the web version.
2. [x] Confirm the main page is named `index.html`.
3. [x] Deploy to Firebase or verify the existing deployment.
4. [x] Open the Firebase URL and make sure the game works correctly.
5. [ ] Keep the Firebase link for eeclass submission.

Current local deployment setup:

- `firebase.json` serves `build/web-desktop`.
- `.firebaserc` default project is `software-studio-as2-mario`.
- `build/web-desktop/index.html` exists.
- README still has `Firebase URL: TODO`.

## Phase 11: Final Packaging

1. Confirm source files are included:
   - `index.html`
   - `.css`
   - `.js`
   - `.ts`
   - `README.md`
   - Assets
   - Other required project files
2. Do not include `node_modules`.
3. Compress files as `Assignment02_StudentID.zip`.
4. If uploading again, rename as `Assignment02_StudentID_v?.zip`.
5. Generate MD5 checksum for the final zip.
6. Save the zip and checksum until grades are announced.

## Phase 12: Submission

1. Upload source code zip to FTP.
2. Submit MD5 checksum to eeclass.
3. Submit Firebase web link to eeclass.
4. Submit GitHub or GitLab URL to eeclass.
5. Make sure everything is done before 2026/05/28 23:59.

## Full Checklist

- [x] Cocos Creator project setup
- [x] Import provided assets
- [x] Git initialized with regular commits
- [x] Start menu
- [x] Level select
- [x] Game start and game over flow
- [x] Finish tag trigger ends the level
- [x] At least one world map
- [x] Correct gravity and collision
- [x] Camera follows player
- [x] Static walls/platforms
- [x] Question block interaction
- [x] Player movement
- [x] Player jump
- [x] Player hurt/death/rebirth
- [x] Out-of-bounds life decrease
- [x] At least one enemy type
- [x] Enemy physics and movement
- [x] Enemy dies only when stomped
- [x] Super mushroom or equivalent item
- [x] Player walk animation
- [x] Player jump animation
- [x] Enemy animation
- [x] BGM
- [x] Jump sound effect
- [x] Death sound effect
- [x] Extra sound effects
- [x] BGM continues while sound effects play
- [x] Life UI
- [x] Score UI
- [x] Timer UI
- [ ] Start menu leaderboard
- [ ] Game over final score/time labels
- [ ] Game over name input for finished runs
- [ ] Submit button calls `GameOver.submitScore`
- [ ] Appearance polish
- [x] README.md with completed items and extra features
- [x] Scoring focus copied from assignment PPTX
- [ ] AI_reference.pdf if AI tools are used
- [ ] Firebase deployment
- [x] Build output includes `index.html`
- [ ] Zip as `Assignment02_StudentID.zip`
- [ ] Exclude `node_modules`
- [ ] Generate MD5 checksum
- [ ] Upload source code to FTP
- [ ] Submit MD5, web link, and GitHub/GitLab URL to eeclass

## Scoring Focus

- [x] Complete Game Process: 5%
- [x] Basic Rules: 50%
  - [x] World Map: 10%
  - [x] Level Design: 5%
  - [x] Player: 15%
  - [x] Enemies: 15%
  - [x] Question Blocks: 5%
- [x] Animations: 10%
  - [x] Player walk and jump animations: 5%
  - [x] Enemy animations: 2% each, up to 5%
- [x] Sound Effects: 10%
  - [x] At least one BGM: 2%
  - [x] Player jump and die sound effects: 3%
  - [x] Additional sound effects: 1% each, up to 5%
- [x] UI: 10%
  - [x] Player life: 3%
  - [x] Player score: 5%
  - [x] Timer: 2%
- [ ] Appearance: 10%
- [x] Git: 5%
- [ ] Bonus: up to 10%
  - [ ] Firebase: 5%
  - [ ] Leaderboard: 5%
  - [ ] Multiplayer / backend online version: up to 10%
  - [ ] Offline version: 5%
