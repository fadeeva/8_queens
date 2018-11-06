window.onload = function() { init(); }

let canvas = null;
let ctx = null;

function init() {
    canvas = document.getElementById("squares");
    canvasCnt = document.getElementById("chess_desk");
    
    ctx = canvas.getContext("2d");
    
    let squareColor = {
        dark : '#987a64',
        light : '#e4dad3'
    }
    
    let sideOfSquare = 80;
    
    drawChessSquares(sideOfSquare, squareColor);
    
    
    canvas.addEventListener("click", function(event) {
        let mousePos = getClickCoord(canvas, canvasCnt, event)
        drawDot(mousePos.x, mousePos.y, sideOfSquare)
    });

}

function drawDot(x, y, sideOfSquare) {
    let centerX = Math.ceil(x / sideOfSquare) * sideOfSquare - sideOfSquare / 2;
    let centerY = Math.ceil(y / sideOfSquare) * sideOfSquare - sideOfSquare / 2;
    
    console.log(centerX + ", " + centerY + " | " + x + ", " + y);
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#232323";
    ctx.fill();
}

function getClickCoord(canvas, canvasCnt, event) {
    
    let offsetX = canvas.offsetLeft;
    let offsetY = canvas.offsetTop;
    let offsetCntY = canvasCnt.offsetTop;
    let offsetCntX = canvasCnt.offsetLeft;
    
    let mouseX = Math.abs(parseInt(event.pageX-(offsetX + offsetCntX)));
    let mouseY = Math.abs(parseInt(event.pageY-(offsetY + offsetCntY)));
    
    return { x: mouseX, y: mouseY }
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