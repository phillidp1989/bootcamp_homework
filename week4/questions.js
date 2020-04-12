// Targeting DOM elements

var startButtonEl = document.querySelector("#start-button");
var timeRemainingEl = document.querySelector("#timeRemaining");
var questionContainerEl = document.querySelector("#questions-container");
var questionEl = document.querySelector("#question");
var answerButtonsEl = document.querySelector("#answer-buttons");
var correctConfirmEl = document.querySelector("#correctConfirm");
var controlsEl = document.querySelector(".controls");
var timesUpEl = document.querySelector("#timesUp");
var outOf100El = document.querySelector("#outOf");
var noOfCorrectQuestionsEl = document.querySelector("#correctQuestions");
var initialsEl = document.querySelector("#name");
var setScoreEl = document.querySelector("#setScore");
var playAgain1El = document.querySelector("#playAgain1");
var playAgain2El = document.querySelector("#playAgain2");
var clearScoresEl = document.querySelector("#clearScores");
var leaderboardEl = document.querySelector("#leaderboard");
var highscores = JSON.parse(localStorage.getItem("scores")) || [];




// Event listener to listen for a click on the Start Quiz button to initialise the startQuiz function

startButtonEl.addEventListener("click", startQuiz)

// Variables for the messages presented to the user once an answer is clicked

var correctMessage = "You are correct!"
var incorrectMessage = "You got that one wrong!"

// Setting the questions in an array as objects consisting of key value pairs title, choices and answer

var questions = [{

    question: 'The condition in an if / else statement is enclosed within...?',
    answers: [
        { text: '" "', correct: false },
        { text: '{ }', correct: false },
        { text: '( )', correct: true },
        { text: '[ ]', correct: false }
    ],
    correctAnswer: 'Parentheses'
},
{
    question: 'The logical operator that represents "or" is...',
    answers: [
        { text: '||', correct: true },
        { text: 'OR', correct: false },
        { text: '&&', correct: false },
        { text: '===', correct: false }
    ],
    correctAnswer: '||'
},
{
    question: 'Which built-in method adds one or more elements to the end of an array and returns the new length of the array?',
    answers: [
        { text: '.last', correct: false },
        { text: '.put', correct: false },
        { text: '.push', correct: true },
        { text: '.pop', correct: false }
    ],
    correctAnswer: '.push'

},
{
    question: 'Which of the following is an "assignment operator" in JavaScript?',
    answers: [
        { text: '=', correct: true },
        { text: '-', correct: false },
        { text: '+', correct: false },
        { text: '#', correct: false }
    ],
    correctAnswer: '='
}
]

// Additional variables

var score = 0;
var lastQuestion = questions.length - 1;
var timeLeft = 0;
var timer;
var shuffledQuestions, currentQuestionIndex;

// Function to begin the countdown of the time when the start button is clicked. This function starts the timer, hides the 'start' quiz controls and replaces them with the question and answers for question 1

function startQuiz() {
    timeLeft = questions.length * 10;
    timeRemainingEl.innerHTML = timeLeft;
    controlsEl.classList.add("hide");
    questionContainerEl.classList.remove("hide");

    // Set interval function to reduce by one each second and for the interval to be cleared when 0 is reached

    timer = setInterval(function () {
        timeLeft--;
        timeRemainingEl.innerHTML = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame()
        }
    }, 1000);

    // Value assigned to previously unassigned global variable to randomise the production of the questions

    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0;
    setNextQuestion();


}

// Function to set the next question which includes resetting the state of the last question and showing the next question

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionEl.innerText = question.question;
    question.answers.forEach(answer => {
        var newButton = document.createElement('button');
        newButton.innerText = answer.text;
        newButton.classList.add("btn");
        if (answer.correct) {
            newButton.dataset.correct = answer.correct

        }
        answerButtonsEl.appendChild(newButton);
        newButton.addEventListener("click", selectAnswer)

    })
}

// This function removes the previous questions and answers once they have been selected as the next question gets appended to the div

function resetState() {
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
}

// This function is to determine whether the answer selected by the user is correct based on the event.target and the data attribute .correct. If the answer is correct, a correctClass is added to the button, which changes the styling and the same is true for incorrect answers.

