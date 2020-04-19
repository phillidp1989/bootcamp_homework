# Day Planner

In this project, I was tasked with creating a day planner in which the user could record events during a specific timeblock during the day which would then be saved to the browser.

<img src="https://user-images.githubusercontent.com/61989740/79689323-edae4280-824b-11ea-8f17-38d0f7d93468.png"> 

## Link to deployed application

https://phillidp1989.github.io/bootcamp_homework/week5/ 

## Brief

The app features a jumbotron containing today's date and a dynamically updating clock showing the current time. In the main body of the application are multiple rows each representing an hour during the working day. The user can enter text to describe the event and click the save button to store this text in local storage. Each timeblock is coloured based on whether the hour is in the past, present or future based on the current time. I have also added a feature which updates the background colour when the last time block ends (night mode) and a button to clear all events and remove data from local storage.

As with other tasks, the requirements were set out in a User Story and corresponding Acceptance Criteria:

## User Story


AS AN employee with a busy schedule<br>
I WANT to add important events to a daily planner<br>
SO THAT I can manage my time effectively<br><br>


## Acceptance Criteria

GIVEN I am using a daily planner to create a schedule
<ol>
<li>WHEN I open the planner<br>
THEN the current day is displayed at the top of the calendar<br><br>

Using the moment.js object, I was able to display the date (and time) at the top of the application in various formats. In order to ensure that the time updates dynamically, this object was held in a function which is called every second using the setInterval function.</li>

<li>WHEN I scroll down<br>
THEN I am presented with timeblocks for standard business hours<br><br>

Using the Bootstrap grid system, I added nine rows, each with three columns to evenly create the timeblocks in the HTML. Each column contained either the hour description, a text area for the user to input their events and a save button.</li>

<li>WHEN I view the timeblocks for that day<br>
THEN each timeblock is color coded to indicate whether it is in the past, present, or future<br><br>

This feature was created using a function and an if else statement to compare the current hour (utilising the moment.js current time object) with the ID of each of the timeblocks, which was recorded as the hour in the day it represented. Based on whether the current hour was less than, equal to or more than the timeblock hour, a new class with specific css colour styling is added to the relevant text area. This function is then called every second using setInterval to ensure this styling updates automatically at the turn of the hour.</li>

<li>WHEN I click into a timeblock<br>
THEN I can enter an event<br><br>

This was done simply using the textarea element which allows the user to type in unlimited text.</li>

<li>WHEN I click the save button for that timeblock<br>
THEN the text for that event is saved in local storage<br><br>

The save button class was targeted and an event listener added using JQuery. Upon clickng the save button, the value of the textarea being saved is stored in local storage and the user is presented with an alert message confirming that their event has been saved.</li>

<li>WHEN I refresh the page
THEN the saved events persist<br><br>

Using the localStorage.getItem function, each of the relevant text areas is autopopulated with the values saved to local storage upon reloading of the application.</li>


</ol>


## Challenges and things I learned

The biggest challenge for this project was appropriately utilising JQuery to carry out some of the functions of the application. I initially wrote many lines of code to setItems and getItems using local storage, but this seemed very inefficient. I researched implicit iteration and explicit iteration and discovered that I could massively reduce the amount of code to carry out the same function with the help of JQuery.

The use of moment.js was less troublesome than I first anticipated, given it was a new topic. The documentation on the moment.js website was extremely useful and it was clear how this object could be helpful in this, and other, projects requiring reference to dates and time.
