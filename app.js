let correct = "";
let guessWord = "";
let round = 0;
let wordList = [];

//Cheering lyd

function playWinner() {
    let sound = document.getElementById("winner");
    sound.play();
}

//Lyd når man gætter
function parrotSound() {
    let sound = document.getElementById("parrot");
    sound.play();
}



//Enter key work kode til enterkey = 13

    const inputElements = document.querySelectorAll("input");
    inputElements.forEach((input) => {
        input.addEventListener("keyup", (enter) => {
            if (enter.key === "Enter" || enter.key === 13) {
                checkValidWord();
            }
        });
    });



// Henter txt fil med wordle words

getText("/Assets/valid-wordle-words.txt");

async function getText(file) {
  let myObject = await fetch(file);
  let myText = await myObject.text();
  wordList = myText.split('\n');
  correct = wordList[Math.floor(Math.random() * wordList.length)];

}

// sammenligner input word fra brugeren (guessWord) med correct word og giver det en farve, deaktiverer det hentet input element.

function checkWord() {
    for (let i = 0; i < 5; i++) {
        let inputElement = document.getElementById("r" + round + "c" + i);
        inputElement.disabled = true;
        if (correct[i] === guessWord[i]) {
            inputElement.style.backgroundColor = "green";
        } else if (guessWord[i] === correct[0] || guessWord[i] === correct[1] || guessWord[i] === correct[2] || guessWord[i] === correct[3] || guessWord[i] === correct[4]) {
            inputElement.style.backgroundColor = "yellow";
        } else {
            inputElement.style.backgroundColor = "grey";
        }
   

    }
}

// Tjekker at ordet er valid, altså 5 bogstaver aA-zZ, kører funktion checkword og round++ hvis valid, ellers alert "Not Valid"
// Hvis korrekt ord funktion playWinner(Lyd Cheering) samt winner box der kommer 500ms efter.

function checkValidWord () {
    guessWord = "";
    console.log(guessWord)
    for (let i=0; i<5; i++) {
        guessWord += document.getElementById("r" + round + "c" + i).value;
    }
    if (guessWord.length === 5 && /^[a-zA-Z]*$/.test(guessWord)) { 
        checkWord ();
        parrotSound();
        round++;
        
    }
    else {
        alert("Not Valid. Only letters a-z")
    }
    if (guessWord === correct) {
     playWinner();
     winnerbox();
    
        //game end


    }
}

//restarter alt
function restart (){
    
    let allInputs = document.querySelectorAll("input");
    allInputs.forEach(clearInput => clearInput.value = "") 
    allInputs.forEach(clearInput => clearInput.style.backgroundColor = "");
    correct = "";
    guessWord = "";
    round = 0;
    correct = wordList[Math.floor(Math.random() * wordList.length)];
}


//confirm box
function winnerbox() {
    setTimeout(function() {
        confirm("CORRECT! Press OK to play again");
        restart();
    }, 500);
}
