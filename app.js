let correct = "";
let testWord = "";
let round = 0;
let myTest = [];


getText("/Assets/valid-wordle-words.txt");

async function getText(file) {
  let myObject = await fetch(file);
  let myText = await myObject.text();
  myTest = myText.split('\n');
  correct = myTest[Math.floor(Math.random() * 12973)];

}

function checkWord () {
    for (let i = 0; i<5; i++) {
        if (correct[i] === testWord[i]) {
            document.getElementById("r"+ round + "c" + (i)).style.backgroundColor = "green"
        }
        else if (testWord[i] === correct[0] || testWord[i] === correct[1] || testWord[i] === correct[2] || testWord[i] === correct[3] || testWord[i] === correct[4]) {
            document.getElementById("r"+ round + "c" + (i)).style.backgroundColor = "yellow"
        }
        else {
            document.getElementById("r"+ round + "c" + (i)).style.backgroundColor = "grey"
        }
    }
}

function checkValidWord () {
    testWord = "";
    console.log(testWord)
    for (let i=0; i<5; i++) {
        testWord += document.getElementById("r" + round + "c" + i).value;
    }
    if (testWord.length === 5 && /^[a-zA-Z]*$/.test(testWord)) { //later test valid dictionary word
        checkWord ();
        round++;
    }
    else {
        alert("Not valid?")
    }
    if (testWord === correct) {
        //game end
        checkWord ();
        round = 0;
        correct = myTest[Math.floor(Math.random() * 12973)];
        alert("Yahaa")

    }
}

function clearFields () {
    let allInputs = document.querySelectorAll("input");
    allInputs.forEach(clearInput => clearInput.value = "") 
    allInputs.forEach(clearInput => clearInput.style.backgroundColor = "white");
}

//Lige nu viser den både grøn og gul for a