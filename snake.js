/*
Author: Awixor
website: Awixor.com
*/

const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// load images

const ground = new Image();
ground.src = "img/bg1.png";

const foodImg = new Image();
foodImg.src = "img/orange.png";

const repeatImg = new Image();
repeatImg.src = "img/repeat (2).png";

// load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

let dir = './audio/'

/******************* A ****************** */
let A = [];
for (i=0 ; i<8 ;i++){
    let note = 'A';
    A.push(note += i);
}
/******************************** */
/******************* C ****************** */
let C = [];
for (i=1 ; i<=8 ;i++){
    let note = 'C';
    C.push(note += i);
}
/******************************** */
/******************* Ds ****************** */
let Ds = [];
for (i=1 ; i<8 ;i++){
    let note = 'Ds';
    Ds.push(note += i);
}
/******************************** */
/******************* Fs ****************** */
let Fs = [];
for (i=1 ; i<8 ;i++){
    let note = 'Fs';
    Fs.push(note += i);
}
/******************************** */
/********************All in ONE  */
let all=[];
for (i of A){
    all.push(i);
}
for (i of C){
    all.push(i);
}for (i of Ds){
    all.push(i);
}for (i of Fs){
    all.push(i);
}
/********************All in ONE  */

// create the snake

let snake = [];

snake[0] = {
    x: 9 * box,
    y: 10 * box
};

// create the food

let food = {
    x: Math.floor(Math.random() * 17 + 2) * box,
    y: Math.floor(Math.random() * 15 + 4) * box
}

// create the score var

let score = 0;
let bestScore;

//control the snake

let d;
dead.src = "audio/over.wav";
eat.src = "audio/eat.mp3";

document.addEventListener("keydown", direction);
function direction(event) {
    let key = event.keyCode;
    if (key == 37 && d != "RIGHT") {
        let ranDs = Ds[Math.floor(Math.random()*6 + 1)];
        left.src = `audio/${ranDs}.mp3`;
        left.play();
        d = "LEFT";
    } else if (key == 38 && d != "DOWN") {
        let ranA = A[Math.floor(Math.random()*8)];
        up.src = `audio/${ranA}.mp3`;
        d = "UP";
        up.play();
    } else if (key == 39 && d != "LEFT") {
        let ranC = C[Math.floor(Math.random()*7 + 1)];
        right.src = `audio/${ranC}.mp3`;
        d = "RIGHT";
        right.play();
    } else if (key == 40 && d != "UP") {
        let ranFs = Fs[Math.floor(Math.random()*6 + 1)];
        down.src = `audio/${ranFs}.mp3`;
        d = "DOWN";
        down.play();
    }
}
// cheack collision function
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// draw everything to the canvas

function draw() {

    ctx.drawImage(ground, 0, 0);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "#ff6348" : "#f1f2f6";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // which direction
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    // if the snake eats the food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play();
        food = {
            x: Math.floor(Math.random() * 17 + 2) * box,
            y: Math.floor(Math.random() * 15 + 4) * box
        }
        // we don't remove the tail
    } else {
        // remove the tail
        snake.pop();
    }

    // add new Head

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // game over

    if (snakeX < 2 * box || snakeX > 18 * box || snakeY < 4 * box || snakeY > 18 * box || collision(newHead, snake)) {
        clearInterval(game);
        dead.play();
        // bestScore<=score ? bestScore = score:bestScore = bestScore;
        // bestScore = score;
        // ctx.fillStyle = "#d8cdcd";
        // ctx.font = "30px Changa one";
        //ctx.fillText(bestScore,11.5*box,20.3*box);

        ctx.drawImage(repeatImg, 10 * box, 19 * box);

        //const cvs = document.getElementById("snake");
        //const ctx = cvs.getContext("2d");

        document.addEventListener('keypress', repeat);

        function repeat() {
            let key = event.keyCode;
            if (key == 13) {
                location.reload();
            }
        }
        cvs.addEventListener('mousedown', repeatKey, false);

        function repeatKey(event) {
            cx = event.pageX;
            cy = event.pageY;
            console.log(cx, cy);
            if (cx >= 329 && cx <= 393 && cy >= 631 && cy <= 672) {
                location.reload();
                //console.log('you did it');
            }
        }
        /**************************************** */
        /******************************************** */
    }

    snake.unshift(newHead);

    ctx.fillStyle = "#d8cdcd";
    ctx.font = "36px Changa one";
    ctx.fillText(score, 18 * box, 2.1 * box);


}

// call draw function every 100 ms

let game = setInterval(draw, 100);