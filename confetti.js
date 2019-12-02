
var pieces = [];
var numberOfPieces = 100;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    setInterval( function(){ drawConfetti(); }, 1000/30);
}

function randomColor () {
    var colors = ['#f00', '#0f0', '#00f', '#0ff', '#f0f', '#ff0'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function confettiPiece(x, y, width, height, r, c) {

    ctx.fillStyle = c;

    // Calculate Corners of the figure
    var a = x - width, b = y - height;
    var c = x + width, d = y - height;
    var h = x + width, j = y + height;
    var k = x - width, l = y + height;

    ctx.beginPath();
        ctx.moveTo(Math.cos(r)*(a - x) + Math.sin(r)*(b - y) + x, -Math.sin(r)*(a - x) + Math.cos(r)*(b - y) + y);
        ctx.lineTo(Math.cos(r)*(c - x) + Math.sin(r)*(d - y) + x, -Math.sin(r)*(c - x) + Math.cos(r)*(d - y) + y);
        ctx.lineTo(Math.cos(r)*(h - x) + Math.sin(r)*(j - y) + x, -Math.sin(r)*(h - x) + Math.cos(r)*(j - y) + y);
        ctx.lineTo(Math.cos(r)*(k - x) + Math.sin(r)*(l - y) + x, -Math.sin(r)*(k - x) + Math.cos(r)*(l - y) + y);
    ctx.fill();
}

function drawConfetti () {

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    while (pieces.length < numberOfPieces) {
        pieces.push(new Piece(Math.random() * canvas.width, -20));
    }

    console.log(pieces.length);

    for (var i = 0; i < pieces.length; i++) {
        var p = pieces[i];

        if (p.y > canvas.height) {
            pieces.splice(i, 1);
            continue;
        }

        p.y += p.gravity;
        p.x += p.rotationSpeed;
        p.rotation += p.rotationSpeed;

        confettiPiece(p.x, p.y, p.width, p.height, p.rotation, p.color);
    }
}

function Piece (x, y) {
    this.x = x;
    this.y = y;
    this.width = Math.random() * 2;
    this.height = this.width * Math.random() * 4;
    this.gravity = (Math.random() + 1);
    this.rotation = 0;
    this.rotationSpeed = (Math.random()*2 - 1) * 0.2;
    this.color = randomColor();
}
