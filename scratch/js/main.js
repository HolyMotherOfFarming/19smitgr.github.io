// Note: blocks in the grids are called pixels in functions like getPixelClass

// FIXED VARIABLES:
var SIZE = 7; //The size of the array of boxes
var JUMP_HEIGHT = 2;
var AUTOJUMP = false;

var x = 0; //The x position that player should be
var y = 0; //The y position that player should be

var direction=0; //1 is up, 0 is no vertical movement or downwards.
var increments=0; //The number of movements to go until it stops; essentially gravity

var level = 0;

// SIZE (declared variable) number of boxes; 75px each
document.getElementById("grid").style.width = 75*SIZE+"px";
document.getElementById("grid").style.height= 75*SIZE+"px";

function empty_space(x,y){return "<div class='nothing' id='p"+x+"_"+y+"'></div>"; } //The div with nothing in it
function player_space(x,y){return "<div class='player' id='p"+x+"_"+y+"'></div>"; } //The div with the player in it
function obstacle_space(x,y){return "<div class='obstacle' id='p"+x+"_"+y+"'></div>"; } //The divs with the platforms

function init_display() // generates grid by going through each row, then moving on to the next row
{
	var row = SIZE-1; 
	var column = 0;
	var insert_to_grid = "";
	while(row!=-1)
	{
		column = 0;
		while(column != SIZE)
		{
			insert_to_grid += (row == y && column == x) ? player_space(column,row) : empty_space(column,row);
			column++;
		}
		insert_to_grid += "<br>";
		row--;
	}
	return insert_to_grid;
}

function display() //Redisplays the screen, by turning the previous player position to the 'nothing' class, and the current player position to the 'player' class
{
	try {
		document.getElementsByClassName("player")[0].className="nothing"; //White square, no player
		document.getElementById("p"+x+"_"+y).className="player"; //Red square, the player
	} catch(e) {
		console.log("YOU WON! Thanks for playing!");
	}
}

function set_obstacle(x,y)
{
	document.getElementById("p"+x+"_"+y).className = "obstacle";
}

function makeOnMap() //Makes the position ON the map
{
	if(x == -1) x++; //Off the left side of the screen, move right one
	if(x == SIZE) x--; //Off the right side of the screen, move left one
	if(y == -1) y++; //Below the screen, shouldn't happen, but moves player up one square
	if(y == SIZE) y--; //Above the screen, causes player to move down for now
}

function getPixelClass(x,y)
{
	try{ return document.getElementById("p"+x+"_"+y).className; }
	catch(e) {return "player";}
}

function leftArrow() //The code for the left arrow or the 'a' key being pressed
{
	x--; //Move position to the left
	if(getPixelClass(x,y) == "obstacle")
	{
		x++;
	}
	makeOnMap(); //Adjust to fit on the screen
	emptyBlock(); //Cause vertical movement
	display(); //Display
}

function rightArrow() //Right arrow or the 'd' key
{
	x++; //Move position to right
	if(getPixelClass(x,y) == "obstacle")
	{
		x--;
	}
	makeOnMap(); //Adjust to fit on screen
	emptyBlock(); //Cause vertical movement
	display(); //Display
}

function isStanding()
{
	if(y == 0) return true; //If the player is at the bottom of the screen
	if(getPixelClass(x,y-1)=="obstacle") return true;
	return false;
}

function upArrow() //Up arrow or the 'w' key
{
	if(isStanding())
	{
		direction = 1; //Say it's going to be moving up
		increments = JUMP_HEIGHT; //Reset the increases left counter
		
	}
	emptyBlock(); //Cause vertical movement
}

function emptyBlock() //Force to move down, or some other key is pressed
{
	if(direction == 1 && increments != 0) //If it is still jumping
	{
		increments--; //Decrease (increases of y) by
		y++;

		if(getPixelClass(x,y-(y==SIZE))=="obstacle") { 
			y--; increments = 0; 
			direction = 0;
		}
		makeOnMap(); //Adjust player position
	}
	else if(isStanding()) //If it is not jumping and on a platform
	{
		//Do nothing
	}
	else //Otherwise, not on a platform and should fall down
	{
		y--;
		makeOnMap(); //Adjust player position
	}
	display();
}

function keydown(event) //The event handler for keydown events
{

	if (level != 4) { // Do something with the key you pressed if level isn't pressed
		var key = event.key.toLowerCase();
		if(key=="arrowup"||key=="w") { //Up arrow key OR the 'w' key
			upArrow();
		} else if(key=="arrowleft"||key=="a") { //Left arrow key OR the 'a' key
			leftArrow();
		} else if(key=="arrowright"||key=="d") { //Right arrow key OR the 'd' key
			rightArrow();
		} else {
			emptyBlock();
		}
	}
	// next level:
	if (isTop()) {
		reload_game();
		display();
	}
}

function isTop()
{
    return isStanding() && y == SIZE - 1;
}

function reload_game()
{
    document.getElementById("grid").innerHTML = init_display();

    function randbetween(x,y)
    {
        return Math.floor(Math.random()*(y+1-x)+x);
    }

    function random_obstacle() {
        for (i = 0; i < arguments.length; i++) {
            if(i != 0){
                var possible = [random_x-2,random_x-1+2*(random_x==0),random_x+1-2*(random_x==SIZE-1),random_x+2];
                if(possible[0]<0 && random_x == 0)
                {
                    possible[0] = 1;
                }
                else if(possible[0]<0 && random_x == 1)
                {
                    possible[0] = 0;
                }
                else if(possible[3]>=SIZE && random_x == SIZE-1)
                {
                    possible[3] = SIZE-2;
                }
                else if(possible[3]>=SIZE && random_x == SIZE-2)
                {
                    possible[3] = SIZE-1;
                }
                random_x = possible[randbetween(0,3)]
            }
            if(i == 0) random_x = randbetween(0,SIZE-1);
            set_obstacle(random_x, arguments[i])
        }

    }

    random_obstacle(1,3,5);
    level++;
    x = 0;
    y = 0;
    increments = 0;
    direction = 0;

    nextLevel(level);
}

function nextLevel() {
    if (level == 1)
    {
        document.getElementsByTagName("body")[0].style.backgroundImage="url(http://www.wallpaperdirect.com/wdimages/043159orig.jpg)";
    }
    if (level == 2)
    {
        document.getElementsByTagName("body")[0].style.backgroundImage="url(http://practicalhorsemanmag.com/content/content/11915/IMG_5681-718605.JPG)";
    }
    if (level == 3)
    {
        document.getElementsByTagName("body")[0].style.backgroundImage="url(http://abcnews.go.com/images/International/EPA_volcano_ml_160307.jpg)";
    }
    if (level == 4)
    {
    	document.body.innerHTML = "<h1 class=\"center\">You Win!!</h1>"; // clear page
    	document.getElementsByTagName("body")[0].style.backgroundImage="url(http://www.rabbisacks.org/wp-content/uploads/2012/04/heaven.jpg)";
        window.clearInterval(theInterval);
    }
}

var theInterval = window.setInterval(function(){
	if(AUTOJUMP) {
		emptyBlock();
	}
},500);

if (level === 0) {
	reload_game(); // start the game
}