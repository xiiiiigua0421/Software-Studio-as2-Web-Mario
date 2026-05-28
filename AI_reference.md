# AI Reference

This file records summarized AI assistance for Assignment 02 Web Mario.

## AI Tools Used

- Tool: Codex
- Usage type: planning, TypeScript implementation assistance, Cocos Editor setup guidance, documentation drafting, and commit message/description drafting
- Output format: summarized records, not full chat logs

## Scope Of AI Usage

Codex was used to help with:
All code
- Reading the assignment plan and local project structure.
- Planning implementation phases.
- Editing existing TypeScript files for game flow, player control, gameplay rules, animation hooks, sound hooks, and UI hooks.
- Updating `PLAN.md` after phases.
- Drafting and updating README and AI reference Markdown.
- Drafting commit messages and descriptions.

The student remains responsible for:

- Creating Cocos Editor nodes and scenes.
- Assigning Inspector references.
- Creating animation clips.
- Assigning audio clips.
- Building and deploying the web version.
- Packaging, MD5 checksum, and final submission.

## File References

### Game Process

- `assets/Scripts/scenes/StartMenu.ts:9`
  - Loads `Level select` through `goToLevelSelect()`.
- `assets/Scripts/scenes/LevelSelect.ts:9`
  - Loads `Game scene` through `startLevelOne()`.
- `assets/Scripts/scenes/GameOver.ts:32`
  - Restarts `Game scene`.
- `assets/Scripts/scenes/GameOver.ts:36`
  - Returns to `Start menu`.
- `assets/Scripts/scenes/StartMenu.ts:12`
  - Inspector field for the leaderboard label.
- `assets/Scripts/scenes/StartMenu.ts:40`
  - Displays the Top 5 local leaderboard.
- `assets/Scripts/scenes/GameOver.ts:19`
  - Inspector field for the final time label.
- `assets/Scripts/scenes/GameOver.ts:22`
  - Inspector field for the game-over title label.
- `assets/Scripts/scenes/GameOver.ts:25`
  - Inspector field for the name input.
- `assets/Scripts/scenes/GameOver.ts:40`
  - Public `submitScore()` method for the Submit button.
- `assets/Scripts/scenes/GameOver.ts:59`
  - Updates the title to `FINISH` or `GAME OVER`.
- `assets/Scripts/scenes/GameOver.ts:131`
  - Hides the name input after failed runs.

### Player, Physics, Audio, UI

- `assets/Scripts/PlayerController.ts:27`
  - Inspector field for player animation.
- `assets/Scripts/PlayerController.ts:40`
  - Inspector field for jump sound effect.
- `assets/Scripts/PlayerController.ts:190`
  - Plays jump sound after a valid jump.
- `assets/Scripts/PlayerController.ts:225`
  - Checks whether an animation state exists before playing it.
- `assets/Scripts/PlayerController.ts:230`
  - Plays the selected player animation clip.
- `assets/Scripts/PlayerController.ts:115`
  - Pauses player motion during enemy contact.
- `assets/Scripts/PlayerController.ts:202`
  - Calls `GameManager.finishLevel()` after finish trigger contact.
- `assets/Scripts/GameManager.ts:23`
  - Out-of-bounds `deathY` threshold.
- `assets/Scripts/GameManager.ts:32`
  - Enemy hit pause delay.
- `assets/Scripts/GameManager.ts:41`
  - BGM Inspector field.
- `assets/Scripts/GameManager.ts:44`
  - Death sound effect Inspector field.
- `assets/Scripts/GameManager.ts:53`
  - Life label Inspector field.
- `assets/Scripts/GameManager.ts:56`
  - Score label Inspector field.
- `assets/Scripts/GameManager.ts:59`
  - Timer label Inspector field.
- `assets/Scripts/GameManager.ts:98`
  - Detects out-of-bounds player fall.
- `assets/Scripts/GameManager.ts:102`
  - Public `hurtPlayer()` method for enemy damage.
- `assets/Scripts/GameManager.ts:122`
  - Public `finishLevel()` method for finish trigger completion.
- `assets/Scripts/GameManager.ts:169`
  - Saves final score, time, finished state, and result title to local storage.
- `assets/Scripts/GameManager.ts:180`
  - Pauses player motion during enemy contact.
