# bootcamp_homework week 3

## Random Password Generator

In this project, I was provided with some HTML and CSS starter code and I was tasked with creating a JavaScript file to add functionaliy to the web application to create a random password generator.

## Brief

The password generator provides an output based on user-selected criteria and is responsive to different screen sizes.

As with other tasks, the requirements were set out in a User Story and corresponding Acceptance Criteria:

## User Story


<ul>

AS AN employee with access to sensitive data<br>
I WANT to randomly generate a password that meets certain criteria<br>
SO THAT I can create a strong password that provides greater security<br><br>


## Acceptance Criteria

GIVEN I need a new, secure password
<ol>
<li>WHEN I click the button to generate a password<br>
THEN I am presented with a series of prompts for password criteria<br><br>
In order to satisfy this requirement, I used created a function which is triggered when the Generate Password button is clicked, as a result of the eventListener.</li>
<li>WHEN prompted for password criteria
THEN I select which criteria to include in the password<br><br>
These prompts were contained within the generatePassword function and only get called if the user inputs a valid password length</li>
<li>WHEN prompted for the length of the password
THEN I choose a length of at least 8 characters and no more than 128 characters<br><br>
This prompt is the first element of the generate Password function and presents the user with a prompt to enter their desired password length between 8 and 128. There is then an if else statement to validate whether the user iput text is too low, too high or null</li>
<li>WHEN prompted for character types to include in the password
THEN I choose lowercase, uppercase, numeric, and/or special characters<br><br>
Following the user inputting their chosen password length, the user is then presented with 4 confirm popup bpxes asking them to confirm whether they would like their password to contain uppercase letters, lowercase letters, numbers and/or symbols</li>
<li>WHEN I answer each prompt
THEN my input should be validated and at least one character type should be selected<br><br>
Following the user responding to all 4 confirm messages, the JS includes an if else statement to validate that the user has selected at least one of the possible criteria</li>
<li>WHEN all prompts are answered
THEN a password is generated that matches the selected criteria<br><br>
A series of if else statements corresponding to each of the permutations of user selected criteria creates a concatenation of the relevant arrays to be used for the password generation</li>
<li>WHEN the password is generated
THEN the password is either displayed in an alert or written to the page<br><br>
A Math.random function is used to select characters from the relevant concatenated array and this text is written to the page using document.queryselector and .value functions</li>

</ol>




## Challenges

The main challenge with this work was the vast amounts of different ways that the solution could be achieved. Utilising various resources highlighted many different methods and approaches to satisfying the user criteria, so it was important to pseudo code at the beginning of the project to establish what approach needed to be followed.

I was primarily focussed on creating a functional password generator, but I am aware that my code could possibly be refactored and simplified. I think that the approach I took was simplistic and provides a good foundation to then write more efficient code. 

## What did I learn?

This mini-project was a great way of reinforcing foundation JavaScript methods as I needed to utilise variables, conditionals, mathematical operators, loops, DOM elements and eventListeners in order to satisfy the acceptance criteria. There were some elements in my code that I had not encountered before such as .push and .join which I am now familiar with and can use elsewhere. This project also exemplifies how a solution can be arrived at in a number of different ways.