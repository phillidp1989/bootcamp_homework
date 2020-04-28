// Pseudo code

// Variable holding the API key
// Variable holding the link to city search
// Variable holding the link to lat lon search
// Variable holding local storage object (search term and url being called)
// Function run when the search button is clicked
//     Run the call to the API
//     Save search and url to local storage
//     Append search term to history
//     Each individual piece of data needs to be posted to the site 
//     Calculation of celsius and farenheit
//     Div holding the UV needs to change colour depending on the level
// Function to be run as part of the on click function which pops first search out of the array when limit of 8 is hit
// Function to get Items from local storage to store them in the search history


// Document.ready to ensure the following code is run when the browser is opened

$(document).ready(function () {

    // Defining global variables

    var key = "464a0053bf890f9650609bc40bb49e24";
    var userSearch;
    var celsiusYN = true;
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];


    // Populate last searched city upon reload of the page

    if (searchHistory.length > 0) {
        $("#searchField").val(searchHistory[searchHistory.length - 1]);
        currentWeather();
        forecast();
        $(".weatherContainer").removeClass("hide");
        $("#searchField").val("");

    }






    // Current Weather function to call, retrieve and display current weather conditions

    function currentWeather(citySearch) {

        // Assigning value to variable based on value of input BhxBrowser. Second variable trims and spaces

        userSearch = $("#searchField").val();
        var citySearch = userSearch.trim();


        // Define variable for API url

        var apiRequest = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&APPID=" + key;

        // ajax call to retrieve data using current weather API

        $.ajax({
            url: apiRequest,
            method: "GET"
        }).then(function (response) {

            // Defining variables to hold data provided by API

            var cityName = response.name;
            var countryName = response.sys.country;
            var currentTempCelsius = (response.main.temp - 273.15).toFixed(2);
            var currentTempF = ((response.main.temp - 273.15) * 1.80 + 32).toFixed(2);
            var currentHumidity = response.main.humidity;
            var currentWindSpeed = response.wind.speed;
            var lat = response.coord.lat;
            var lon = response.coord.lon;

            // Variable to hold the current date and time using moment.js

            var currentDateTime = moment().format("LLL");

            // jQuery functions to display API data in the application

            $("#cityDate").html("<h2>" + cityName + ", " + countryName + " (" + currentDateTime + ")" + "<h2>");
            $("#currentIcon").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
            $("#humidity").text(currentHumidity + "%");
            $("#windSpeed").text(currentWindSpeed + " MPH");

            // If else statement to determine which metric the temperature is shown in based on the celsiusYN boolean value

            if (celsiusYN) {
                $("#temp").text(currentTempCelsius + "°C");
            } else {
                $("#temp").text(currentTempF + "°F");
            }

            // Defining variable containing UV index url

            var uvRequest = "https://api.openweathermap.org/data/2.5/uvi?appid=" + key + "&lat=" + lat + "&lon=" + lon

            // Nested ajax call to make use of lat and lon data from first ajax call. This call s for the UV Index

            $.ajax({
                url: uvRequest,
                method: "GET"
            }).then(function (uvResponse) {
                var uvIndex = uvResponse.value;
                $("#uvIndex").text(uvIndex);
                $("#uvIndex").removeClass("green yellow orange red purple");

                // If statement to change the colour of the UV span depending on the UV index

                if (parseInt(uvIndex) >= 0 && parseInt(uvIndex) <= 2) {
                    $("#parseInt(uvIndex)").addClass("green");
                } else if (parseInt(uvIndex) >= 3 && parseInt(uvIndex) <= 5) {
                    $("#uvIndex").addClass("yellow");
                } else if (parseInt(uvIndex) >= 6 && parseInt(uvIndex) <= 7) {
                    $("#uvIndex").addClass("orange");
                } else if (parseInt(uvIndex) >= 8 && parseInt(uvIndex) <= 10) {
                    $("#uvIndex").addClass("red");
                } else {
                    $("#uvIndex").addClass("purple");
                }
            })

        })

    }

    // Forecast function to call, retrieve and display 5 day forecast data using API

    function forecast() {

        // Assigning and defining variables

        userSearch = $("#searchField").val();
        var citySearch = userSearch.trim();
        var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=" + key;

        // ajax call to forecast API

        $.ajax({
            url: forecastUrl,
            method: "GET"
        }).then(function (response) {

            // Variable to hold object property which contains the relevant data

            var forecastDays = response.list;

            // Variable to hold a counter to ensure data is displayed against the correct card in HTML (this will be incremented)

            var dayCount = 1;

            // For loop to loop through all 40 properties of the response.list object returned by the API call

            for (var i = 0; i < forecastDays.length; i++) {

                // Variable to hold the date and time and a split() function is used to separate into an array

                var dateTime = forecastDays[i].dt_txt;
                var date = dateTime.split(" ")[0];
                var time = dateTime.split(" ")[1];

                // If else statement to display data only if the time is equal to 12:00:00. This ensures there will be data for consecutive days (API shows data at 3 hr intervals)

                if (time === "12:00:00") {
                    var day = date.split("-")[2];
                    var month = date.split("-")[1];
                    var year = date.split("-")[0];
                    $("#day" + dayCount).children(".card-date").html(day + "/" + month + "/" + year);
                    $("#day" + dayCount).children(".card-icon").html("<img src=https://openweathermap.org/img/w/" + forecastDays[i].weather[0].icon + ".png>");
                    if (celsiusYN) {
                        $("#day" + dayCount).children(".card-temp").html("Temp: " + (forecastDays[i].main.temp - 273.15).toFixed(2) + "°C");
                    } else {
                        $("#day" + dayCount).children(".card-temp").html("Temp: " + ((forecastDays[i].main.temp - 273.15) * 1.80 + 32).toFixed(2) + "°F");
                    }

                    $("#day" + dayCount).children(".card-humid").html("Humidity: " + forecastDays[i].main.humidity + "%");

                    // Increments the counter at the end of each loop to make sure data is being posted to the correct card

                    dayCount++;
                }
            }
        })
    }

    // Temperature conversion function

    function tempConversion() {

        // If statement to assess which temp metric should be displayed based on boolean value defaulted to true in global variable

        if (celsiusYN) {
            $("#celFar").text("Convert to Celsius");
            celsiusYN = false;
        } else {
            $("#celFar").text("Convert to Farenheit");
            celsiusYN = true;
        }
    }

    // Function called within document.ready to make sure celsiusYN is evaluated

    tempConversion();

    // Event listener on the temp button to run three functions

    $("#celFar").on("click", function () {

        tempConversion();
        currentWeather();
        forecast();
    })

    // Event listener on the search button

    $("#searchBtn").on("click", function (event) {

        // Prevent default behaviour of the submit button i.e. retain user input text

        event.preventDefault();

        // Remove hide class which then displays the weatherContainer and its contents

        $(".weatherContainer").removeClass("hide");

        // If statement to push searched for city to the array and if this exceeds 8 searches, the first city searched for will be sliced from the array

        if (searchHistory.length > 7) {

            searchHistory.shift();
            searchHistory.push($("#searchField").val().charAt(0).toUpperCase() + $("#searchField").val().slice(1));

        } else {
            searchHistory.push($("#searchField").val().charAt(0).toUpperCase() + $("#searchField").val().slice(1));
        }

        // Searched for city saved to local storage

        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

        // Three main functions called

        currentWeather();
        renderSearchHistory();
        forecast();


    })

    // renderSearchHistory function to display history in sidebar

    function renderSearchHistory() {

        // Clears div of any content to avoid duplication

        $(".cityHistory").empty();

        // For loop to loop through cities in the array and create and prepend a button to the sidebar

        for (var i = 0; i < searchHistory.length; i++) {
            var historyButton = $("<button>")
            historyButton.addClass("city btn btn-light btn-lg btn-block");
            historyButton.text(searchHistory[i]);
            $(".cityHistory").prepend(historyButton);
        }

        // Event listener on the city buttons to run main functions to display current and forecasted weather

        $(".city").on("click", function () {

            $(".weatherContainer").removeClass("hide");
            $("#searchField").val($(this).text());
            currentWeather();
            forecast();
            $("#searchField").val("");
        })

    }

    renderSearchHistory();

    // Clear history function

    $("#clearHistory").on("click", function () {
        $(".cityHistory").empty();
        $("#searchField").val("");
        searchHistory = [];
        localStorage.clear();
    })

})