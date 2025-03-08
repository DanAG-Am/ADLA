/*
 * Implementation of the game of Atari Breakout
 *
 * Amilka Daniela Lopez Aguilar
 * 2025-02-25
 */

"use strict";

// Global variables
const canvasWidth = 850;
const canvasHeight = 650;
let oldTime;
const paddleVelocity = 1.3;
const speedIncrease = 0.2;
const initialSpeed = 0.5;
let rightScore = 0;
//As seen in class, we can push items into the canvas with a list made of a list of strings. 
let colors = [
    ['#FF0000','#FF0000','#FF0000','#FF0000','#FF0000','#FF0000','#FF0000','#FF0000','#FF0000','#FF0000','#FF0000','#FF0000'],
    ['#FF4500', '#FF4500', '#FF4500', '#FF4500', '#FF4500', '#FF4500', '#FF4500', '#FF4500', '#FF4500', '#FF4500'],
    ['#FFD700', '#FFD700', '#FFD700', '#FFD700', '#FFD700', '#FFD700', '#FFD700', '#FFD700', '#FFD700', '#FFD700'],
    ['#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000', '#008000'],
    ['#0000FF', '#0000FF', '#0000FF', '#0000FF', '#0000FF', '#0000FF', '#0000FF', '#0000FF', '#0000FF', '#0000FF'],
    ['#800080', '#800080', '#800080', '#800080', '#800080', '#800080', '#800080', '#800080', '#800080', '#800080'],
    ['#00FFFF', '#00FFFF', '#00FFFF', '#00FFFF', '#00FFFF', '#00FFFF', '#00FFFF', '#00FFFF', '#00FFFF', '#00FFFF']
];
//Empty list of bricks to push them into it
let bricks = [];
let inPlay = false;
let gameTries = 3;
let destroyedBricks = 0; // Track the number of destroyed bricks
// Context of the Canvas
let ctx;

// Ball Class (The Ball)
class Ball extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "ball");
        this.radius = 10;  // Simple radius for circular behavior
        this.initVelocity();
        this.inPlay = false;
    }

    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime));
    }

    initVelocity() {
        this.inPlay = true;
        let angle = (Math.random() * (Math.PI / 16)) - (Math.PI / 8);
        this.velocity = new Vec(Math.cos(angle), Math.abs(Math.sin(angle))).times(initialSpeed); //always starts by falling
    }

    reset() {
        this.inPlay = false;
        this.position = new Vec(canvasWidth / 2, canvasHeight / 2);
        this.velocity = new Vec(0, 0);
    }

    //override the constructor to make a ball. arc documentation: https://www.w3schools.com/graphics/canvas_circles.asp
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);  // Drawing as a circle
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}


// Brick Class (The Game Bricks)
class Brick extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "brick");
    }
}

// Paddle Class
class Paddle extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "paddle");
        this.velocity = new Vec(0.0, 0.0);
    }

    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime));
        if (this.position.x < 0) {
            this.position.x = 0;
        } else if (this.position.x + this.width > canvasWidth) {
            this.position.x = canvasWidth - this.width;
        }
    }
}

// Initializing Game Objects
const box = new Ball(new Vec(canvasWidth / 2, canvasHeight / 2), 20, 20, "white");
const bottomPaddle = new Paddle(new Vec(canvasWidth / 2 - 50, canvasHeight - 100), 100, 20, "white");
const topBar = new GameObject(new Vec(0, 0), canvasWidth, 20, "black", "obstacle");
const bottomBar = new GameObject(new Vec(0, canvasHeight - 20), canvasWidth, 20, "black", "obstacle");
const leftBar = new GameObject(new Vec(0, 0), 20, canvasHeight, "black", "leftBar");
const rightBar = new GameObject(new Vec(canvasWidth - 20, 0), 20, canvasHeight, "black", "rightBar");
const rightLabel = new TextLabel(400, 60, "40px Ubuntu Mono", "white");

const brickWidth = 57;  // Brick width
const brickHeight = 20; // Brick height

const startX = (canvasWidth - (brickWidth * 13)) / 2;  //Centered
const startY = 80;  // Starting Y position for the first row of bricks

