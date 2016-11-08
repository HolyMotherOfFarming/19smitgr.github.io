// Create a canvas
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

// Road Background
var bgImage = new Image();
bgImage.src = 'road.png';

// We need to know where the background is scrolled to
// so that we can put the same image in right behind it
var scrolledTo = 0;

// Car image
var carImage = new Image();
carImage.src = 'car.png';
var carX = 300;

moveRight = false;
moveLeft = false;

addEventListener("keydown", function(event) {
  if (event.keyCode == 37) moveLeft = true; // left arrow key
  if (event.keyCode == 39) moveRight = true; // right arrow key
}, false);

addEventListener("keyup", function(event) {
  moveRight = false;
  moveLeft = false;
});

setInterval(function() {
  if (moveRight) carX += 10;
  if (moveLeft) carX -= 10;

  if (scrolledTo == 600) scrolledTo = 0;
  scrolledTo += 10;
  ctx.clearRect(0, 0,canvas.width, canvas.height);
  ctx.drawImage(bgImage, 0, scrolledTo);
  ctx.drawImage(bgImage, 0, scrolledTo-599);

  ctx.drawImage(carImage, carX, 250, 70, 100)
}, 50);