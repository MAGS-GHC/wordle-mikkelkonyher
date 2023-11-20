let correct = "mango";
let testWord = "";
let round = 0;

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
    if (testWord === correct) {
        //game end
        round = 0;
    }
    if (testWord.length === 5) { //later test valid dictionary word
        checkWord ();
        round++;
    }
    else {
        alert("Not valid?")
    }
}

//Lige nu viser den både grøn og gul for a