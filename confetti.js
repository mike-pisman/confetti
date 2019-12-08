
var maxParticles = 1000;
var particles = [];

var s_gravity = 50;
var s_rotation = 50;
var s_width = 50;
var s_height = 50;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    scaleCanvas();

    while (particles.length < maxParticles) {
        particles.push(new Piece(Math.random() * canvas.width, Math.random() * canvas.height));
    }

    setInterval( function(){ drawConfetti(); }, 1000/60);
}

function randomColor () {
    var colors = ['#f00', '#0f0', '#00f', '#0ff', '#f0f', '#ff0'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function confettiPiece(x, y, width, height, r, c) {
    ctx.beginPath();
    ctx.moveTo(x + Math.cos(r)*height, y + Math.sin(r)*height);
    ctx.lineTo(x - Math.cos(r)*height, y - Math.sin(r)*height);
    ctx.lineWidth = width;
    ctx.strokeStyle = c;
    ctx.stroke();
}

function scaleCanvas() {
    canvas.width = window.innerWidth * .85;
    canvas.height = window.innerHeight;
}

function drawConfetti () {


    scaleCanvas();

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    while (particles.length < maxParticles) {
        particles.push(new Piece(Math.random() * canvas.width, 0));
    }
    for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        if (p.y > canvas.height + p.height) {
            particles.splice(i, 1);
            continue;
        }

        p.y += p.gravity * s_gravity / 100;// * canvas.width / 500;
        p.x += p.rotationSpeed / 100;
        p.rotation += p.rotationSpeed * s_rotation / 100;

        confettiPiece(p.x, p.y, p.width * s_width / 100, p.height * s_height / 100, p.rotation, p.color);
    }
}

function Piece (x, y) {
    this.x = x;
    this.y = y;
    this.width = Math.random() * 5;
    this.height = Math.random() * this.width * 2;
    this.gravity = (Math.random() + 0.5) * 4;
    this.rotation = 0;
    this.rotationSpeed = (Math.random()*2 - ;
    this.color = randomColor();
}
