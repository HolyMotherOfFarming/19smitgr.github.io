var text = document.getElementById("bigText");
var jumbotron = document.getElementById("mainDiv");
var lowerLeft = document.getElementById("lowerLeft");

var rgbLoop = 0;
var rgbText = "";
var hex = "";

var r = 0 ;
var g = 0;
var b = 0;

var hexComp = "#FFFFFF";

var rComp = 255;
var gComp = 255;
var bComp = 255;

var colorComplement = "";

// Converts number to a string in base 16
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

// String.fromCharCode(e.keyCode) is unreliable, so I used an array of keyCodes in keyboardMap.js
addEventListener("keydown", function(e) {
    text.innerHTML = "The keyCode of " + window.keyboardMap[e.keyCode] + " is " + e.keyCode;
}, false);

// gets user keyboard input until 3 keys have been pressed for r, g, and b; then it changes the bg-color
addEventListener("keyup", function(e){
    
    switch(rgbLoop) {
        case 0: 
            r = e.keyCode;
            rgbLoop += 1;
            
            rgbText = "rgb("+r+", g, b)";
            hex = "#" + componentToHex(r) + "____";
            
            break;
        case 1: 
            g = e.keyCode;
            rgbLoop += 1;
            
            rgbText = "rgb("+r+", "+g+", b)";
            hex = "#" + componentToHex(r) + componentToHex(g) + "__"; 
            
            break;
        case 2: 
            b = e.keyCode;
            rgbText = "rgb("+r+", "+g+", "+b+")";
            hex = "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
            
            jumbotron.style.backgroundColor = "rgb("+r+","+g+","+b+")";
            console.log("Changed color to " + "%crgb(" + r + ", " + g + ", " + b + ") or " + hex, "background: rgb("+r+","+g+","+b+"); color: rgb("+rComp+","+gComp+","+bComp+");");
            rgbLoop = 0;
            
            rComp = 255 - r;
            gComp = 255 - g;
            bComp = 255 - b;
            
            hexComp = "#" + componentToHex(rComp) + componentToHex(gComp) + componentToHex(bComp);
            
            colorComplement = "rgb("+ rComp + ", " + gComp + ", " + bComp + ")";
            
            // finds complement of curent color (hex)
            console.log("The complement is %c" + colorComplement + " or " + hexComp, "background: rgb("+rComp+","+gComp+","+bComp+"); color: background: rgb("+r+","+g+","+b+")");
            text.style.color = colorComplement;
            
            lowerLeft.style.color = colorComplement;
            lowerLeft.innerHTML = "Hey, look in the console!";
            
            break;
    }
    
    // The text will not immediately disappear if a key is just tapped briefly
    setTimeout(function(){
        text.innerHTML = rgbText + "<br><br>" + hex;
    }, 500);
    
});

