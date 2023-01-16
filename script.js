const container = document.querySelector("#game-container");
let gridStart = 1;
let gridEnd = 25;
let x = 1;
let y = 1;
let xVelocity = 1;
let yVelocity = 0;
let fx;
let fy;
let gameSpeed = 100;
let snake;

window.addEventListener("load", start);
window.addEventListener("keydown", changeDirection);

function start(){
    addDiv("snake", x, y);
    generateNewFoodCoordinates();
    addDiv("food", fx, fy);
    nextTick();
}
function nextTick(){
    setTimeout(() => {
        move();
        removeLostParts();
        nextTick();
    }, gameSpeed);
}
function move(){
    x = controlCoordinates(x+xVelocity);
    y = controlCoordinates(y+yVelocity);
    addDiv("snake", x, y);
    ateFood() ? replaceFood() : removeDiv("snake", 0);
}
function controlCoordinates(coordinate){
    if(coordinate < gridStart || coordinate > gridEnd){
        return coordinate < gridStart ? gridEnd : gridStart;
    }
    return coordinate;
}
function changeDirection(event){
    const key = event.keyCode;
    const left = 37;
    const up = 38;
    const right = 39;
    const down = 40;
    snake = document.querySelectorAll(".snake");
    const secondPartX = snake[snake.length-2].style.gridColumnStart;
    const secondPartY = snake[snake.length-2].style.gridRowStart;
    const goingRight = x - secondPartX == 1;
    const goingDown = y - secondPartY == 1;
    const goingLeft = x - secondPartX == -1;
    const goingUp = y - secondPartY == -1;
    switch(true){
        case key == left && !goingRight:
            xVelocity = -1;
            yVelocity = 0;
            break;
        case key == up && !goingDown:
            xVelocity = 0;
            yVelocity = -1;
            break;
        case key == right && !goingLeft:
            xVelocity = 1;
            yVelocity = 0;
            break;
        case key == down && !goingUp:
            xVelocity = 0;
            yVelocity = 1;
            break;
    }
}
function ateFood(){
    return x == fx && y == fy;
}
function replaceFood(){
    removeDiv("food", 0);
    generateNewFoodCoordinates();
    addDiv("food", fx, fy);
}
function removeLostParts(){
    snake = document.querySelectorAll(".snake");
    let head = snake[snake.length-1];
    for(let i=snake.length-5;i>=0;i--){
        if(snake[i].style.gridColumnStart == head.style.gridColumnStart
        && snake[i].style.gridRowStart == head.style.gridRowStart){
            for(let j=i;j>=0;j--){
                snake[j].remove();
            }
        }
    }
}
function addDiv(className, x, y){
    let newDiv = generateDiv(className);
    placeDiv(newDiv, x, y);
}
function generateDiv(className){
    let div = document.createElement("div");
    div.classList.add(className);
    container.appendChild(div);
    return div;
}
function placeDiv(div, x, y){
    div.style.gridColumnStart = x;
    div.style.gridRowStart = y;
}
function removeDiv(className, index){
    snake = document.querySelectorAll(".snake");
    if(className != "snake" || snake.length > 3){
        document.querySelectorAll(`.${className}`)[index].remove();
    }
}
function generateNewFoodCoordinates(){
    let coordinatesAlreadyOccupied;
    snake = document.querySelectorAll(".snake");
    do{
        coordinatesAlreadyOccupied = false;
        fx = Math.floor(Math.random()*25+1);
        fy = Math.floor(Math.random()*25+1);
        for(let i=0;i<snake.length;i++){
            if(snake[i].style.gridColumnStart == fx 
            && snake[i].style.gridRowStart == fy){
                    coordinatesAlreadyOccupied = true;
                    break;
                }
        }
    }while(coordinatesAlreadyOccupied);
}
