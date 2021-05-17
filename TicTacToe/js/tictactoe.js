//this variable keeps track of who's turn it is.
let activePlayer = 'x';
//this array stores an array of moves. we use this to 
//determine win conditions
let selectedSquares = [];



//this function is for placing an X or O in a square

function placeXOrO(squareNumber)
{
    ///this condition ensures a square hasn't been selected 
    //already. The .some() mehtod is used to check each element
    // of selectedSquare array to see if it contains the square
    // number clicked on
            if (!selectedSquares.some(element => element.includes(squareNumber)))
            {
                //this variable retrieves the html element id that was clicked
                let select = document.getElementById(squareNumber);
                //this condition checks who's turn it is.
                if(activePlayer == 'x')
                {
                    //if activeplayer is equal to 'x' the x.png is placed 
                    //in html
                    select.style.backgroundImage= 'url("images/mark-x.png")';
                }
                else {
                    //change the activePlayer to 'O', the o.png is placed in HTML.
                    select.style.backgroundImage = 'url("images/play.png")';
                }
                //squareNumber and activePlayer are concatenated togethter and added to array
                selectedSquares.push(squareNumber + activePlayer);
                //this calls a function to check for any win conditions
                checkWinConditions();
                //This condition is for changing to active player.
                if(activePlayer === 'x') {
                    //if active player is 'x' change to to 'o'
                    activePlayer = 'o';
                //if active player is anything other than 'x'.
                }  else {
                    //change the activePlayer to 'x'
                    activePlayer = 'x';
                }
                //this function pays placement sound.
                audio('media/myplace.wav');
                //this condition checks to see if it is computers turn
                if(activePlayer === 'o'){
                    //this function disables clicking for computer choice
                    disableClick();
                    //this function waits 1 second before placing the image
                    //and enabling click
                    setTimeout(function (){ computersTurn();} , 1000);
                }
                //returning true is needed for our computersTurn() function to work.
                return true;
            }

            //this function reults in a random square being selected
            function computersTurn()
            {
            //this boolean is needed for our while loop
            let success = false;
            //this variable stores a random number 0-8
            let pickASquare;
            //this condition allows our while loop to keep
            //trying if a square is selected already
            while(!success)
            {
                pickASquare = String(Math.floor(Math.random() * 9 ));
            
            //if the random number evaluates returns true, the square hasn't been selected yet
            if (placeXOrO(pickASquare)){
                //this line calls the function
                placeXOrO(pickASquare);
                //this changes our boolean and ends the loop
                success=true;
            };
        }
     }

}

//this function parses the selected array to search for win
//conditions. draWinline function is called to draw line if condition
//is met

function checkWinConditions()
{
    // X 0 , 1 , 2 condition.
    if      (arrayIncludes('0x' , '1x' , '2x')) {draWinline(50, 100, 558 , 100);}
    // X 3 , 4 , 5 condition
    else if (arrayIncludes('3x' , '4x' , '5x')) {draWinline(50 , 304 , 558 , 304);}
    //x 6 , 7 , 8 condition
    else if (arrayIncludes('6x' , '7x' , '8x')) {draWinline(50 , 508 , 558 , 508);}
    // x 0 , 3 , 6 condition
    else if (arrayIncludes('0x' , '3x' , '6x')) {draWinline(100 , 50 , 100 , 558);}
    // x 1 , 4 , 7 condition
    else if (arrayIncludes('1x' , '4x' , '7x')) {draWinline(304 , 50 , 304 , 558);}
    // x 2 , 5 , 8 condition
    else if (arrayIncludes('2x' , '5x' , '8x')) {draWinline(508 , 50 , 508 , 558);}
    //X 6, 4 , 2 condition
    else if (arrayIncludes('6x' , '4x' , '2x')) {draWinline(100 , 508 , 510 , 90);}
    // x 0, 4 , 7 condition
    else if (arrayIncludes('0x' , '4x' , '8x')) {draWinline(100 , 100 , 520 , 520);}
    // o 0 , 1 , 2 condition.
    if      (arrayIncludes('0o' , '1o' , '2o')) {draWinline(50, 100, 558 , 100);}
    // o 3 , 4 , 5 condition
    else if (arrayIncludes('3o' , '4o' , '5o')) {draWinline(50 , 304 , 558 , 304);}
    //o 6 , 7 , 8 condition
    else if (arrayIncludes('6o' , '7o' , '8o')) {draWinline(50 , 508 , 558 , 508);}
    //o 0 , 3 , 6 condition
    else if (arrayIncludes('0o' , '3o' , '6o')) {draWinline(100 , 50 , 100 , 558);}
    //o 1 , 4 , 7 condition
    else if (arrayIncludes('1o' , '4o' , '7o')) {draWinline(304 , 50 , 304 , 558);}
    // o 2 , 5 , 8 condition
    else if (arrayIncludes('2o' , '5o' , '8o')) {draWinline(508 , 50 , 508 , 558);}
    //o 6, 4 , 2 condition
    else if (arrayIncludes('6o' , '4o' , '2o')) {draWinline(100 , 508 , 510 , 90);}
    //o 0, 4 , 7 condition
    else if (arrayIncludes('0o' , '4o' , '8o')) {draWinline(100 , 100 , 520 , 520);}

    //this condition checks for tie. if non of the above conditions register
    //and 9 squares are selected, the code executes.
    else if (selectedSquares.length >= 9) {
        //this function plays the time game sound.
        audio('media/mytie.wav');
        //this function sets a .3 second timer before the resetgame is called
        setTimeout (function () { resetGame(); } , 1000);
    }
    //this function checks if an array includes 3 strings.
    //it is used to check for each win conditiom
    function arrayIncludes(squareA , squareB , squareC)
    {
        //the next 3 variables will be used to check for 3 in a row
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);
        //if the 3 variables we pass are all included in our array true 
        // is returned and our else if condition executes the drawWinlinefunction
        if (a === true && b === true && c === true) {return true;}
    }
    
}

