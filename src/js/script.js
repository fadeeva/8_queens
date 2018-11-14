window.onload = function() { init(); }

let canvas = null;
let ctx = null;

let queenArr = [];
let queen = document.getElementById("queen");
let tipOff = document.getElementById("tip_off");
tipOff.style.opacity = 1;

function init() {
    canvas = document.getElementById("squares");
    canvasCnt = document.getElementById("chess_desk");
    
    ctx = canvas.getContext("2d");
    
    let squareColor = {
        dark:  '#987a64',
        light: '#e4dad3',
        highlight: {
            dark:  "#bb625e",
            light: "#e89ba1"
        }
    }
    
    let sideOfSquare = 80;
    
    drawChessSquares(sideOfSquare, squareColor);
    
    canvas.addEventListener("click", function(event) {
        let setQueen = getClickCoord(canvas, canvasCnt, event, sideOfSquare)
        //drawDot(mousePos.x, mousePos.y, sideOfSquare)
        putTheQueen(setQueen, sideOfSquare)
        //getSquarePos(mousePos.x, mousePos.y, sideOfSquare)
    });
    
    tipOff.addEventListener("click", function(event) {
        if(this.style.opacity == 0) {
            this.style.opacity = 1;
        } else {
            this.style.opacity = 0;
        }
        tipToggle(queenArr,sideOfSquare, squareColor);
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
 * Получает объект с координатами
 * и длину стороны квадрата.
 */
function putTheQueen(posObj, sideOfSquare) {
    let counter = document.getElementById("counter_num")
    
    if(queenArr.length < 8) {
        drawQueenOnCanvas(posObj)
        queenArr.push({id: queenArr.length, coord: posObj})
        counter.innerHTML = queenArr.length;
    } else {
        return;
    }
    
    console.log(queenArr)
}

/**
 * Рисует королеву на канвасе, получает объект с координатами
 */
function drawQueenOnCanvas(posObj) {
    ctx.drawImage(queen, posObj.canvasX - parseInt(queen.width / 2), posObj.canvasY - parseInt(queen.height / 2));
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
    
    let vertical = Math.ceil(clickX / sideOfSquare);
    let horizontal = Math.ceil(clickY / sideOfSquare);
    
    let canvasX = vertical * sideOfSquare - sideOfSquare / 2;
    let canvasY = horizontal * sideOfSquare - sideOfSquare / 2;
    
    let chessHorizontal = Math.abs(Math.ceil(clickY / sideOfSquare) - 9)
    let chessVertical = "abcdefgh".charAt(vertical - 1);
    
    return { 
            pixelX: clickX,
            pixelY: clickY,
            canvasX: canvasX,
            canvasY: canvasY,
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
            x += sideOfSquare;

            if(j != 7)
                currentColor = (currentColor == squareColor.light) ? squareColor.dark : squareColor.light;
        }
        x = 0;
        y += sideOfSquare;   
    }

}

/**
 * Включение подсказки
 */
function tipToggle(queenArr, sideOfSquare, squareColor) { 

    if(queenArr.length != 0) {
        for(let i = 0; i < queenArr.length; i++) {
            for(let j = 0; j < 8; j++) {
                if(j == (queenArr[i].coord.vertical - 1)) continue;
                
                if(queenArr[i].coord.horizontal % 2 == 0) {
                    if(j % 2 != 0) {
                        ctx.fillStyle = squareColor.highlight.light;
                    } else {
                        ctx.fillStyle = squareColor.highlight.dark;
                    }
                } else {
                    if(j % 2 != 0) {
                        ctx.fillStyle = squareColor.highlight.dark;
                    } else {
                        ctx.fillStyle = squareColor.highlight.light;
                    }
                }
                ctx.fillRect(sideOfSquare * j, (queenArr[i].coord.horizontal - 1) * sideOfSquare, sideOfSquare, sideOfSquare);
                ctx.fill();
            }
            
            for(let k = 0; k < 8; k++) {
                if(k == queenArr[i].coord.horizontal - 1) continue;
                
                if(queenArr[i].coord.vertical % 2 == 0) {
                    if(k % 2 != 0) {
                        ctx.fillStyle = squareColor.highlight.light;
                    } else {
                        ctx.fillStyle = squareColor.highlight.dark;
                    }
                } else {
                    if(k % 2 != 0) {
                        ctx.fillStyle = squareColor.highlight.dark;
                    } else {
                        ctx.fillStyle = squareColor.highlight.light;
                    }
                }
                ctx.fillRect((queenArr[i].coord.vertical - 1) * sideOfSquare, sideOfSquare * k, sideOfSquare, sideOfSquare);
                ctx.fill();
            }
        }
    }
}