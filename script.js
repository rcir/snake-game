const container = document.querySelector("#game-container");
let x = 1;
let y = 1;
let xVelocity = 1;
let yVelocity = 0;
let fx;
let fy;
let gameSpeed = 100;

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
        nextTick();
    }, gameSpeed);
}
function move(){
    addDiv("snake", x += xVelocity, y += yVelocity);
    removeDiv("snake", 0);
}
function changeDirection(event){
    switch(true){
        case event.keyCode == 37:
            xVelocity = -1;
            yVelocity = 0;
            break;
        case event.keyCode == 38:
            xVelocity = 0;
            yVelocity = -1;
            break;
        case event.keyCode == 39:
            xVelocity = 1;
            yVelocity = 0;
            break;
        case event.keyCode == 40:
            xVelocity = 0;
            yVelocity = 1;
            break;
    }
}
function ateFood(){
    return x == fx && y == fy;
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
    document.querySelectorAll(`.${className}`)[index].remove();
}
function generateNewFoodCoordinates(){
    fx = Math.floor(Math.random()*25+1);
    fy = Math.floor(Math.random()*25+1);
}
