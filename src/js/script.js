window.onload = function() { init(); }

const canvas = document.getElementById("squares");
let ctx = null;

let queenArr = [];
let queen = document.getElementById("queen");
let tipOff = document.getElementById("tip_off");
tipOff.style.opacity = 1;

let squareColor = {
    dark:  '#987a64',
    light: '#e4dad3',
    highlight: {
        dark:  "#bb625e",
        light: "#e89ba1"
    }
}

const svgCursorPath = "src/img/mini_queen.svg";
canvas.addEventListener("mouseover", () => {
    canvas.style.cursor = `url(${svgCursorPath}), auto`; 
});

/*
 * Стартовая точка игры.
 */
function init() {
    canvasCnt = document.getElementById("chess_desk");
    
    ctx = canvas.getContext("2d");
    
    let sideOfSquare = 80;
    
    drawChessSquares(sideOfSquare, squareColor);
    
    canvas.addEventListener("click", function(event) {
        let setQueenCoord = getClickCoord(canvas, canvasCnt, event, sideOfSquare)
        //drawDot(mousePos.x, mousePos.y, sideOfSquare)
        putTheQueen(setQueenCoord)
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
 * Узнаём свободна ли клетка
 */
function isPlaceFree(posObj) {
    for(const queen of queenArr) {
        if(queen.coord.canvasX==posObj.canvasX && queen.coord.canvasY==posObj.canvasY)
            return false;
    }
    
    return true;
}

/**
 * Ставит королеву на клетку, по которой кликнули.
 * Получает объект с координатами.
 */
function putTheQueen(posObj) {
    let counter = document.getElementById("counter_num");
    
    if(isPlaceFree(posObj)) {
        if(!queenArr.length || queenArr.length<8) {
            drawQueenOnCanvas(posObj);
            queenArr.push({id: queenArr.length, coord: posObj})
            counter.innerHTML = queenArr.length;
        }
    } else {
        deleteQueenFromCanvas(posObj);
        counter.innerHTML = queenArr.length;
    }
}

/**
 * Рисует королеву на канвасе, получает объект с координатами
 */
function drawQueenOnCanvas(posObj) {
    ctx.drawImage(queen,
                  posObj.canvasX - parseInt(queen.width / 2),
                  posObj.canvasY - parseInt(queen.height / 2));
}

/**
 * Удаляем королеву с канваса, получает объект с координатами
 */
function deleteQueenFromCanvas(posObj) {
    console.log(posObj)
    let queen_id = -1;
    for(const queen of queenArr) {
        if(queen.coord.canvasX==posObj.canvasX && queen.coord.canvasY==posObj.canvasY) {
            queen_id = queen.id;
            break;
        }     
    }
    queenArr.splice(queen_id, 1);
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
    
    let color = (
        (horizontal%2 && vertical%2) || (!horizontal%2 && !vertical%2)
    ) ? squareColor.light : squareColor.dark;
    
    return { 
            pixelX: clickX,
            pixelY: clickY,
            canvasX: canvasX,
            canvasY: canvasY,
            vertical: vertical,
            horizontal: horizontal,
            chessVertical: chessVertical,
            chessHorizontal: chessHorizontal,
            squareColor: color
        }
}
console.log(5%2)
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
    let colorVar = {};
    if(queenArr.length != 0) {
        for(let i = 0; i < queenArr.length; i++) {
            colorVar = getHighlightColor(queenArr[i].coord)
            
            for(let j = 0; j < 8; j++) {                
                
                // горизонталь, проверяем, чтобы на клетке не было королевы
                if(j != (queenArr[i].coord.vertical - 1)) {
                    ctx.fillStyle = colorVar.h[j % 2];
                    ctx.fillRect(sideOfSquare * j, (queenArr[i].coord.horizontal - 1) * sideOfSquare, sideOfSquare, sideOfSquare);
                    ctx.fill();
                }
                
                // вертикаль, проверяем, чтобы на клетке не было королевы
                if(j != queenArr[i].coord.horizontal - 1) {
                    ctx.fillStyle = colorVar.v[j % 2];
                    ctx.fillRect((queenArr[i].coord.vertical - 1) * sideOfSquare, sideOfSquare * j, sideOfSquare, sideOfSquare);
                    ctx.fill();
                }
                
                // диагональ
                ctx.fillStyle = colorVar.d;
                
                ctx.fillRect((j) * sideOfSquare,
                             (j) * sideOfSquare,
                             sideOfSquare, sideOfSquare);
                ctx.fill();
                
                ctx.fillRect((j) * sideOfSquare,
                             (7 - j) * sideOfSquare,
                             sideOfSquare, sideOfSquare);
                ctx.fill();
                
//                ctx.fillRect((queenArr[i].coord.horizontal - 1 + j) * sideOfSquare,
//                             (queenArr[i].coord.vertical - 1 - j) * sideOfSquare,
//                             sideOfSquare, sideOfSquare);
//                ctx.fill();
//                
//                ctx.fillRect((queenArr[i].coord.horizontal + 1 - j) * sideOfSquare,
//                             (queenArr[i].coord.vertical - 1 - j) * sideOfSquare,
//                             sideOfSquare, sideOfSquare);
//                ctx.fill();
//                
//                ctx.fillRect((queenArr[i].coord.horizontal + 1 + j) * sideOfSquare,
//                             (queenArr[i].coord.vertical - 1 + j) * sideOfSquare,
//                             sideOfSquare, sideOfSquare);
//                ctx.fill();
                
                // клетку, на которой стоит королева, пропускаем
                continue;
            }
        }
    }
}

/**
 * Вычисляем цвета для подсветки полей,
 * которых бьёт королева
 */
function getHighlightColor(coord) {
    let highlightArr = {};
    if(coord.horizontal % 2 == 0) { // чётная горизонталь
        if(coord.vertical % 2 == 0) { // чётная вертикаль
            // same dark
            highlightArr = {
                v: [squareColor.highlight.dark, squareColor.highlight.light],
                h: [squareColor.highlight.dark, squareColor.highlight.light],
                d: squareColor.highlight.light
            }
        } else { // нечётная вертикаль
            //  diff
            // v: light, h: dark
            highlightArr = {
                v: [squareColor.highlight.light, squareColor.highlight.dark],
                h: [squareColor.highlight.dark, squareColor.highlight.light],
                d: squareColor.highlight.dark
            }
        }
    } else { // нечётная горизонталь
        if(coord.vertical % 2 == 0) { // чётная вертикаль
            // diff
            // v: dark, h: light
            highlightArr = {
                v: [squareColor.highlight.dark, squareColor.highlight.light],
                h: [squareColor.highlight.light, squareColor.highlight.dark],
                d: squareColor.highlight.dark
            }
        } else { // нечётная вертикаль
            // same light
            highlightArr = {
                v: [squareColor.highlight.light, squareColor.highlight.dark],
                h: [squareColor.highlight.light, squareColor.highlight.dark],
                d: squareColor.highlight.light
            }
        }
    }
    return highlightArr;
}