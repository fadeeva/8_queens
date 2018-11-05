window.onload = function() { init(); }

let canvas = null;
let ctx = null;

function init() {
    canvas = document.getElementById("squares");
    ctx = canvas.getContext("2d");
    
    let squareColor = {
        dark : '#987a64',
        light : '#e4dad3'
    }
    
    let sideOfSquare = 80;
    
    drawChessSquares(sideOfSquare, squareColor);
}

function drawChessSquares(sideOfSquare, squareColor) {
    let currentColor = squareColor.light;
    let x = 0, y = 0; 
    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            ctx.fillStyle = currentColor;
            ctx.fillRect(x, y, sideOfSquare, sideOfSquare);
            ctx.fill();
            x += 80;

            if(j != 7)
                currentColor = (currentColor == squareColor.light) ? squareColor.dark : squareColor.light;
        }
        x = 0;
        y += sideOfSquare;   
    }

}