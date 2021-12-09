let names = [
  'Apple',
  'Pineappple',
  'Pear',
  'Peach',
  'Strawberry',
  ' Orange',
  'Lemon',
  'Blueberry',
  ' Watermelon',
  ' Plum',
];

// Variable Selectors
const input = document.getElementById('text-input');
const form = document.querySelector('form');
const clear = document.getElementById('clear');

// Class constructor for circle creation
class Circle {
  constructor({ x = 0, y = 0, radius = 30, color = 'black' }) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

// ------- Initialization -------
let CANVAS_WIDTH = window.innerWidth;
let CANVAS_HEIGHT = window.innerHeight;

window.addEventListener('resize', () => {
  CANVAS_WIDTH = window.innerWidth;
  CANVAS_HEIGHT = window.innerHeight;
});

const canvas = document.getElementById('canvas');

const dpr = devicePixelRatio;
canvas.width = CANVAS_WIDTH * devicePixelRatio;
canvas.height = CANVAS_HEIGHT * devicePixelRatio;

canvas.style.setProperty('width', CANVAS_WIDTH + 'px');
canvas.style.setProperty('height', CANVAS_HEIGHT + 'px');

// Variables
const ctx = canvas.getContext('2d');
let circleRadius = localStorage.radius;
let namesSubmitted = localStorage.names;
let nameCount = 0;
const maximumNames = 150;

// Circle
const circle0 = new Circle({
  x: canvas.width / 2 + 150,
  y: canvas.height / 2 + 8,
  radius: circleRadius,
  color: 'black',
});

let oldTime = 0;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  names.forEach((name) => {
    if (input.value === name) {
      circle0.radius = parseInt(circle0.radius) + 5;
      circleRadius = localStorage.radius = parseInt(circle0.radius) + 5;
      console.log(circleRadius);
      circle0.radius = circleRadius;
      //   nameCount = namesSubmitted;
      //   nameCount += 1;
      //   namesSubmitted = localStorage.names = parseInt(nameCount) + 1;
      //   console.log(`${nameCount} Names Submitted`);
    } else if (maximumNames === namesSubmitted) {
      console.log('Maximum Names Submitted');
    }
  });
});

requestAnimationFrame(drawFrame);

// ------- Render Loop -------
function drawFrame(ts) {
  ts /= 1000;
  const dt = ts - oldTime;
  oldTime = ts;

  // clear our canvas contents
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  circle0.render(ctx);

  requestAnimationFrame(drawFrame);
}

if (typeof Storage !== 'undefined') {
  console.log('Storage Available');
} else {
  console.log('Storage Unavailable');
}

clear.addEventListener('click', () => {
  window.localStorage.clear();
  alert('Please refresh page to complete reset');
});
