game_canvas = document.getElementById("game_canvas");
ctx = game_canvas.getContext("2d");

game_canvas.width = window.innerWidth;
game_canvas.height = window.innerHeight;

class Ball {
    constructor() {
        this.ctx = ctx;
        this.radius = 50;
    }

    drawCircle(X, Y) {
        this.ctx.beginPath();
        this.ctx.arc(X, Y, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
    }
}

let follower = new Ball(0, 0, game_canvas);

function getMousePos(canvas, event) {
    return {
        x: event.clientX,
        y: event.clientY 
    };
}

function moveCircle() {
    let mousePos = getMousePos(game_canvas, event);

    follower.ctx.clearRect(0, 0, game_canvas.width, game_canvas.height);

    if (mousePos.x > .5 * game_canvas.width) {
        follower.radius += 2;
    } else {
        follower.radius += -2;
    }
    
    follower.drawCircle(mousePos.x, mousePos.y);    
}

game_canvas.addEventListener("mousemove", moveCircle);
