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

    // Calling the getEvents function to ensure that data saved to local storage is displayed upon reloading of the day planner as this sits within the document.ready function.

    getEvents();

    // Multiple event listeners to save text input to local storage when each save button is pressed

    $("#btn9").on("click", function() {
        var event9 = $("#9").val();
        alert("Saved");
        localStorage.setItem("9am", event9);
        
    })

    $("#btn10").on("click", function() {
        var event10 = $("#10").val();
        alert("Saved");
        localStorage.setItem("10am", event10);
        
    })
    
    $("#btn11").on("click", function() {
        var event11 = $("#11").val();
        alert("Saved");
        localStorage.setItem("11am", event11);
        
    })
    
    $("#btn12").on("click", function() {
        var event12 = $("#12").val();
        alert("Saved");
        localStorage.setItem("12pm", event12);
        
    })
    
    $("#btn13").on("click", function() {
        var event13 = $("#13").val();
        alert("Saved");
        localStorage.setItem("1pm", event13);
        
    })
    
    $("#btn14").on("click", function() {
        var event14 = $("#14").val();
        alert("Saved");
        localStorage.setItem("2pm", event14);
        
    })
    
    $("#btn15").on("click", function() {
        var event15 = $("#15").val();
        alert("Saved");
        localStorage.setItem("3pm", event15);
        
    })
    
    $("#btn16").on("click", function() {
        var event16 = $("#16").val();
        alert("Saved");
        localStorage.setItem("4pm", event16);
        
    })
    
    $("#btn17").on("click", function() {
        var event17 = $("#17").val();
        alert("Saved");
        localStorage.setItem("5pm", event17);

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







