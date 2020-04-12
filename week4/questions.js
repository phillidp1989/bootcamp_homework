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

// Setting the questions in an array as objects consisting of key value pairs title, choices and answer

var correctMessage = "You are correct!"
var incorrectMessage = "You got that one wrong!"

var questions = [{

    question: 'The condition in an if / else statement is enclosed within...?',
    answers: [
        { text: 'Quotes', correct: false },
        { text: 'Curly Braces', correct: false },
        { text: 'Parentheses', correct: true },
        { text: 'Square Brackets', correct: false }
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
// var currentQuestion = 0;
var lastQuestion = questions.length - 1;
var timeLeft = 0;
var timer;
var shuffledQuestions, currentQuestionIndex;

// Function to begin the countdown of the time when the start button is clicked

function startQuiz() {
    timeLeft = questions.length * 10;
    timeRemainingEl.innerHTML = timeLeft;
    controlsEl.classList.add("hide");
    questionContainerEl.classList.remove("hide");


    timer = setInterval(function () {
        timeLeft--;
        timeRemainingEl.innerHTML = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame()
        }
    }, 1000);

    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0;
    setNextQuestion();


}

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

function resetState() {
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
}

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
    // checkAnswer();
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



}

function completedQuestions() {
    if (currentQuestionIndex === questions.length) {
        clearInterval(timer);
        endGame();
        // var earlyComplete = timeLeft;
       
    }
}

function endGame() {
    clearInterval(timer);

    timesUpEl.classList.remove('hide')
    questionContainerEl.classList.add('hide');
    var totalScore = (score * 10) + timeLeft;
    window.totalScore = totalScore;
    outOf100El.innerHTML = totalScore;
    noOfCorrectQuestionsEl.innerHTML = score;

}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal

var preventDuplicate = 0;
btn.onclick = function() {

  preventDuplicate++;
  modal.style.display = "block";
  if (preventDuplicate <= 1){
    printHighScore();
  }

   
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  
    // while (leaderboardEl.firstChild) {
    //     leaderboardEl.removeChild(leaderboardEl.firstChild);
    // }

    if (event.target == modal) {
    modal.style.display = "none";
  }
  
}

setScoreEl.addEventListener("click", setHighScore);

function setHighScore() {
    var userObj = {
        initials: initialsEl.value,
        highScore: parseInt(window.totalScore)
    }

    highscores.push(userObj);   
    localStorage.setItem("scores", JSON.stringify(highscores));  
    printHighScore();
    modal.style.display = "block";
    

}


function printHighScore() {

    JSON.parse(localStorage.getItem("scores"))
    highscores = scoresSorted(highscores, 'scores');
    // var sorted = highscores.sort(function(a, b) {return b.score-a.score});

    for (var i = 0; i < highscores.length; i++) {
      console.log(highscores[i].score);
      var home = document.createElement("li"); //creates new p
      var words = document.createTextNode(highscores[i].initials + ": " + highscores[i].highScore)  ; //content of p
      home.appendChild(words);
      leaderboardEl.appendChild(home);
    }
}

// Sort the scores

function scoresSorted(array, key) {
    return array.sort(function(a,b) {
      if (a.highScore < b.highScore) {
        return 1;
      }
      return -1;
    });
  }



playAgain1El.addEventListener("click", function() {
    window.location.reload()
});

playAgain2El.addEventListener("click", function() {
    window.location.reload()
});

clearScoresEl.addEventListener("click", function () {
    localStorage.removeItem("scores");
    alert("Scores cleared");
    window.location.reload();
})