// Create bricks. Dinamic bricks based on their row and column position (like an x,y coordinate)
for (let row = 0; row < colors.length; row++) {
    for (let col = 0; col < 13; col++) {
        let brickColor = colors[row][col];  // Correct color for each brick
        let brickPosition = new Vec(startX + col * brickWidth, startY + row * brickHeight); //"build" the brick 
        bricks.push(new Brick(brickPosition, brickWidth, brickHeight, brickColor)); //push into the array where all bricks are contained. this will be the variable used to call on them
    }
}


//extra mechanic: variable paddle size every 5 seconds 
let paddleState = 'normal'; // 'normal' or 'large'
const normalPaddleWidth = 100; // Initial size
const largePaddleWidth = 150; // Increased size
const smallPaddleWidth = 50;

function changePaddleSize() {
    // Check current state and change paddle width accordingly
    if (paddleState === 'normal') {
        bottomPaddle.width = largePaddleWidth; // Make the paddle larger
        paddleState = 'large'; // Update state
    } 
    else if(paddleState==='large'){
        bottomPaddle.width = smallPaddleWidth; // Make the paddle smaller
        paddleState = 'small'; // Update state
    }
    else {
        bottomPaddle.width = normalPaddleWidth; // Reset to normal size
        paddleState = 'normal'; // Update state
    }
}
setInterval(changePaddleSize, 5000);

function main() {
    const canvas = document.getElementById('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext('2d');

    createEventListeners();
    drawScene(0);
}

function createEventListeners() {
    window.addEventListener('keydown', (event) => {
         if (event.key === 's') {
            if (!box.inPlay && gameTries != 0) {
                inPlay = true;
                box.initVelocity(); // Start the ball movement when 'S' is pressed
            }
        }

        if (event.code == 'ArrowLeft') {
            bottomPaddle.velocity = new Vec(-paddleVelocity, 0); 
        } else if (event.code == 'ArrowRight') {
            bottomPaddle.velocity = new Vec(paddleVelocity, 0); 
        }
    });

    window.addEventListener('keyup', (event) => {
        if (event.code == 'ArrowLeft' || event.code == 'ArrowRight') {
            bottomPaddle.velocity = new Vec(0, 0); // Stop moving
        }
    });

    window.addEventListener('keyup', (event) => {
        if (event.code == 'ArrowLeft' || event.code == 'ArrowRight') {
            bottomPaddle.velocity = new Vec(0, 0); // Stop moving when arrow keys are released
        }

    });
}

function drawScene(newTime) {
    if (oldTime === undefined) {
        oldTime = newTime;
    }
    let deltaTime = newTime - oldTime;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    rightLabel.draw(ctx, `Bricks: ${destroyedBricks} Lives: ${gameTries}`); //displaying game lives for debugging 
    leftBar.draw(ctx);
    rightBar.draw(ctx);
    topBar.draw(ctx);
    bottomBar.draw(ctx);
    bottomPaddle.draw(ctx);
    box.draw(ctx);

    if (inPlay) {
        box.update(deltaTime);
    }
    
    bottomPaddle.update(deltaTime);

    if (boxOverlap(box, bottomPaddle)) {
        box.velocity.y = -0.5;
        box.velocity.initialSpeed;

    }

    if (boxOverlap(box, leftBar) || boxOverlap(box, rightBar)) {
        box.velocity.x *= -1;
        box.velocity.initialSpeed;
    }

    if (boxOverlap(box, topBar)) {
        box.velocity.y = -1;
        box.velocity.initialSpeed;
    }

    if (boxOverlap(bottomBar,box)) {
        if (gameTries!=0){
            gameTries = gameTries - 1; // Decrease lives when ball hits the bottom
            box.reset();
        }

        if (gameTries==0){
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.font = "48px Arial";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("GAME OVER", canvasWidth / 2, canvasHeight / 2);
            inPlay = false;
            return
        }
    }

    oldTime = newTime;
    requestAnimationFrame(drawScene);
    // Draw bricks
    bricks.forEach(brick => {
        brick.draw(ctx);
    });
     // Check for brick collisions
     bricks.forEach((brick, index) => {
        if (boxOverlap(box, brick)) {
            bricks.splice(index, 1);
            destroyedBricks++;
            box.velocity.y *= -1; // Bounce the ball off the brick
            box.color = brick.color; //extra mechanic, change the ball color to the one of the brick(s) destroyed
        }
    });
    // Check for win condition
    if (destroyedBricks === 91) {  // 91 is the total number of bricks
        // a message saying you win
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.font = "48px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("YOU WIN!", canvasWidth / 2, canvasHeight / 2);
    }
}
