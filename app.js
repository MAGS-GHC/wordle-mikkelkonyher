let correct = "";
let testWord = "";
let round = 0;
let myTest = [];


getText("/Assets/valid-wordle-words.txt");

async function getText(file) {
  let myObject = await fetch(file);
  let myText = await myObject.text();
  myTest = myText.split('\r\n');
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
function restart(){
    
    let allInputs = document.querySelectorAll("input");
    allInputs.forEach(clearInput => clearInput.value = "") 
    allInputs.forEach(clearInput => clearInput.style.backgroundColor = "");
    correct = "";
    testWord = "";
    round = 0;
    correct = myTest[Math.floor(Math.random() * 12973)];
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
<<<<<<< HEAD
       if(confirm("Completed! Press OK to play again?")){
            restart();
        }
=======
        round = 0;
        correct = myTest[Math.floor(Math.random() * 12973)];
        confirm("Yahaa")
>>>>>>> 558d1c779c6dcfc30ddb3e72c71abf7e04bcbcbd

    }
}


