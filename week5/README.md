# bootcamp_homework week 5

## Day Planner

In this project, I was tasked with creating a day planner in which the user could record events during a specific timeblock during the day which would then be saved to the browser.

<img src="https://user-images.githubusercontent.com/61989740/79689323-edae4280-824b-11ea-8f17-38d0f7d93468.png" width = "200"> 

## Link to deployed application

https://phillidp1989.github.io/bootcamp_homework/week5/ 

## Brief

The app features a jumbotron containing today's date and a dynamically updating clock showing the current time. In the main body of the application are multiple rows each representing an hour during the working day. The user can enter text to describe the event and click the save button to store this text in local storage. Each timeblock is coloured based on whether the hour is in the past, present or future based on the current time. I have also added a feature which updates the background colour when the last time block ends (night mode) and a button to clear all events and remove data from local storage.

As with other tasks, the requirements were set out in a User Story and corresponding Acceptance Criteria:

## User Story


AS A coding bootcamp student<br>
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores<br>
SO THAT I can gauge my progress compared to my peers<br><br>


## Acceptance Criteria

GIVEN I am taking a code quiz
<ol>
<li>WHEN I click the start button<br>
THEN a timer starts and I am presented with a question<br><br>
In order to satisfy this requirement, I used created a function which hides the controls container and unhides the questions and initiates the setInterval timer which gives the user 10 seconds per question in the questions array.</li>
<li>WHEN I answer a question<br>
THEN I am presented with another question<br><br>
This was achieved through two main functions; one to set the question and one to show the question. The set question function randomly selects one of the objects in the questions array using Math.random. The show question function appends the new question to the questions container and removes the existing children to seemlessly switch from one question to the next.</li>
<li>WHEN I answer a question incorrectly<br>
THEN time is subtracted from the clock<br><br>
The key here was identifying which answers were correct and which were not. I used a data item called correct in the array and the event.target.dataset function in an if statement to determine whether the click event was against a correct or incorrect answer. This then allowed me to add the correct class to the selected answer to change the styling of the answer selected, as well as reducing the timeLeft counter which decrements from the start of the quiz if the answer was incorrect.</li>
<li>WHEN all questions are answered or the timer reaches 0<br>
THEN the game is over<br><br>
This was achieved by using the clear interval function once the timeLeft value reached 0. This then prompted the questions container to be hidden and the game over container to appear.</li>
<li>WHEN the game is over
THEN my input should be validated and at least one character type should be selected<br><br>
Following the user responding to all 4 confirm messages, the JS includes an if else statement to validate that the user has selected at least one of the possible criteria</li>
<li>WHEN all prompts are answered
THEN I can save my initials and score<br><br>
The score and user input name are stringified and saved to local storage and then using getItem and JSON.parse, are posted back to the modal on the application.</li>


</ol>




## Challenges

This was a challenging piece of work as it required HTML, CSS and JavaScript to be created from scratch, which was a sizeable task. The main challenges I faced were largely based around deciding the approach to take with regards to cycling through different screens and saving data to local storage and displaying this to the user. I decided to keep all of my content on a single page and use a modal to display high scores. In order to cycle through the different components of the quiz, I decided to use a hide feature and an append and remove child feature to cycle through the questions.

I found the local storage element, quite simple, but posting this to the webpage was very tricky. I had two different events that would trigger the appending of the object array and this was causing duplication of data if the user clicked either of these buttons multiple times. I discovered I could fix this using a while loop which removed all existing children before appending the latest object array.

## What did I learn?

This mini-project was a great way of forcing students to think about an app logically and how they could approach the construction of the app in different ways. It also allowed my to improve my knowledge of event listeners, functions, while loops, DOM navigation, local storage and intervals. For a seemingly simple application, this required a lot of research and effort to find a solution.