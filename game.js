/* Qui trovi la logica
https://app.diagrams.net/#G1GWV8czeN4FeglJTYKDCkz8FnWwDDfN8G*/


var userClickedPattern = [];
var level = 1;
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;


alert("Welcome! Here is how the game works: \nThe web page will create a random sequence, your job is to remember it and reproduce it from the first to the last element. \nIf you get it right the game will add one more element and the sequence will get more difficult, otherwise is ""Game Over""... /nFell free to play once again!"); 
      

$(document).keypress(function() {
  if (started == false) {
    nextSequence();
    started = true;
  }
})

$(".btn").click(function(event) {
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor)
  playSound(userChosenColor);
  checkPattern();
  if (flag == true) {
    if (gamePattern.length == userClickedPattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game over, reload to restart")
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 1000);
  }
})

// FUNZIONI -------------------------------------------------------------------

// aggiunge uno step alla sequenza del gioco
function nextSequence() {
  // annullo quello che l'utente ha cliccato finora per confrontare i patterns
  userClickedPattern = [];
  // genero un numero casuale fra 0 e 3
  var randomNumber = Math.floor(Math.random() * 4);
  // uso questo numero per selezionare il colore del pulsante
  var randomChosenColor = buttonColours[randomNumber];
  // salvo il colore scelto nell'array gamePattern impostato come variabile globale
  // per tenere traccia del pattern del gioco
  gamePattern.push(randomChosenColor);
  // creo effetto flash sul pulsante selezionato
  $("#" + randomChosenColor).addClass("flash");
  setTimeout(function() {
    $("#" + randomChosenColor).removeClass("flash");
  }, 100);
  // inserisco effetto suono
  playSound(randomChosenColor);
  $("h1").text("Level " + level)
  level++;
}

// Riproduce il suono del pulsante
function playSound(name) {
  // seleziono il suono relativo al pulsante giusto e lo riproduco
  var audio = new Audio("sounds//" + name + ".mp3")
  audio.play();
}

// Una funzione di prova per testare gli event handlers
function prova() {
  console.log("ciao");
}

/*Problema: Valuta userClickedPattern alla fine*/
function checkPattern() {
  for (var i = 0; i<gamePattern.length; i++) {
    if (userClickedPattern[i] != undefined) {
      if (userClickedPattern[i] == gamePattern[i]) {
        flag = true;
        console.log("ok", flag);
      } else {
        flag = false;
        console.log("not ok", flag);
      }
    }
  }
}
