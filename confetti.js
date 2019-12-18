/**
 * confetti.js
 * Confetti
 * Mikhail Pisman
 * mike.pisman@gmail.com
 * https://github.com/mike-pisman/confetti
 * https://mike-pisman.github.io/confetti/
 * This program is simple implementation of confetti effeect in Javascript using strokes. The screen is scaled square to fit the window. For demonstration you can controll certain parameters with sliders.
 */

// Parameters controlled by sliders
var s_gravity = 50; // avg. vertical speed of particles (0 - 100%)
var s_rotation = 50; // avg. rotation speed of particles (0 - 100%)
var s_width = 50; // avg. width of particles (0 - 100%)
var s_height = 50; // avg. heigh of particles (0 - 100%)
var s_random = 50; // amount of randomization in parameter (0 - 100%)

// Core parameters
var maxParticles = 100; // Max number of particles on the screen (1 - 1000)
var particles = []; // Array for particles

// Perform only once, when program is loaded
window.onload = function() {
    canvas = document.getElementById('gameCanvas'); // Set up canvas
    ctx = canvas.getContext('2d'); // Get 2D drawing context

    // Create screen 100px X 100px
    canvas.width = 100;
    canvas.height = 100;

    // Fill the screen with particles (optional)
    while (particles.length < maxParticles) {
        particles.push(new Piece(Math.random() * 100, Math.random() * 100));
    }

    // Run program with 60 fps
    setInterval( function(){ drawConfetti(); }, 1000/60);
}

// Main function, drawing confetti
function drawConfetti () {
    scaleCanvas(); // Scale canvas to the window size

    // Draw black background  (Optional)
    ctx.fillStyle = "#000"; // try #fff
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Create confetti if the total number is less than maxParticles
    while (particles.length < maxParticles) {
        // Add new particle at any "x" less than screen width(100) and "y" "s_height" above above screen, so we don't see new particles appearing
        particles.push(new Piece(Math.random() * 100, -s_height));
    }

    // Move particle
    for (var i = 0; i < particles.length; i++) {
        var p = particles[i]; // Particle reference

        // Move and rotate particle, these parameters are optional, play with them
        p.x += p.rotationSpeed / 100; // Move the particle along "x" depending or rotation speed
        p.y += p.gravity * (s_gravity / 100); // Move the particle down, speed magnified by "s_gravity" slider
        p.rotation += p.rotationSpeed * (s_rotation / 100); // Turn the particle, speed magnified by "s_rotation" slider

        // If particle is out of borders of canvas, create new one instead
        if (p.y > 100 + p.height || p.x < 0 || p.x > 100) {
            particles[i] = new Piece(Math.random() * 100, -10);
        }

        // Draw the shape of particle with parameters
        confettiPiece(p.x, p.y, p.width * s_width / 100, p.height * s_height / 100, p.rotation, p.color);
    }
}

/**
 * [Piece description]
 * @param {[int]} x [initial "x" position of the particle]
 * @param {[int]} y [initial "y" position of the particle]
 *
 * all parameters are randomized according to "s_random" slider
 */
function Piece (x, y) {
    this.x = x; // initial "x" position
    this.y = y; // initial "y" position
    this.width = random(); // initial width of the particle
    this.height = random(); // initial height of the particle
    this.gravity = (random() + 0.5); // initial gravity speed of the particle
    this.rotation = random() * 360; // initial turn of the particle
    this.rotationSpeed = (Math.random() * 2 - 1) * 0.1; // Rotation speed of the particle
    this.color = randomColor(); // Choose random color of the particle, not affected by "s_random"
}

// Function draws particle (single confetti piece) with following parameters
/**
 * [confettiPiece description]
 * @param  {[int]} x      [x position of particle]
 * @param  {[int]} y      [y position of particle]
 * @param  {[int]} width  [width of particle]
 * @param  {[int]} height [height of particle]
 * @param  {[int]} r      [initial rotation of particle]
 * @param  {[str]} c      [color of particle]
 */
function confettiPiece(x, y, width, height, r, c) {
    // Draw stroke with
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = c;
    ctx.moveTo(x + Math.cos(r)*height, y + Math.sin(r)*height);
    ctx.lineTo(x - Math.cos(r)*height, y - Math.sin(r)*height);
    ctx.stroke();
}


// Function takes no parameters and returns random color from the list bellow
function randomColor () {
    // Those are six basic colors used for confetti
    var colors = ['#f00', '#0f0', '#00f', '#0ff', '#f0f', '#ff0'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Reset screen (Remove all of the confetti)
function clear() {
    particles.splice(0, particles.length);
}

// Scale canvas to the window size, keeping equal proportions
// Scaling canvas is more optimized rather than scaling individual particles
function scaleCanvas() {
    // If window size was changes
    if(canvas.width != window.innerWidth || canvas.height != window.innerHeight) {
        // Remeber initial values for calculation
        var w = canvas.width;
        var h = canvas.height;

        // Calculate the scale of 100x100 canvas
        var scale = Math.min(window.innerWidth, window.innerHeight) / 100;

        // Change window size according to the scale
        canvas.width = 100 * scale;
        canvas.height = 100 * scale;

        // Apply the scale to the context
        ctx.scale(canvas.width / 100, canvas.height / 100);
    }
}

// Calculate the amount of randomization
function random() {
    if(Math.random() < s_random / 100)
        return Math.random();
    else
        return 1;
}
