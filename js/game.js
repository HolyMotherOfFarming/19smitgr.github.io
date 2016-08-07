// global vars
game_canvas = document.getElementById("game_canvas");
ctx = game_canvas.getContext("2d");

// initial setup
game_canvas.width = window.innerWidth;
game_canvas.height = window.innerHeight;

function drawCenterLine() {
    ctx.beginPath();
    ctx.moveTo(game_canvas.width * .5, 0);
    ctx.lineTo(game_canvas.width * .5, game_canvas.height);
    ctx.stroke();
}


class Ball {
    constructor() {
        this.ctx = ctx;
        this.radius = 50;
        this.color = "";
    }

    drawCircle(X, Y) {
        this.ctx.beginPath();
        this.ctx.arc(X, Y, this.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.stroke();
    }
}

// MOUSE COORDS DETECTION----------------------------------------------------------------
function getMousePos(canvas, event) {
    return {
        x: event.clientX,
        y: event.clientY 
    };
}
// END COORDS DETECTION-------------------------------------------------------------------

let follower = new Ball();

function changeSize(sizeChanged) {
    if (sizeChanged > 0 && follower.radius < 100) {
        follower.radius += sizeChanged;
        console.log("The new radius is " + follower.radius);
    } else if (sizeChanged < 0 && follower.radius > 6) {
        follower.radius += sizeChanged;
        console.log("The new radius is " + follower.radius);
    } else {
        follower.color = "orange";
    }
}

// START EVENT LOOP-----------------------------------------------------------------------
game_canvas.addEventListener("mousemove", function(event) {
    let mousePos = getMousePos(game_canvas, event);
    // follower.ctx.clearRect(0, 0, game_canvas.width, game_canvas.height);

    if (mousePos.x > .5 * game_canvas.width) {
        follower.color = "blue";
        changeSize(2);
    } else {
        follower.color = "red";
        changeSize(-2);
    }
    
    // drawCenterLine();
    follower.drawCircle(mousePos.x, mousePos.y);
});
// END EVENT LOOP-------------------------------------------------------------------------
