// Create a canvas
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

// Road Background
var bgImage = new Image();
bgImage.src = 'road.png';

// Car image
var carImage = new Image();
carImage.src = 'car.png';
var carX = 300;

// We need to know where the background is scrolled to
// so that we can put the same image in right behind it
var scrolledTo = 0;

// Main game loop (Note: height of background is 600px)
setInterval(function() {
  if (scrolledTo == 600) scrolledTo = 0;
  scrolledTo += 10;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // For permanent scrolling of the road
  ctx.drawImage(bgImage, 0, scrolledTo);
  ctx.drawImage(bgImage, 0, scrolledTo-599);

  ctx.drawImage(carImage, carX, 250, 70, 100)
}, 20);

// Event handling
addEventListener("keydown", function(event) {
  if (carX < 230 || carX > 530) window.location = 'http://bestanimations.com/Military/Explosions/explosion-animated-gif-40.gif';

  if (event.keyCode == 37) carX -= 30; // left arrow key
  if (event.keyCode == 39) carX += 30; // right arrow key
}, false);

// Questions
var questions = ["Should you try to juggle, ride a unicycle, and drive at the same time?", "Should you let your dog drive your car?", "Are you a good driver?"];
var questionNumber = 0;

setInterval(function() {
  var answer = prompt(questions[questionNumber]);
  questionNumber += 1;

  if (answer == "yes") window.location = 'http://bestanimations.com/Military/Explosions/explosion-animated-gif-40.gif';
}, 5000);