- `assets/Scripts/GameManager.ts:191`
  - Resumes the paused enemy after player respawn.
- `assets/Scripts/GameManager.ts:219`
  - Starts the optional moving platform action.
- `assets/Scripts/GameManager.ts:112`
  - Public `addScore(points)` method.
- `assets/Scripts/GameManager.ts:237`
  - Starts looping BGM with `playMusic`.
- `assets/Scripts/GameManager.ts:245`
  - Plays one-shot sound effects with `playEffect`.
- `assets/Scripts/GameManager.ts:254`
  - Updates life UI text.
- `assets/Scripts/GameManager.ts:262`
  - Updates score UI text.
- `assets/Scripts/GameManager.ts:270`
  - Updates timer UI text.
- `assets/Scripts/CameraFollow.ts:4`
  - Camera follow component.

### Gameplay Objects

- `assets/Scripts/gameplay/Enemy.ts:18`
  - Inspector field for enemy animation.
- `assets/Scripts/gameplay/Enemy.ts:13`
  - Fixed Goomba falling speed.
- `assets/Scripts/gameplay/Enemy.ts:25`
  - Goomba fly animation clip name.
- `assets/Scripts/gameplay/Enemy.ts:37`
  - Enemy score value.
- `assets/Scripts/gameplay/Enemy.ts:73`
  - Clamps Goomba falling speed.
- `assets/Scripts/gameplay/Enemy.ts:97`
  - Adds score after stomping an enemy.
- `assets/Scripts/gameplay/Enemy.ts:105`
  - Pauses Goomba before notifying `GameManager` about side contact.
- `assets/Scripts/gameplay/Enemy.ts:118`
  - Resumes Goomba movement after player respawn.
- `assets/Scripts/gameplay/Enemy.ts:153`
  - Plays the fly animation while Goomba is moving vertically.
- `assets/Scripts/gameplay/Enemy.ts:160`
  - Plays enemy animation clip.
- `assets/Scripts/gameplay/Enemy.ts:187`
  - Calls `GameManager.addScore(points)`.
- `assets/Scripts/gameplay/QuestionBlock.ts:19`
  - Question block score value.
- `assets/Scripts/gameplay/QuestionBlock.ts:41`
  - Adds score when the block is hit from below.
- `assets/Scripts/gameplay/QuestionBlock.ts:66`
  - Plays item appear sound effect.
- `assets/Scripts/gameplay/QuestionBlock.ts:81`
  - Calls `GameManager.addScore(points)`.
- `assets/Scripts/gameplay/PowerUp.ts:13`
  - Power-up score value.
- `assets/Scripts/gameplay/PowerUp.ts:51`
  - Plays power-up sound effect.
- `assets/Scripts/gameplay/PowerUp.ts:52`
  - Adds score after collecting the power-up.
- `assets/Scripts/gameplay/PowerUp.ts:78`
  - Calls `GameManager.addScore(points)`.

### Planning And Documentation

- `PLAN.md`
  - Records phase status, Codex-owned files, user-owned Cocos GUI setup, and implemented TypeScript behavior.
- `README.md`
  - Summarizes the project, controls, scoring focus, implemented features, remaining work, and AI usage.
- `AI_reference.md`
  - Records summarized AI usage.

## Prompt And Response Records

### Project Constraints

- Prompt summary:
  - The user asked Codex to act as a Cocos Creator 2.4.8 Web Mario assignment assistant.
  - The user specified that Codex should modify only existing `.ts` and `.md` files unless explicitly allowed.
  - The user also specified that Cocos Editor nodes, components, Inspector dragging, scenes, and new asset setup are user-owned.
- Response summary:
  - Codex inspected local files and planned work around existing scripts and `PLAN.md`.
  - Codex kept `.fire`, `.meta`, image, audio, and generated Cocos files untouched.

### Phase 2 And 3

- Prompt summary:
  - Build a minimum playable version and game process.
- Response summary:
  - Codex helped prepare TypeScript for player movement, camera follow, physics manager setup, respawn, scene navigation, and game-over flow.
  - Codex listed required Cocos Inspector wiring in `PLAN.md`.

### Phase 4

- Prompt summary:
  - Implement Basic Rules: physics, player, enemy, question block, mushroom.
