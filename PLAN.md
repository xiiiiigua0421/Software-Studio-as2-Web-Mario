# Assignment 02 Web Mario Full Workflow

Deadline: 2026/05/28 23:59

This file saves the full assignment workflow, from project setup to final
submission. Use the checklist at the bottom to track progress.

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

1. Start from the start menu.
2. Enter level select.
3. Start the selected level.
4. Track current player status:
   - Alive
   - Hurt
   - Dead
   - Respawning
   - Game over
5. Return to menu or restart after game over.

## Phase 4: Basic Rules

1. World map:
   - Correct physics properties
   - Objects fall due to gravity
   - Objects collide correctly
   - Background and camera move according to player position
   - At least one world map
2. Level design:
   - Static walls/platforms
   - Question blocks that interact with the player
3. Player:
   - Correct physics properties
   - Keyboard movement and jump
   - Gets hurt or loses life when touching enemies incorrectly
   - Loses life when out of bounds
   - Reborns at the initial position after death
4. Enemies:
   - At least one enemy type
   - Correct physics properties
   - Player can kill enemy only by hitting its head
5. Question blocks:
   - At least one type
   - Example: super mushroom that makes Mario bigger
   - Correct interaction with player

## Phase 5: Animations

1. Player idle animation.
2. Player walking animation.
3. Player jumping animation.
4. Enemy animation.
5. Optional item/effect animations for better appearance.

## Phase 6: Sound Effects

1. Add at least one BGM.
2. Add player jump sound effect.
3. Add player death sound effect.
4. Add extra sound effects if possible:
   - Coin
   - Stomp
   - Item appear
   - Power up
   - Power down
   - Level clear
5. Make sure sound effects do not stop the BGM.

## Phase 7: UI

1. Show player life.
2. Show player score.
3. Show timer.
4. Update UI values during gameplay.
5. Polish menu buttons and game panels.

## Phase 8: Appearance Polish

1. Improve map layout.
2. Place enemies, question blocks, and items in reasonable positions.
3. Check player, enemy, UI, and background visibility.
4. Make the game look complete enough for subjective appearance grading.

## Phase 9: README And AI Report

1. Create or update `README.md`.
2. List completed scoring items.
3. Describe extra functions or bonus features.
4. If AI tools were used, create `AI_reference.pdf` in the project root.
5. In `AI_reference.pdf`, include:
   - AI tools used
   - Scope of usage
   - File names and line numbers
   - Prompt and response records
   - Modified version and explanation
6. If no AI tools were used, state that no AI tools were used.

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
- [ ] Game start and game over flow
- [ ] At least one world map
- [ ] Correct gravity and collision
- [ ] Camera follows player
- [ ] Static walls/platforms
- [ ] Question block interaction
- [ ] Player movement
- [ ] Player jump
- [ ] Player hurt/death/rebirth
- [ ] Out-of-bounds life decrease
- [ ] At least one enemy type
- [ ] Enemy physics and movement
- [ ] Enemy dies only when stomped
- [ ] Super mushroom or equivalent item
- [ ] Player walk animation
- [ ] Player jump animation
- [ ] Enemy animation
- [ ] BGM
- [ ] Jump sound effect
- [ ] Death sound effect
- [ ] Extra sound effects
- [ ] BGM continues while sound effects play
- [ ] Life UI
- [ ] Score UI
- [ ] Timer UI
- [ ] Appearance polish
- [ ] README.md with completed items and extra features
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
