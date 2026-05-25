# Web Mario

Assignment 02 Web Mario for NTHU Software Studio.

- Engine: Cocos Creator 2.4.8
- Main project type: Web Mario style platform game
- Current documentation status: Phase 9 Markdown ready
- Firebase URL: TODO after Phase 10
- Final package name: TODO, `Assignment02_StudentID.zip`

## Controls

- Move left: `A` or left arrow
- Move right: `D` or right arrow
- Jump: `W`, up arrow, or space

## Gameplay Overview

The game is a Mario style side-scrolling platformer. The player can move, jump, fall, lose lives, respawn, stomp enemies, hit question blocks, and collect a mushroom power-up. The camera follows the player on the X axis.

## Implemented In TypeScript

- Game process:
  - Start menu loads level select.
  - Level select loads the game scene.
  - Game over can restart the game or return to start menu.
- Basic rules:
  - Physics manager is enabled with gravity.
  - Player movement and jump are controlled by keyboard.
  - Falling below `deathY` decreases life and respawns the player.
  - Enemy patrols left and right.
  - Player can stomp an enemy to defeat it.
  - Side contact with an enemy hurts the player.
  - Question block can be hit from below once.
  - Mushroom appears from the question block and makes the player bigger.
- Animation hooks:
  - Player switches between `player_idle`, `player_walk`, and `player_jump`.
  - Enemy can play `goomba_walk` and optional `goomba_die`.
- Sound hooks:
  - BGM uses `cc.audioEngine.playMusic`.
  - Jump, death, stomp, item appear, and power-up sound effects use `playEffect`.
- UI hooks:
  - Life UI format: `LIFE x3`
  - Score UI format: `SCORE 000000`
  - Timer UI format: `TIME 000`
  - Score increases when stomping enemies, hitting question blocks, and collecting power-ups.

## Cocos Editor Setup Still Needed

- Add all scenes to Build Settings:
  - `Start menu`
  - `Level select`
  - `Game scene`
  - `Game over`
- Wire menu and game over buttons to their scene controller methods.
- Build the game scene map with static ground, walls, and platforms.
- Add and configure Player, Goomba, QuestionBlock, and Mushroom nodes with correct physics components.
- Create and assign animation clips:
  - `player_idle`
  - `player_walk`
  - `player_jump`
  - `goomba_walk`
  - optional `goomba_die`
- Assign audio clips in Inspector:
  - BGM
  - jump
  - death
  - stomp
  - item appear
  - power up
- Create UI labels under Canvas and drag them into `GameManager`:
  - `LifeLabel`
  - `ScoreLabel`
  - `TimerLabel`

## Scoring Checklist Summary

Code-side implementation is ready for:

- Complete game process
- Basic rules
- Animation hooks
- Sound effect hooks
- UI hooks
- Git version control

Editor-side setup and playtesting are still required before marking these as fully complete for grading.

Not completed yet:

- Firebase deployment
- Final web build verification
- Zip packaging
- MD5 checksum
- FTP and eeclass submission

## AI Usage

AI assistance was used during planning, TypeScript implementation, documentation, and commit message drafting. See `AI_reference.md` for the summarized AI usage record.
