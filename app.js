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



//Enter knap

    const inputElements = document.querySelectorAll("input"); // Henter alle inputelementer og gemmer dem i variablen
    inputElements.forEach((input) => { // Gennemløber hver input element
        input.addEventListener("keyup", (enter) => { //tilføjer evenerlistner til hvert input element 
            if (enter.key === "Enter") { //hvis enter registreres udføres funktion
                checkValidWord();
            }
        });
    });



// Henter txt fil med wordle words

getText("/Assets/valid-wordle-words.txt");

async function getText(file) { //Laver asynkron function med vej til filen
  let myObject = await fetch(file); //bruger fetch til at hente filen, venter på at filen bliver hentet før den forsætter til næste linje
  let myText = await myObject.text(); //Henter tekstfilen fra filen. Går igen først til næste linje når det er sket.
  wordList = myText.split('\n'); // tekstfilen splittes ved linjeskift
  correct = wordList[Math.floor(Math.random() * wordList.length)]; //vælger et ord i array'et

}

// sammenligner input word fra brugeren (guessWord) med correct word og giver det en farve, deaktiverer det hentet input element.

function checkWord() {
    for (let i = 0; i < 5; i++) { //5 runder for 5 ord
        let inputElement = document.getElementById("r" + round + "c" + i); // inputfelter behandles i loopet
        inputElement.disabled = true; // Deaktiverer brugte input felter
        if (correct[i] === guessWord[i]) { //sammenligner pladser i array
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
    guessWord = ""; //nustiller guessWord
    console.log(guessWord) //udskriver guessWord
    for (let i=0; i<5; i++) { 
        guessWord += document.getElementById("r" + round + "c" + i).value; ////5 iterationer, hver iteration tilføjer værdien af inputfelt baseret på dets id 
    } if (guessWord.length === 5 && /^[a-zA-Z]*$/.test(guessWord)) { 
        checkWord ();
        parrotSound();
        round++; // Runde +1
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
    
    let allInputs = document.querySelectorAll("input"); //Henter og gemmer alle inputs
    allInputs.forEach(clearInput => clearInput.value = "") // sætter værdi til tom streng
    allInputs.forEach(clearInput => clearInput.style.backgroundColor = ""); //fjerner baggrundsfarven med tom streng
    correct = "";
    guessWord = "";
    round = 0;
    location.reload();
    correct = wordList[Math.floor(Math.random() * wordList.length)];
}


//confirm box
function winnerbox() {
    setTimeout(function() {
        confirm("CORRECT! Press OK to play again");
        restart();
        
    }, 500);
}
