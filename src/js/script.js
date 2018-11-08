window.onload = function() { init(); }

let canvas = null;
let ctx = null;

let numberOfQueens = 0;
let queen = document.getElementById("queen");

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
        let setQueen = getClickCoord(canvas, canvasCnt, event, sideOfSquare)
        //drawDot(mousePos.x, mousePos.y, sideOfSquare)
        putTheQueen(setQueen.horizontal, setQueen.vertical, sideOfSquare)
        //getSquarePos(mousePos.x, mousePos.y, sideOfSquare)
    });

}

/**
 * Вспомогательная функция для определения координат, 
 * поведение похоже на getClickCoord(). Позже удалить.
 */
function getSquarePos(clickX, clickY, sideOfSquare) {
    let vertical = Math.ceil(clickX / sideOfSquare);
    let horizontal = Math.ceil(clickY / sideOfSquare);
    
    let chessHorizontal = Math.abs(Math.ceil(clickY / sideOfSquare) - 9)
    let chessVertical = "abcdefgh".charAt(vertical - 1);
    
    console.log("vert: " + vertical + ", horiz: " + horizontal)
    console.log("chessV: " + chessVertical + ", chessH: " + chessHorizontal)
}


/**
 * Ставит королеву на клетку, по которой кликнули.
 * Получает горизонталь, вертикаль клика (не координаты!!!)
 * и длину стороны квадрата.
 */
function putTheQueen(horizontal, vertical, sideOfSquare) {
    let centerX = horizontal * sideOfSquare - sideOfSquare / 2;
    let centerY = vertical * sideOfSquare - sideOfSquare / 2;
    
    if(numberOfQueens < 8) {
        ctx.drawImage(queen, centerX - parseInt(queen.width / 2), centerY - parseInt(queen.height / 2));
        numberOfQueens++;
    } else {
        return;
    }
    
}

/**
 * Вспомогательная функция для рисования точки в центре 
 * квадрата, по которому кликнули, вместо королевы. Позже удалить.
 */
function drawDot(x, y, sideOfSquare) {
    let centerX = Math.ceil(x / sideOfSquare) * sideOfSquare - sideOfSquare / 2;
    let centerY = Math.ceil(y / sideOfSquare) * sideOfSquare - sideOfSquare / 2;
    
    console.log(centerX + ", " + centerY + " | " + x + ", " + y);
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#232323";
    ctx.fill();
}


/**
 * EventListener для клика. Определяет координаты клика, горизонталь
 * и вертикаль клика, в тч и в виде шахматной нотации, возвращает
 * всё это в виде объекта
 */
function getClickCoord(canvas, canvasCnt, event, sideOfSquare) {  
    let offsetX = canvas.offsetLeft;
    let offsetY = canvas.offsetTop;
    let offsetCntY = canvasCnt.offsetTop; // top div'a, в котором лежит canvas
    let offsetCntX = canvasCnt.offsetLeft; // left div'a, в котором лежит canvas
    
    let clickX = Math.abs(parseInt(event.pageX-(offsetX + offsetCntX)));
    let clickY = Math.abs(parseInt(event.pageY-(offsetY + offsetCntY)));
    
    let horizontal = Math.ceil(clickX / sideOfSquare);
    let vertical = Math.ceil(clickY / sideOfSquare);
    
    let chessHorizontal = Math.abs(Math.ceil(clickY / sideOfSquare) - 9)
    let chessVertical = "abcdefgh".charAt(vertical - 1);
    
    return { 
            pixelX: clickX,
            pixelY: clickY,
            vertical: vertical,
            horizontal: horizontal,
            chessVertical: chessVertical,
            chessHorizontal: chessHorizontal
        }
}

/**
 * Рисует шахматную доску, учитывая длину стороны клетки (sideOfSquare)
 * и цвета для клетки (squareColor)
 */
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