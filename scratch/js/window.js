// This file is for the initial setup of the window; not the game

var gloss = document.getElementById("gloss")

function setSize() // make glossy front page responsive
{
    gloss.style.width = window.innerWidth;
    gloss.style.height = window.innerHeight;
    gloss.style.top = gloss.style.height * .25 + "px"
}

gloss.addEventListener("resize", setSize());
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

$("#play").click(function(){ // slides glossy front page up
    document.getElementById("gloss").removeEventListener("resize", setSize())
    $("#gloss").slideToggle("slow");
})
