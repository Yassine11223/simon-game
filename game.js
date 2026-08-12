var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];


function nextSequence(){
 var randomNumber = Math.floor(Math.random() * 4);
var randomChosenColour = buttonColours[randomNumber];
 gamePattern.push(randomChosenColour);
 $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
 level++;
}
$(".btn").on("click", function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
   checkAnswer(userClickedPattern.length - 1);
   animatePress(userChosenColour);
});
function playSound(name) {
    var audio=new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
}, 100);
}
var gameStarted = false;

$(document).on("keydown", function () {
    if (!gameStarted) {
        nextSequence();
        gameStarted = true;
        $("h1").text("Level " + level);
        
    }
});
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
          if(userClickedPattern.length === gamePattern.length) {
        setTimeout(function() {
            nextSequence();
        }, 1000);
        userClickedPattern = [];
    }
    }  else {
    console.log("wrong");

    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("h1").text("Game Over, Press Any Key to Restart");

    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);

    startOver();
}
}
    function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
}
    
    

    
