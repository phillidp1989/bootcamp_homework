// Pseudo code

// Create three columns - one for the time slot, one for the user input and one for save icon
// Create a fourth element allowing the user to click a button to remove the event without manually clearing the text
// Refresh the browser on the hour to update which events have passed
// Create button to remove all data from local storage
// When user hits save, event(s) should be saved to local storage and browser updated to reflect the current time
// BONUS - Create alert 15 minutes before event is due 
// BONUS - create button next to each event to move it up and/or down the list of time slots
// BONUS - when event is input, this creates an element which can then be removed by clicking an x or can be dragged and dropped into another timeslot



// Create a function to refresh the page at the turn of the hour to keep the planner up to date by showing which events are in the past and which are in the future

// Declaring variables

var currentDate = (moment().format("LL"));
var currentTime = (moment().format("hh:mm:ssA"))

// Using colon as a delimiter, this will allow me to separate the hour from the current time object and use this to compare against each time block

var hourMinuteSecondSplit = currentTime.split(":");
console.log(hourMinuteSecondSplit);




$(document).ready(function() {

      
    var CurrentTime = moment().format("h:mm:ss")
    var secMinHourSplit = CurrentTime.split(":");
    var secondsToRefresh = 60 - parseInt(secMinHourSplit[2]);
    var minutesToRefresh = 59 - parseInt(secMinHourSplit[1]); 
    var totalTimetoRefresh = secondsToRefresh + (minutesToRefresh*60); 
    var secondsElapsedSinceRefresh = 0;
    
    var refreshInterval = setInterval(function() {
        secondsElapsedSinceRefresh++
        if(secondsElapsedSinceRefresh === totalTimetoRefresh) {
            var refreshYesNo = confirm("Would you like to refresh your day planner? Any unsaved changes will be lost.")

            if(refreshYesNo) {
                window.location.reload();
            } else {
                alert("Your planner has not been automatically updated. Please refresh your page manually ")
                
                clearInterval(refreshInterval);
            }

        }
    },1000);

    

    // Current date and time to display at the top of the planner
    
    function CurrentDateTime() {
        var dateP = (moment().format("dddd Do MMMM YYYY"));
        var timeP = (moment().format("hh:mm:ss A"));
        $("#currentDay").text(dateP);
        $("#clock").text(timeP); 
        var updatingHour = timeP.split(":");         
        // return (updatingHour[0]);

    }
    
    // Set interval function calls the CurrentDateTime function every second, which creates an updating clock
    
    CurrentDateTime();
    setInterval(CurrentDateTime, 1000);

    // var globalHour = CurrentDateTime();
    
    


    // Function to update colour of the time block depending on whether it is in the past, present or future

    function updateCurrentColour() {
        var currentHour = moment().format("HH");    
        
        // Each() function created to loop through all elements with the 'description' class i.e. all of the text area fields representing an individual timeblock

        $(".description").each(function() {

        // Added parseInt function as my 9am timblock was being assigned with the incorrect class

            var descriptionId = parseInt($(this).attr("id"));

        // If else statement to compare the current hour with the ID of each text area field which corresponds to the timeblock it represents

            if (currentHour == descriptionId) {
                $(this).addClass("present");
            } else if (descriptionId > currentHour) {
                $(this).addClass("future");
            } else {
                $(this).addClass("past");

            }
        })
        
    }

    // Function called to update the colours based on the current hour and a setInterval function used to update this every second
    updateCurrentColour();
    setInterval(updateCurrentColour, 1000)

    
    // Function to display saved events when the page is (re)loaded

    function getEvents() {
        
        $(".description").each(function () {
            
            var hourId = $(this).parent().attr("id");
            
            eventDescription = localStorage.getItem(hourId);

            $(this).val(eventDescription)
        })
    }

    getEvents();

    // Function to save events input by user to local storage

    
    $(".saveBtn").on("click", function() {
        var hourTimeblock = $(this).parent(".time-block").attr("id");
        var timeblockEvent = $(this).siblings(".description").val();
        

        localStorage.setItem(hourTimeblock, timeblockEvent);
        

    })    

    // Function to clear all events
    
    $("#clearEventsBtn").on("click", function() {
        var clearAllQ = confirm("Are you sure you wish to delete all saved events?")

        if (clearAllQ) {
            $(".description").val("");
            localStorage.clear();
        }
                
        return;

    })


    


});