function selectAnswer(e) {
    var selectedButton = event.target;
    console.log(event.target);
    // var selectedAnswer = selectedButton.innerText;
    var correct = selectedButton.dataset.correct;
    console.log(correct);
    // console.log(selectedAnswer);
    if (correct) {
        correctConfirmEl.innerText = correctMessage;
        selectedButton.classList.add("correctClass");
        score++;

    } else {
        correctConfirmEl.innerText = incorrectMessage;
        selectedButton.classList.add("incorrectClass");
        timeLeft = timeLeft - 5;
    }

    // This function sets a 1 second time between questions to allow the user to see whether their last answer was correct

    var betweenQuestionTimer;
    var timeBetweenQuestions = 1;
    betweenQuestionTimer = setInterval(function () {
        timeBetweenQuestions--;
        if (timeBetweenQuestions <= 0) {
            clearInterval(betweenQuestionTimer);

            currentQuestionIndex++;
            completedQuestions();
            setNextQuestion();
            correctConfirmEl.innerText = "";

        }
    }, 1000);

    // Function to clear interval (stop timer) if all questions have been answered

}

function completedQuestions() {
    if (currentQuestionIndex === questions.length) {
        clearInterval(timer);
        endGame();
        // var earlyComplete = timeLeft;

    }
}

// Function to be called at the end of the game which replaces the last question with the user's score

function endGame() {
    clearInterval(timer);

    timesUpEl.classList.remove('hide')
    questionContainerEl.classList.add('hide');
    var totalScore = (score * 10) + timeLeft;
    window.totalScore = totalScore;
    outOf100El.innerHTML = totalScore;
    noOfCorrectQuestionsEl.innerHTML = score;

}

// Modal functions obtained from W3Schools to hold high scores

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal

// Counter to prevent user scores being appended multiple times if 'Highscore' button is clicked more than once

var preventDuplicate = 0;

// Function to display modal and to prevent multiple appends of the same data if clicked multiple times before page refresh

btn.onclick = function () {

     
    modal.style.display = "block";
    while (leaderboardEl.lastChild) {
        leaderboardEl.removeChild(leaderboardEl.lastChild)
    }
    printHighScore();


}



// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {

    if (event.target == modal) {
        modal.style.display = "none";
    }

}

// Event listener for the Set Score button

setScoreEl.addEventListener("click", setHighScore);

// Function to define user object to be stored to local storage and to push each new object to empty array through a JSON.stringify function to allow this to be stored

function setHighScore() {
    var userObj = {
        initials: initialsEl.value,
        highScore: parseInt(window.totalScore)
    }

    highscores.push(userObj);
    localStorage.setItem("scores", JSON.stringify(highscores));

    // Once clicked, the printHighScore function is called which appends the user name array to the modal which is then unhidden. The while loop removes any children of the leaderboardelement that were created upon the user clicking the Highscore button.

    
    while (leaderboardEl.lastChild) {
        leaderboardEl.removeChild(leaderboardEl.lastChild)
    }
    printHighScore();
    modal.style.display = "block";

}

// Function to loop through the array containing user objects and append the information (name and score) to the leaderboard modal

function printHighScore() {

    JSON.parse(localStorage.getItem("scores"))
    highscores = scoresSorted(highscores, 'scores');
    // var sorted = highscores.sort(function(a, b) {return b.score-a.score});

    for (var i = 0; i < highscores.length; i++) {
        console.log(highscores[i].score);
        var home = document.createElement("li"); //creates new p
        var words = document.createTextNode(highscores[i].initials + ": " + highscores[i].highScore); //content of p
        home.appendChild(words);
        leaderboardEl.appendChild(home);
    }
}

// Sort the scores

function scoresSorted(array, key) {
    return array.sort(function (a, b) {
        if (a.highScore < b.highScore) {
            return 1;
        }
        return -1;
    });
}

// Function to reload page to allow user to play again

playAgain1El.addEventListener("click", function () {
    window.location.reload()
});

// Tried to use querySelectorAll to target the playAgain class, but this did not Worker, so added two event listeners

playAgain2El.addEventListener("click", function () {
    window.location.reload()
});

// Event listener and function to clear local storage and remove users from leaderboard

clearScoresEl.addEventListener("click", function () {
    localStorage.removeItem("scores");
    alert("Scores cleared");
    window.location.reload();
})




