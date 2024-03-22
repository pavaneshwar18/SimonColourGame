var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

$(document).keypress(function(event){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

function nextSequence(){

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    console.log(gamePattern + " gamePattern");

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100)
    audioPlay(randomChosenColour);

}

$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    console.log(userClickedPattern + " userCLickedPatter");

    audioPlay(userChosenColour);

    AnimatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
})

function audioPlay(colourName){
    var userAudio = new Audio("sounds/"+colourName+".mp3");
    userAudio.play();
}

function AnimatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("sucess")

        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000)
        }
    }
    else{
        console.log("fail")
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        
        $("#level-title").text("Game Over, Press Any Key to Restart")

        startOver();
    }
}

function startOver(){
    level = 0;
    start = false;
    gamePattern = [];
}