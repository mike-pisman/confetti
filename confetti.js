/**
 * Pong
 * @author Mikhail Pisman
 * @github https://github.com/mike-pisman/confetti
 * @page 
 *
 * @version
 */

var s_gravity = 50;
var s_rotation = 50;
var s_width = 50;
var s_height = 50;
var s_random = 50;

var maxParticles = 100;
var particles = [];

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    while (particles.length < maxParticles) {
        particles.push(new Piece(Math.random() * 100, Math.random() * 100));
    }

    canvas.width = 100;
    canvas.height = 100;

    setInterval( function(){ drawConfetti(); }, 1000/60);
}

function randomColor () {
    var colors = ['#f00', '#0f0', '#00f', '#0ff', '#f0f', '#ff0'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function clear() {
    particles.splice(0, particles.length);
}

function confettiPiece(x, y, width, height, r, c) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = c;
    ctx.moveTo(x + Math.cos(r)*height, y + Math.sin(r)*height);
    ctx.lineTo(x - Math.cos(r)*height, y - Math.sin(r)*height);
    ctx.stroke();
}

function scaleCanvas() {
    if(canvas.width != window.innerWidth || canvas.height != window.innerHeight) {
        var w = canvas.width;
        var h = canvas.height;

        var scale = Math.min(window.innerWidth, window.innerHeight) / 100;

        canvas.width = 100 * scale;
        canvas.height = 100 * scale; //;

        ctx.scale(canvas.width / 100, canvas.height / 100);
    }
}

function drawConfetti () {


    scaleCanvas();

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    while (particles.length < maxParticles) {
        particles.push(new Piece(Math.random() * 100, -10));
    }

    for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        p.y += p.gravity * s_gravity / 100;
        p.x += p.rotationSpeed / 100;
        p.rotation += p.rotationSpeed * s_rotation / 100;

        if (p.y > 100 + p.height || p.x < 0 || p.x > 100) {
            particles[i] = new Piece(Math.random() * 100, -10);
        }
        confettiPiece(p.x, p.y, p.width * s_width / 100, p.height * s_height / 100, p.rotation, p.color);
    }

}

function random() {
    if(Math.random() < s_random / 100)
        return Math.random();
    else
        return 1;
}

function Piece (x, y) {
    this.x = x;
    this.y = y;
    this.width = random();
    this.height = random();
    this.gravity = (random() + 0.5);
    this.rotation = random() * 360;
    this.rotationSpeed = (Math.random() * 2 - 1) * 0.1;
    this.color = randomColor();
}
