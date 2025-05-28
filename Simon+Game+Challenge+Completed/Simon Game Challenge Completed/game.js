// Array holding all possible button colors
var buttonColours = ["red", "blue", "green", "yellow"];

// Array to store the game's randomly generated pattern
var gamePattern = [];

// Array to store the user's clicked pattern for each level
var userClickedPattern = [];

// Game state variables
var started = false; // Indicates if the game has started
var level = 0;       // Tracks the current level

// Start the game on the first keypress
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level); // Update title to show level
    nextSequence(); // Start first level
    started = true; // Set game state to started
  }
});

// Event listener for when a colored button is clicked
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id"); // Get ID of clicked button
  userClickedPattern.push(userChosenColour); // Add to user's pattern

  playSound(userChosenColour);     // Play sound for the clicked color
  animatePress(userChosenColour);  // Animate the button press

  // Check the user's answer after each click
  checkAnswer(userClickedPattern.length - 1);
});

// Function to generate the next color in the sequence
function nextSequence() {
  userClickedPattern = []; // Reset user input for new level

  level++; // Increment level
  $("#level-title").text("Level " + level); // Update title

  // Pick a random color
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour); // Add to game pattern

  // Flash and play sound for the chosen color
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// Function to check the user's answer
function checkAnswer(currentLevel) {
  // If user's latest input matches the game pattern
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    // If user completed the full sequence for the level
    if (userClickedPattern.length === gamePattern.length) {
      // Wait 1 second and then show next sequence
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");

    playSound("wrong"); // Play wrong sound

    // Flash screen red for game-over effect
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // Change title to indicate game over
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Reset game state
    startOver();
  }
}

// Function to play a sound file based on color name
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3"); // Load sound file
  audio.play(); // Play sound
}

// Function to animate a button press visually
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed"); // Add visual press class
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed"); // Remove it after 100ms
  }, 100);
}

// Function to reset the game state after game over
function startOver() {
  level = 0;         // Reset level
  gamePattern = [];  // Clear the game pattern
  started = false;   // Set game to not started so user can restart
}