- Response summary:
  - Codex helped implement enemy patrol, stomp detection, player damage, question block activation, mushroom movement, and player growth.
  - Codex updated `PLAN.md` with TypeScript and Editor responsibilities.

### Phase 5 And 6

- Prompt summary:
  - Implement animation and sound hooks while leaving Animation Clip creation and audio assignment to the Cocos Editor.
- Response summary:
  - Codex added animation clip-name fields and safe `cc.Animation` playback.
  - Codex added audio clip fields for BGM, jump, death, stomp, item appear, and power-up effects.
  - Codex used `playMusic` for BGM and `playEffect` for one-shot sound effects.

### Phase 7

- Prompt summary:
  - Implement UI for life, score, and timer.
- Response summary:
  - Codex added `cc.Label` fields to `GameManager`.
  - Codex added life, score, and count-up timer UI updates.
  - Codex added score hooks for enemy stomp, question block hit, and power-up collection.

### Phase 9

- Prompt summary:
  - Create README and AI reference documentation in Markdown.
  - Use summarized AI records instead of full chat logs.
- Response summary:
  - Codex drafted `README.md`.
  - Codex drafted `AI_reference.md` with tool, scope, file references, prompt summaries, response summaries, and modification records.

### Later Gameplay And Documentation Updates

- Prompt summary:
  - Add finish trigger behavior, final score display, leaderboard/name-input planning, moving platform, Goomba airborne behavior, and enemy-contact pause.
  - Update `PLAN.md`, `README.md`, and AI reference documentation to match the latest project state.
- Response summary:
  - Codex added finish trigger hooks and last-result local storage.
  - Codex added local leaderboard hooks with name input and score/time sorting.
  - Codex added Goomba `goomba_fly` hook and fixed falling speed.
  - Codex added a short pause for Player and Goomba after side enemy contact.
  - Codex restructured `README.md` around the assignment scoring focus.
  - Codex updated `PLAN.md` to track remaining Cocos Inspector tasks and scoring progress.

### Final Result UI Updates

- Prompt summary:
  - Change the game-over title after a successful finish and hide the name input after failed runs.
  - Keep project documentation synchronized with the current scripts.
- Response summary:
  - Codex updated the last-result data with a `FINISH` / `GAME OVER` title.
  - Codex updated `GameOver.ts` so the title label reflects the result state.
  - Codex hid the name input after failed runs and kept it visible only after finished runs.
  - Codex updated Markdown documentation and refreshed source line references.

## Version And Modification Record

- `334279d Set up initial Cocos scenes`
  - Initial Cocos scene setup.
- `c645913 Implement scene flow controllers for phase 3`
  - Scene flow controller implementation.
- `a00cd40 Implement basic gameplay rules for phase 4`
  - Basic rules implementation for player, enemy, question block, and power-up.
- `5fea1cc Add animation and sound hooks for phases 5 and 6`
  - Animation and audio hooks.
- `2be8ff4 Add Phase 7 UI hooks for life score and timer`
  - Life, score, and timer UI hooks.
- `37bae88 fin detect`
  - Finish trigger detection and game-over transition.
- `e42dee3 game over score, font wall`
  - Final score display updates.
- `917c5e5 moving plat, up score`
  - Moving platform and score-related updates.
- `a9103ac Add leaderboard and name input for game over`
  - Local leaderboard and player name input hooks.
- `4d3905f Add Goomba airborne animation behavior`
  - Goomba fly animation and fixed falling speed behavior.
- `defb660 Pause player and enemy briefly on contact`
  - Short pause when Player touches an enemy from the side.
- `5ae9148 Update PLAN.md`
  - Updated planning checklist and scoring documentation.
- `1ec804d Revise docs around scoring focus and AI reference`
  - Documentation updates for scoring focus and AI reference.
- `752507c Add score and level clear sound hooks`
  - Added score and level clear audio hooks.
- `9e906b5 Update HUD and game over result handling`
  - Updated game-over result handling and related documentation.
- `969a733 Update deployment assets and README`
  - Updated deployment assets and README.
- `65c691a v1`
  - Final README update.

## Notes For Final Submission

- If the TA requires `AI_reference.pdf`, export this Markdown file to PDF before submission.
- The PDF should be visually checked before packaging.
- The final package should still include source files, README, assets, and required build files according to the assignment rules.
