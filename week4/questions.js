// Targeting DOM elements

var startButtonEl = document.querySelector("#start-button");
var timeRemainingEl = document.querySelector("#timeRemaining");
var questionContainerEl = document.querySelector("#questions-container");
var questionEl = document.querySelector("#question");
var answerButtonsEl = document.querySelector("#answer-buttons");
var correctConfirmEl = document.querySelector("#correctConfirm");
// var answerOneEl = document.querySelector("#answerOne");
// var answerTwoEl = document.querySelector("#answerTwo");
// var answerThreeEl = document.querySelector("#answerThree");
// var answerFourEl = document.querySelector("#answerFour");
var controlsEl = document.querySelector(".controls");
var timesUpEl = document.querySelector("#timesUp");
var outOf100El = document.querySelector("#outOf");
var noOfCorrectQuestionsEl = document.querySelector("#correctQuestions");

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
var lastQuestion = questions.length -1;
var timeLeft = 0;
var timer;
var shuffledQuestions, currentQuestionIndex;

// Function to begin the countdown of the time when the start button is clicked

function startQuiz() {
    timeLeft = questions.length * 10;
    timeRemainingEl.innerHTML = timeLeft;
    controlsEl.classList.add("hide");
    questionContainerEl.classList.remove("hide");
    

    timer = setInterval(function() {
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
    var selectedAnswer = selectedButton.innerText;
    var correct = selectedButton.dataset.correct;
    console.log(correct);
    // console.log(selectedAnswer);
    if (correct) {
        correctConfirmEl.innerText = correctMessage;
        
    } else {
        correctConfirmEl.innerText = incorrectMessage;
    }
    // checkAnswer();
    currentQuestionIndex++;
    completedQuestions();
    setNextQuestion();

}

function checkAnswer () {
    if (selectedAnswer === currentQuestionIndex[i].answer) {
        count++
        console.log(checkAnswer);
    }
}

console.log(currentQuestionIndex);

function completedQuestions() {
    if (currentQuestionIndex === questions.length){
        clearInterval(timer);
        endGame();
    }
}



// function getQuestion () {
//     var q = questions[currentQuestion];

//     questionEl.innerHTML = "<h2>" + q.question + "</h2>"
//     answerOneEl.innerHTML = q.choices[0];
//     answerTwoEl.innerHTML = q.choices[1];
//     answerThreeEl.innerHTML = q.choices[2];
//     answerFourEl.innerHTML = q.choices[3];
// }

// Function to stop the time and end the game

function endGame() {
    clearInterval(timer);

timesUpEl.classList.remove('hide')
questionContainerEl.classList.add('hide');
outOf100El.innerHTML = score
noOfCorrectQuestionsEl.innerHTML = parseInt(score / 20);

// `
// <h2>Game over!</h2>
// <h3>You got a ` + score +  ` /100!</h3>
// <h3>That means you got ` + score / 20 +  ` questions correct!</h3>
// <input type="text" id="name" placeholder="First name"> 
// <button onclick="setScore()">Set score!</button>`;

questionContainerEl.innerHTML = gameOver;

}

var score