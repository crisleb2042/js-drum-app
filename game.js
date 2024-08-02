// 
// 20240716 CRISLEB2042
//
// Demonstrates proficiency in:
// 1. jQuery for DOM manipulation and event handling
// 2. JavaScript arrays and array manipulation
// 3. Function declarations and anonymous functions
// 4. Asynchronous programming with setTimeout
// 5. Audio manipulation in web applications
// 6. CSS class manipulation for visual effects
// 7. Game logic implementation
// 8. State management (game start, levels, game over)
// 9. Recursive functions for sequence animation
// 10. Event-driven programming
// 11. Modular code organization (MVC-like structure)
// 12. Conditional statements and boolean logic
// 13. Math operations for randomization
// 14. String manipulation and dynamic text updates
// 15. Debugging with console.log

var buttonColors = ["red", "blue", "green", "yellow"];
// Stores the random patterns generated S
var gamePattern = [];
// Stores the innerHTML of the user clicks
var userClickedPattern = [];
var level = 0;
var startGame = false;

// TO-DO Bug fix: If user clicks more than gamePattern[] then game still registers .click()
// Need to turn off $(".btn").click() if userClickedPattern[].length > gamePattern[].length

// ----- CONTROLLERS -------- //

$(document).on("keydown", function() {
    
    if (!startGame) {
        console.log("KeyBoard detected at startup");
        $("#level-title").text("Level " + level);
        nextSequence();
        startGame = true;
        
    } else {
        console.log("------RESTART----------");
        nextSequence();
        console.log("KeyBoard detected to startover");
    }
});

$(".btn").click(function() {

    console.log("Click detected");

    if (startGame) {
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        console.log("User pattern: " + userChosenColor);

        playSound(userChosenColor);
        animatePress(userChosenColor);

        checkAnswer(userClickedPattern.length - 1);
    }
});

function startOver() {

    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    startGame = false;
    console.log("Arrays Reset");
};

// ----- MODEL: GAME LOGIC -------- //

function checkAnswer (currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
            console.log("Check Answer: " + userClickedPattern[currentLevel]);
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }

    } else {
        
        playSound("wrong");
        // Adds game-over overlay to body element
        $("body").addClass('game-over');
        $("#level-title").html("Game Over! <br> You reached level: " + level + " <br>Press space bar to play again.")

        // Controls length of Game Over Color
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 2000);

        
        console.log("------WRONG-------");
        console.log("CPU: " + gamePattern);
        console.log("User: " + userClickedPattern);
        startOver();
        }

    return false;
    
}

function nextSequence () {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    // Random number between 0 - 3
    var randomNumber = Math.floor(Math.random() * 4);
    // index @ randomNumber inserted into buttonColors array
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // PLAY ANIMATION SEQUENCE OF gamePattern using color
    animateSoundSequence(gamePattern, 0);
    
    console.log("CPU current array: " + gamePattern);
    
}

// -------------- VIEW ------------- //

// Activate the sound according to handleClick's chosen color.
function playSound (name) {
    var sounds = new Audio('sounds/' + name + '.mp3');
    sounds.play();
}

// creates button pushed effect
function animatePress (currentColor) {

    $("#"+ currentColor).addClass('pressed');
    // setTimeout function removes class after 100ms
    setTimeout(function(){
        $("#"+ currentColor).removeClass("pressed");
    }, 100);
}

// Animate & sound function to playback gamePattern[] 
function animateSoundSequence (colorsInArray, index) {

    if (index >= colorsInArray.length) {
        return;
    }

    $('#' + colorsInArray[index]).fadeIn(100).fadeOut(100).fadeIn(100)
    .promise().done(function() {
        playSound(colorsInArray[index]);
        //Recursive Function to play all sounds and animate color in the GamePattern Array
        setTimeout(function (){
            animateSoundSequence(colorsInArray, index + 1);
        }, 250);
    })
}

