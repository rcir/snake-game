const container = document.querySelector("#game-container");

function generateDiv(className){
    let div = document.createElement("div");
    div.classList.add(className);
    container.appendChild(div);
}