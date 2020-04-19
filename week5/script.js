// Pseudo code

// Create three columns - one for the time slot, one for the user input and one for save icon
// Create a function to compare current hour with the hour of the timeblock (through element id)
// When user hits save, event(s) should be saved to local storage and browser updated to reflect the current time
// Function to get items from local storage and save them to the appropriate timeblock
// Create button to remove all data from local storage
// BONUS - Add night mode feature 


$(document).ready(function() {       

    

    // Current date and time to display at the top of the planner
    
    function CurrentDateTime() {
        var dateP = (moment().format("dddd Do MMMM YYYY"));
        var timeP = (moment().format("hh:mm:ss A"));
        $("#currentDay").text(dateP);
        $("#clock").text(timeP); 
        

    }
    
    // Set interval function calls the CurrentDateTime function every second, which creates an updating clock
    
    CurrentDateTime();
    setInterval(CurrentDateTime, 1000);

     
    // Function to update colour of the time block depending on whether it is in the past, present or future

    function updateCurrentColour() {
        var currentHour = moment().format("HH");    
        
    // Each() function created to loop through all elements with the 'description' class i.e. all of the text area fields representing an individual timeblock

        $(".description").each(function() {

    // Removing all tense classes ensures that there are no conflicts in the css code if a new class is added

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

    
    // Function to clear all events by clearing local storage and setting the text area of each timeblock to an empty string.
    
    $("#clearEventsBtn").on("click", function() {
        var clearAllQ = confirm("Are you sure you wish to delete all saved events?")

        if (clearAllQ) {
            $(".description").val("");
            localStorage.clear();
        }
                
        return;

    })

    // Function to set the data from local storage to the relevant textarea element upon reloading of the page

    function getEvents() {


        $(".description").each(function() {
            var btnID = $(this).siblings(".saveBtn").attr("id");
            var eventData = localStorage.getItem(btnID);
            console.log(btnID);
            console.log(eventData);
            $(this).val(eventData);

        })
        

        
    }    

    // Calling the getEvents function to ensure that data saved to local storage is displayed upon reloading of the day planner as this sits within the document.ready function.

    getEvents();

    // Event listener on the saveBtn class which, through implicit iteration, loops through all elements with this class and adds the event listener to all buttons



    $(".saveBtn").on("click", function() {
        var timeKey = $(this).attr("id");
        var timeValue = $(this).siblings(".description").val();
        localStorage.setItem(timeKey, timeValue);
        console.log(timeKey);
        console.log(timeValue);
    })

    

    // Function to change the colour of the background by adding a class to the body element when it reaches 6pm and removal of the class at midnight

    function night() {
        
        var currentHourNight = moment().format("HH");
        
        if (currentHourNight > 17) {
            $("body").addClass("night")
        } else {
            $("body").removeClass("night")
        }
    }

    setInterval(night, 1000);

});








