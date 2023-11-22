let correct = "";
let testWord = "";
let round = 0;
let myTest = [];

function playWinner() {
    let sound = document.getElementById("winner");
    sound.play();
}



//Enter key work kode til enterkey = 13
const inputElements = document.querySelectorAll("input");
inputElements.forEach((input) => {
    input.addEventListener("keyup", (e) => {
        if (e.keyCode === 13) {
            checkValidWord();
        }
    });
});



getText("/Assets/valid-wordle-words.txt");

async function getText(file) {
  let myObject = await fetch(file);
  let myText = await myObject.text();
  myTest = myText.split('\n');
  correct = myTest[Math.floor(Math.random() * myTest.length)];

}

function checkWord() {
    for (let i = 0; i < 5; i++) {
        let inputElement = document.getElementById("r" + round + "c" + i);
        inputElement.disabled = true;
        if (correct[i] === testWord[i]) {
            inputElement.style.backgroundColor = "green";
        } else if (testWord[i] === correct[0] || testWord[i] === correct[1] || testWord[i] === correct[2] || testWord[i] === correct[3] || testWord[i] === correct[4]) {
            inputElement.style.backgroundColor = "yellow";
        } else {
            inputElement.style.backgroundColor = "grey";
        }
   

    }
}


function checkValidWord () {
    testWord = "";
    console.log(testWord)
    for (let i=0; i<5; i++) {
        testWord += document.getElementById("r" + round + "c" + i).value;
    }
    if (testWord.length === 5 && /^[a-zA-Z]*$/.test(testWord)) { 
        checkWord ();
        round++;
        
    }
    else {
        alert("Not Valid?")
    }
    if (testWord === correct) {
     playWinner();
     winnerbox();
        //game end


    }
}

//restart
function restart (){
    
    let allInputs = document.querySelectorAll("input");
    allInputs.forEach(clearInput => clearInput.value = "") 
    allInputs.forEach(clearInput => clearInput.style.backgroundColor = "");
    correct = "";
    testWord = "";
    round = 0;
    correct = myTest[Math.floor(Math.random() * myTest.length)];
}


//confirm box
function winnerbox() {
    setTimeout(function() {
        confirm("You have won! Press OK to play again");
    }, 500);
}
