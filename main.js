//1. 初始化数据
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var lineWidth = 3;
var radius = 1;
var eraserEnabled = false;

// pen = document.getElementById("pen"),
// eraser = document.getElementById("eraser"),
// color = document.getElementById("color"),
// thickness = document.getElementById("sizes"),
// actions = document.getElementById("actions")

autoSetCanvasSize(canvas);

/*监听用户*/
ListenToUser(canvas);
/*******/

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

black.onclick = function(){
    ctx.strokeStyle = "black"
    ctx.fillStyle = "black"
    black.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    red.classList.remove('active')
}

red.onclick = function(){
    ctx.strokeStyle = "red"
    ctx.fillStyle = "red"
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    black.classList.remove('active')
}

green.onclick = function(){
    ctx.strokeStyle = "green";
    ctx.fillStyle = "green";
    green.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    black.classList.remove('active')
}

blue.onclick = function(){
    ctx.strokeStyle = "blue";
    ctx.fillStyle = "blue";
    blue.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    black.classList.remove('active')
}

thin.onclick = function(){
    lineWidth = 2;
    radius = 1;
    thin.classList.add('active')
	middle.classList.remove('active')
	thick.classList.remove('active')
}

middle.onclick = function(){
    lineWidth = 6;
    radius = 3;
	thin.classList.remove('active')
	middle.classList.add('active')
	thick.classList.remove('active')
}
thick.onclick = function(){
    lineWidth = 10;
    radius = 5;
	thin.classList.remove('active')
	middle.classList.remove('active')
	thick.classList.add('active')
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

/* 画圆点 */
function drawCircle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}
/* 画轨迹（线条） */
function drawLine(x1, y1, x2, y2) {
    // 解决IOS中获取不到ctx设置的问题
    if (ctx.lineWidth === 1) {
      ctx.lineWidth = 2
      ctx.radius = 1
    }
    ctx.lineCap="round";
    ctx.lineWidth = lineWidth;
    ctx.radius = radius;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
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
            e.preventDefault();
            var x = msg.touches[0].clientX
            var y = msg.touches[0].clientY
            var newPoint = {x: x,y: y}
            if (!using) {
                return
            }

            if (eraserEnabled) {
                ctx.clearRect(x - 8, y - 8, 16, 16)
            } else {
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
                lastPoint = {x: x,y: y};
                drawCircle(x, y, ctx.radius);
            }
        }
        canvas.onmousemove = function (msg) {
            var x = msg.clientX
            var y = msg.clientY
            var newPoint = {x: x,y: y}
            if (!using) {
                return
            }
            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                lastPoint = newPoint;
            }
        }
        canvas.onmouseup = function (msg) {
            using = false
        }
    }
}

/****/
/* 自动调整画布宽高 */
function autoSetCanvasSize(canvas) {
    setCanvasSize();
    window.onresize = function () {
        setCanvasSize();
    }
 //设置画布宽高
    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;

        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
}