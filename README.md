# Web Mario

Assignment 02 Web Mario for NTHU Software Studio.

- Engine: Cocos Creator 2.4.8
- Game type: Mario-style web platformer
- Firebase URL: https://software-studio-as2-mario.web.app
- Final package: `Assignment02_113062131.zip`

## Controls

- Move left: `A` or left arrow
- Move right: `D` or right arrow
- Jump: `W`, up arrow, or space

## Scoring Focus

- Complete Game Process
  - Start menu opens the level select scene.
  - Level select starts the game scene.
  - Game scene can end through lives reaching zero or the finish trigger.
  - Game over scene supports restart and return-to-menu flow.
- Basic Rules
  - World Map
    - One playable side-scrolling map is built.
    - Gravity is enabled through the Cocos physics manager.
    - Ground, walls, platforms, player, enemies, blocks, and items use physics colliders.
    - Camera follows the player on the X axis.
  - Level Design
    - Static walls, ground, and platforms are present.
    - Question block can interact with the player.
    - Moving platform is implemented with a looping Cocos action.
  - Player
    - Player moves left/right and jumps by keyboard.
    - Player uses a foot sensor for grounded jump detection.
    - Enemy side contact hurts the player and decreases life.
    - Falling out of bounds decreases life.
    - Player respawns at the initial position when lives remain.
  - Enemies
    - Goomba has physics, patrol movement, and fixed falling speed.
    - Player can defeat Goomba only by stomping from above.
    - Side contact pauses Player and Goomba briefly, then hurts Player.
  - Question Blocks
    - Question block triggers once when hit from below.
    - Mushroom appears from the block.
    - Mushroom makes Mario bigger after collection.
- Animations
  - Player walk and jump animations
  - Enemy walk, fly, and death animation
- Sound Effects
  - BGM
  - Player jump and death sound
  - Additional sound effects
    - Stomp enemy
    - Power up appears
    - Power up collected
    - Get score 
    - Level clear
- UI
  - Life display
  - Score display
  - Timer display
  - Final score/time and leaderboard hooks
- Appearance
  - Map layout, visual assets, UI placement, and preview polish
- Git
  - Project uses Git version control with multiple commits.
- Bonus
  - Firebase deployment
  - Leaderboard
