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

      
    // var CurrentTime = moment().format("h:mm:ss")
    // var secMinHourSplit = CurrentTime.split(":");
    // var secondsToRefresh = 60 - parseInt(secMinHourSplit[2]);
    // var minutesToRefresh = 59 - parseInt(secMinHourSplit[1]); 
    // var totalTimetoRefresh = secondsToRefresh + (minutesToRefresh*60); 
    // var secondsElapsedSinceRefresh = 0;
    
    // var refreshInterval = setInterval(function() {
    //     secondsElapsedSinceRefresh++
    //     if(secondsElapsedSinceRefresh === totalTimetoRefresh) {
    //         var refreshYesNo = confirm("Would you like to refresh your day planner? Any unsaved changes will be lost.")

    //         if(refreshYesNo) {
    //             window.location.reload();
    //         } else {
    //             alert("Your planner has not been automatically updated. Please refresh your page manually ")
                
    //             clearInterval(refreshInterval);
    //         }

    //     }
    // },1000);

    

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

            $(this).removeClass("present past future");

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
    setInterval(updateCurrentColour, 1000);

    
    // Function to display saved events when the page is (re)loaded

    // function getEvents() {
        
    //     $(".description").each(function () {
            
    //         var hourId = $(this).parent().attr("id");
            
    //         eventDescription = localStorage.getItem(hourId);

    //         $(this).val(eventDescription)
    //     })
    // }

    // getEvents();

    // Function to save events input by user to local storage

    
    // $(".saveBtn").on("click", function() {
    //     var hourTimeblock = $(this).parent(".time-block").attr("id");
    //     var timeblockEvent = $(this).siblings(".description").val();
        

    //     localStorage.setItem(hourTimeblock, timeblockEvent);
        

    // })    

    // Function to clear all events
    
    $("#clearEventsBtn").on("click", function() {
        var clearAllQ = confirm("Are you sure you wish to delete all saved events?")

        if (clearAllQ) {
            $(".description").val("");
            localStorage.clear();
        }
                
        return;

    })


    function getEvents() {
        var localstorage9 = localStorage.getItem("9am");
        $("#9").val(localstorage9);

        var localstorage10 = localStorage.getItem("10am");
        $("#10").val(localstorage10);

        var localstorage11 = localStorage.getItem("11am");
        $("#11").val(localstorage11);

        var localstorage12 = localStorage.getItem("12pm");
        $("#12").val(localstorage12);

        var localstorage13 = localStorage.getItem("1pm");
        $("#13").val(localstorage13);

        var localstorage14 = localStorage.getItem("2pm");
        $("#14").val(localstorage14);

        var localstorage15 = localStorage.getItem("3pm");
        $("#15").val(localstorage15);

        var localstorage16 = localStorage.getItem("4pm");
        $("#16").val(localstorage16);

        var localstorage17 = localStorage.getItem("5pm");
        $("#17").val(localstorage17);


    }

    // Calling the getEvents function to ensure that data saved to local storage is displayed upon reloading of the day planner

    getEvents();

    // Multiple event listeners to save text input to local storage when each save button is pressed

    $("#btn9").on("click", function() {
        var event9 = $("#9").val();
        localStorage.setItem("9am", event9);

    })

    $("#btn10").on("click", function() {
        var event10 = $("#10").val();
        localStorage.setItem("10am", event10);

    })

    $("#btn11").on("click", function() {
        var event11 = $("#11").val();
        localStorage.setItem("11am", event11);

    })

    $("#btn12").on("click", function() {
        var event12 = $("#12").val();
        localStorage.setItem("12pm", event12);

    })

    $("#btn13").on("click", function() {
        var event13 = $("#13").val();
        localStorage.setItem("1pm", event13);

    })

    $("#btn14").on("click", function() {
        var event14 = $("#14").val();
        localStorage.setItem("2pm", event14);

    })

    $("#btn15").on("click", function() {
        var event15 = $("#15").val();
        localStorage.setItem("3pm", event15);

    })

    $("#btn16").on("click", function() {
        var event16 = $("#16").val();
        localStorage.setItem("4pm", event16);

    })

    $("#btn17").on("click", function() {
        var event17 = $("#17").val();
        localStorage.setItem("5pm", event17);

    })


    

});








