const container = document.querySelector("#game-container");
let x = 1;
let y = 1;
let xVelocity = 1;
let yVelocity = 0;

window.addEventListener("load", start);

function start(){
    addDiv("snake", x, y);
    nextTick();
}
function nextTick(){
    setTimeout(() => {
        move();
        nextTick();
    }, 100);
}
function move(){
    addDiv("snake", x += xVelocity, y += yVelocity);
    removeDiv("snake", 0);
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
