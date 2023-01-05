const container = document.querySelector("#game-container");
let x = 1;
let y = 1;
let xVelocity;
let yVelocity;

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
    document.querySelectorAll(className)[index].remove();
}
