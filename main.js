var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    var colorArr = ["#FF0000", "#98FB98", "#20B2AA", " #778899", "#8B008B", " #DC143C"];
    var randomColor = Math.floor(Math.random() * colorArr.length);
    this.fillColor = colorArr[randomColor];
}

function Square(x, y, dx, dy, width, height) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.width = width;
    this.height = height;
    var colorArr = ["#FF0000", "#98FB98", "#20B2AA", " #778899", "#8B008B", " #DC143C"];
    var randomColor = Math.floor(Math.random() * colorArr.length);
    this.fillColor = colorArr[randomColor];
}

var circles = [];
var squares = [];

/**
* 
* @name chooseFigure
* @function
* The function that randomly calls a function to create shapes
*
*/
function chooseFigure() {
    if (Math.random() > 0.4 && circles.length !== 10) {
        addCircle();
    } else if (squares.length !== 10) {
        addSquare();
    }
}

var start = setInterval(chooseFigure, 5000);

/**
* 
* @name addCircle
* @function
* The function that creates object that produces circle
*
*/
function addCircle() {
    let radius = 5 + Math.random() * (20 + 1 - 5);
    let direction = 0.5 + Math.random() * (2 + 1 - 0.5);
    let square = (Math.PI * Math.pow(radius, 2)).toFixed(2);
    var circle = new Circle(20, 20, direction, -1, radius);
    circles.push(circle);
    console.log(`Size of circle: ${square}, X: ${circle.x}, Y: ${circle.y}, Color: ${circle.fillColor}`);
}

/**
* 
* @name addSquare
* @function
* The function that creates object that produces square
*
*/
function addSquare() {
    let width = height = 5 + Math.random() * (20 + 1 - 5);
    let direction = 0.5 + Math.random() * (2 + 1 - 0.5);
    let size = (Math.pow(width, 2)).toFixed(2);
    var square = new Square(40, 40, direction, -1, width, height);
    squares.push(square);
    console.log(`Size of square: ${size}, X: ${square.x}, Y: ${square.y}, Color: ${square.fillColor}`);
}

/**
* 
* @name drawFigure
* @function
* The function that draws figures
*
*/
function drawFigure() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < circles.length; i++) {
        var circle = circles[i];
        var circle1 = circles[i + 1];
        context.fillStyle = circle.fillColor;
        circle.x += circle.dx;
        circle.y += circle.dy;

        if (circle.x + circle.dx > canvas.width - circle.radius || circle.x + circle.dx < circle.radius) {
            circle.dx = -circle.dx;
        }

        if (circle.y + circle.dy > canvas.height - circle.radius || circle.y + circle.dy < circle.radius) {
            circle.dy = -circle.dy;
        }

        if (circle1 !== undefined) {
            var widthBetweenCircle = Math.sqrt(Math.pow((circle.x - circle1.x), 2) + Math.pow((circle.y - circle1.y), 2));

            if (widthBetweenCircle < circle.radius + circle1.radius) {
                circle.dx = -circle.dx;
                circle1.dx = -circle1.dx;
            }
        }

        context.beginPath();
        context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
    }

    for (var i = 0; i < squares.length; i++) {
        var square = squares[i];
        context.fillStyle = square.fillColor;
        square.x += square.dx;
        square.y += square.dy;

        if (square.x + square.dx > canvas.width - square.width || square.x + square.dx < square.width) {
            square.dx = -square.dx;
        }

        if (square.y + square.dy > canvas.height - square.width || square.y + square.dy < square.width) {
            square.dy = -square.dy;
        }

        context.beginPath();
        context.rect(square.x, square.y, square.width, square.height);
        context.closePath();
        context.fill();
    }
}

setInterval(drawFigure, 25);


