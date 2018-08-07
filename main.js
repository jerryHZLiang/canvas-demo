

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var lineWidth = 5;
autoSetCanvasSize(canvas);

/*************/
ListenToUser(canvas);
/*******/

var eraserEnabled = false;

pen.onclick = function () {
    eraserEnabled = false;
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = function () {
    eraserEnabled = true;
    eraser.classList.add('active')
    pen.classList.remove('active')
}

red.onclick = function(){
    ctx.strokeStyle = "red"
    ctx.fillStyle = "red"
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}

green.onclick = function(){
    ctx.strokeStyle = "green";
    ctx.fillStyle = "green";
    green.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
}

blue.onclick = function(){
    ctx.strokeStyle = "blue";
    ctx.fillStyle = "blue";
    blue.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
}

thin.onclick = function(){
    lineWidth = 5;
}

thick.onclick = function(){
    lineWidth = 10;
}

clear.onclick = function(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
}

download.onclick = function(){
    var url=canvas.toDataURL("./image/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = 'my canvas'
    a.target = '_blank'
    a.click()
}



/****/



function autoSetCanvasSize(canvas) {
    setCanvasSize();
    window.onresize = function () {
        setCanvasSize();
    }

    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;

        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
}

function drawCircle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineWidth = lineWidth;
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}

function ListenToUser(canvas) {

    var using = false;
    var lastPoint = {
        x: undefined,
        y: undefined
    };

//特性检测
    if (document.body.ontouchstart !== undefined) {
        //触屏设备
        canvas.ontouchstart = function (msg) {
            var x = msg.touches[0].clientX
            var y = msg.touches[0].clientY
            using = true;
            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    x: x,
                    y: y
                }
            }
        }
        canvas.ontouchmove = function (msg) {
            var x = msg.touches[0].clientX
            var y = msg.touches[0].clientY
            if (!using) {
                return
            }

            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = {
                    x: x,
                    y: y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                lastPoint = newPoint;
            }
        }
        canvas.ontouchend = function (msg) {
            using = false
        }
    } else {
        //非触屏设备
        canvas.onmousedown = function (msg) {
            var x = msg.clientX
            var y = msg.clientY
            using = true;
            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    x: x,
                    y: y
                }
            }
        }

        canvas.onmousemove = function (msg) {
            var x = msg.clientX
            var y = msg.clientY
            if (!using) {
                return
            }

            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = {
                    x: x,
                    y: y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                lastPoint = newPoint;
            }
        }

        canvas.onmouseup = function (msg) {
            using = false
        }
    }
}