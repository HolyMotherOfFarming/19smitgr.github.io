// This file deals with all window/document resizing

function full() {
    $(document).toggleFullScreen();
    console.log("Toggled full screen");
}

window.addEventListener("resize", function(){
    game_canvas.width = window.innerWidth;
    game_canvas.height = window.innerHeight;
}, true);