//this function makes our body element temporarily unclickable
function disableClick()
{
    //this makes our body unclickable
    body.style.pointerEvents = 'none';
    //this makes our body clickable again after 1 second
    setTimeout(function() {body.style.pointerEvents = 'auto';}, 1000);
}


//this function takes a string parameter of the path you set earlier
//for placement sound ('./media/place.mp3')
function audio(audioURL) {
    //we create a new audio object and we pass the path as a parameter
    let audio = new Audio(audioURL);
    //play mehtod plays our audio sound.
    audio.play();
}

//this function utilizes html canvas to draw win lines.
function draWinline(coordX1 , coordY1 , coordX2 , coordY2) {
    //this line accesses our html canvas element.
    const canvas = document.getElementById('win-lines');
    //this line gives us access to mehtods and properties to use on canvas
    const c = canvas.getContext('2d');
    //this line indicates where the start of a lines x axis is
    let x1 = coordX1,
        //this line indicates where the start of a lines y axis is
        y1 = coordY1,
        //this line indicates where the end of a lines x axis is
        x2 = coordX2,
        //this line indicates where the end of a lines x axis is
        y2 = coordY2,
        //this variable stores temporary x axis data we update in our animation loop
        x = x1,
        //this variable stores temporary y axis data we update in our animation loop
        y = y1;
    //this function interacts with the canvas 
    function animateLineDrawing() {
        //this variable creates the loop for when to game ends it restarts.
        const animationLoop = requestAnimationFrame(animateLineDrawing);
        //this method clears content from last loop iteration
        c.clearRect(0,0,608,608);
        //this method starts a new path
        c.beginPath();
        //this method moves us to a starting point for our line
        c.moveTo(x1,y1);
        // this method indicates the end point in our line
        c.lineTo(x, y);
        //this method set the width of our line
        c.lineWidth = 10;
        //this method sets the color of our line.
        c.strokestyle = 'rgba(70, 255 , 33 , .8)';
        //this condition  draws everything we laid out above
        c.stroke();
        // this condition checks if we've reached the endpoint

        if(x1 <= x2 && y1 <= y2) {
            //this condition adds 10 to the previous end x point
            if (x < x2) {x += 10;}
            //this condition adds 10 to the previous end y point
            if (y < y2) {y +=10;}
            // this condition cancels our animation loop if reach the end point
            if (x >= x2 && y >= y2) {cancelAnimationFrame(animationLoop);}
        }
        //this condition is similar to the one above.
        //it was necessary for the 6 , 4 , 2 win condition.
        if (x1 <= x2 && y1 >= y2) {
            if (x < x2) { x += 10;}
            if (y > y2) {y -= 10;}
            if (x >= x2 && y <= y2){ cancelAnimationFrame(animationLoop);}
        }
    }

    //this function clears our cnvas after our win line is drawn
    function clear()  {
        //this line starts our animation loop
        const animationLoop = requestAnimationFrame(clear);
        //this line clears our canvas
        c.clearRect(0,0,608,608);
        //this line stops our animation loop
        cancelAnimationFrame(animationLoop);
    }
    //this line disallows clicking while the win sound is playing
    disableClick();
    //this line plays the win sound
    audio('media/mywin.wav');
    //this line calls our main animation loop.
    animateLineDrawing();
    //this line waits 1 second
    //then, clears canvas, resets game , and allows clicking again
    setTimeout(function () {clear(); resetGame(); } , 1000);
}

//this function resets the game in a tie or a win
function resetGame() {
    //this for loop iterates through each HTML square
   for(let i = 0; i<9; i++){
   //this variable gets the html element of i
   let square = document.getElementById(String(i))
   //this removes our elements backgroundimage
   square.style.backgroundImage = '';
   }
   //this resets our array so it is empty and we can start over
   selectedSquares = [];
}
