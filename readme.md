## Purpose of game: 

<h4>Use canvas to make ball follow mouse<h4>


## Notes:

1. Imports do not work in Chrome 49
2. Styling canvas with css creates blurry lines but styling within the element does not

Things changed in the Minimum Viable Product JavaScript file:

1. Removed center line (Removes 7 lines)
2. Changed two colors to one (Removes 3 lines)
3. Take out negative radius check (game.js:44-51) (Removes 8 lines)
4. Define function outside of event listener and call it within event listener (easier to understand)