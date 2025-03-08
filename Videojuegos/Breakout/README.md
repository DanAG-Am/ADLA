# Breakout Game README

## Objective

The goal of this game is to destroy all the bricks by bouncing a ball off a paddle. The ball will automatically bounce off walls and the paddle. Each time the ball hits a brick, the brick is destroyed, and the ball changes color. The game ends when you either lose all your lives or destroy all the bricks.

## Controls

- **Move Left**: Press the **Left Arrow** key to move the paddle left.
- **Move Right**: Press the **Right Arrow** key to move the paddle right.
- **Start the Game**: Press the **'S'** key to start the ball once it is stationary or unmoving.

## Game Rules

1. **Paddle Movement**: The paddle can be moved left and right using the arrow keys. The paddle is confined to the bottom of the screen and cannot move outside the game boundaries (the canvas).
  
2. **Ball Movement**: The ball will automatically start moving when you tap the 's' key on your keyboard. Note that it needs to be lowercase and you will be able to do so 3 times in a single run or game try. It bounces off the top, left, and right walls. If the ball touches the bottom of the screen, you lose one life.

3. **Lives**: You start with 3 lives. Each time the ball touches the bottom, you lose one life. If you lose all your lives, the game ends, and a **GAME OVER** message appears.

4. **Bricks**: There are multiple rows of bricks placed at the top of the screen. When the ball hits a brick, it will be destroyed, and the ball will bounce back. The ball also changes color based on the brick destroyed.

5. **Paddle Size**: Every 5 seconds, the size of the paddle will change:
   - It will become **larger** after a few seconds.
   - It will become **smaller** after another interval.
   - It will return to the **normal size** after a short period.

6. **Winning the Game**: The game is won when all the bricks are destroyed. Once all bricks are eliminated, a **YOU WIN!** message will appear. There are 91 bricks. 

7. **Game Over**: If you lose all your lives (3), a **GAME OVER** message will appear.

## Notes

- The game is based on the classic **Breakout** game.
- The ball's initial velocity is slow but increases as the player progresses, as its velocity is increased by 0.5 everytime a collision happens. 
- The game has a **dynamic paddle size** mechanic that adds an extra challenge.

Enjoy the game!