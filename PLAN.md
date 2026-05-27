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

Status: TypeScript ready, Cocos scene setup still needed

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

Status: TypeScript ready, Cocos button wiring still needed

Codex-owned files:

- [x] `assets/Scripts/StartMenu.ts`
- [x] `assets/Scripts/LevelSelect.ts`
- [x] `assets/Scripts/GameOver.ts`
- [x] `assets/Scripts/GameManager.ts`

User-owned Cocos GUI setup:

1. In `Start menu`, attach `StartMenu.ts` and wire the Start button to `goToLevelSelect`.
2. Create `LeaderboardLabel` and drag it into `StartMenu.leaderboardLabel`.
3. In `Level select`, attach `LevelSelect.ts` and wire the Level 1 button to `startLevelOne`.
4. In `Game scene`, keep `GameManager.ts` attached and drag `Player` into its `player` field.
5. Optional but recommended: create a finish trigger node with a Sensor collider and tag `20`.
6. In `Game over`, attach `GameOver.ts`.
7. Drag `FinalScoreLabel` into `GameOver.finalScoreLabel`.
8. Drag `FinalTimeLabel` into `GameOver.finalTimeLabel`.
9. Drag `NameEditBox` into `GameOver.nameEditBox`.
10. Wire the Submit button to `submitScore`.
11. Wire the Restart button to `restartLevel`.
12. Wire the Menu button to `goToStartMenu`.
13. Confirm all four scenes are added to Build Settings.

Implemented in TypeScript:

- Start menu loads `Level select`.
- Level select loads `Game scene`.
- Game over can restart `Game scene`.
- Game over can return to `Start menu`.
- Game over displays the final score and final time from the previous run.
- Game over can submit a player name after a finished run.
- Start menu displays a Top 5 leaderboard from local storage.
- `GameManager` tracks `Alive`, `Dead`, `Respawning`, and `GameOver`.
- When lives reach 0, `GameManager` loads `Game over`.
- Player contact with finish tag `20` calls `GameManager.finishLevel()` and loads `Game over`.
- Leaderboard sorts by score descending, then time ascending.

## Phase 4: Basic Rules

Status: TypeScript ready, Cocos gameplay objects still need scene setup

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
- Stomping Goomba destroys it.
- Touching Goomba from the side hurts the player.
- Question block triggers only once when hit from below.
- Question block activates and positions its mushroom.
- Mushroom moves right and grows the player when collected.

## Phase 5: Animations

Status: TypeScript hooks ready, Cocos animation clips still needed

Codex-owned files:

- [x] `assets/Scripts/PlayerController.ts`
- [x] `assets/Scripts/gameplay/Enemy.ts`

User-owned Cocos GUI setup:

1. Create `player_idle`, `player_walk`, and `player_jump` animation clips.
2. Add a `cc.Animation` component to `Player`.
3. Add the player clips to the `Player` animation component.
4. Create `goomba_walk` animation clip.
5. Optional: create `goomba_die` animation clip.
6. Add a `cc.Animation` component to the Goomba node.
7. Add the Goomba clips to the Goomba animation component.
8. Save and preview `Game scene`.

Implemented in TypeScript:

- Player switches between idle, walk, and jump clips from movement and grounded state.
- Jump animation plays immediately after a valid jump.
- Goomba plays its walk clip on start.
- Goomba can play an optional death clip before being destroyed.
- Missing animation components or clip names are ignored safely.

## Phase 6: Sound Effects

Status: TypeScript hooks ready, Cocos audio assignment still needed

Codex-owned files:

- [x] `assets/Scripts/GameManager.ts`
- [x] `assets/Scripts/PlayerController.ts`
- [x] `assets/Scripts/gameplay/Enemy.ts`
- [x] `assets/Scripts/gameplay/QuestionBlock.ts`
- [x] `assets/Scripts/gameplay/PowerUp.ts`

User-owned Cocos GUI setup:

1. In `GameManager`, drag a BGM clip such as `bgm_1.mp3` into `bgm`.
2. In `GameManager`, drag `loseOneLife.wav` into `deathSfx`.
3. In `PlayerController`, drag `jump.wav` into `jumpSfx`.
4. In `Enemy`, drag `stomp.wav` into `stompSfx`.
5. In `QuestionBlock`, drag `powerUpAppear.wav` into `itemAppearSfx`.
6. In `PowerUp`, drag `PowerUp.mp3` into `powerUpSfx`.
7. Save and preview `Game scene`.

Implemented in TypeScript:

- BGM plays through `cc.audioEngine.playMusic(clip, true)`.
- Jump, death, stomp, item appear, and power-up sound effects use `playEffect`.
- Sound effects do not stop the BGM.
- Missing audio clips are ignored safely.

## Phase 7: UI

Status: TypeScript ready, Cocos UI labels still needed

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

1. Build the web version.
2. Confirm the main page is named `index.html`.
3. Deploy to Firebase.
4. Open the Firebase URL and make sure the game works correctly.
5. Keep the Firebase link for eeclass submission.

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
- [ ] Correct gravity and collision
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
- [x] Start menu leaderboard
- [x] Game over name input for finished runs
- [ ] Appearance polish
- [x] README.md with completed items and extra features
- [ ] AI_reference.pdf if AI tools are used
- [ ] Firebase deployment
- [ ] Build output includes `index.html`
- [ ] Zip as `Assignment02_StudentID.zip`
- [ ] Exclude `node_modules`
- [ ] Generate MD5 checksum
- [ ] Upload source code to FTP
- [ ] Submit MD5, web link, and GitHub/GitLab URL to eeclass

## Scoring Focus

- Basic rules: 50%
- Animations: 10%
- Sound effects: 10%
- UI: 10%
- Appearance: 10%
- Complete game process: 5%
- Git: 5%
- Bonus: up to 10%
