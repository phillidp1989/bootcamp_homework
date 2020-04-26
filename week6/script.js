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



$(document).ready(function () {

    var key = "464a0053bf890f9650609bc40bb49e24";
    var userSearch;
    var celsiusYN = true;
    // var searchHistory = [];
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    // console.log(searchHistory);


    // Function to call, retrieve and display current weather conditions

    function currentWeather(citySearch) {

        // Define variable for API key

        userSearch = $("#searchField").val();
        var citySearch = userSearch.trim();
        // console.log(userSearch);


        // Define variable for API url

        var apiRequest = "http://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&APPID=" + key;
        

            $.ajax({
                url: apiRequest,
                method: "GET"
            }).then(function (response) {

                // console.log(response);

                var cityName = response.name;
                var countryName = response.sys.country;
                var currentTempCelsius = (response.main.temp - 273.15).toFixed(2);
                var currentTempF = ((response.main.temp - 273.15) * 1.80 + 32).toFixed(2);
                var currentHumidity = response.main.humidity;
                var currentWindSpeed = response.wind.speed;
                var lat = response.coord.lat;
                var lon = response.coord.lon;
                var currentDateTime = moment().format("LLL");
                $("#cityDate").html("<h2>" + cityName + ", " + countryName + " (" + currentDateTime + ")" + "<h2>");
                $("#currentIcon").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
                // $("#temp").text(currentTempCelsius + "° Celsius");
                $("#humidity").text(currentHumidity + "%");
                $("#windSpeed").text(currentWindSpeed + " MPH");

                if (celsiusYN) {
                    $("#temp").text(currentTempCelsius + "°C");
                } else {
                    $("#temp").text(currentTempF + "°F");
                }

                

                var uvRequest = "http://api.openweathermap.org/data/2.5/uvi?appid=" + key + "&lat=" + lat + "&lon=" + lon
                // console.log(uvRequest);

                $.ajax({
                    url: uvRequest,
                    method: "GET"
                }).then(function (uvResponse) {
                    var uvIndex = uvResponse.value;
                    $("#uvIndex").text(uvIndex);
                    $("#uvIndex").removeClass("green yellow orange red purple");

                    // If statement to change the colour of the span depending on the UV index

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

    function forecast() {
        
        userSearch = $("#searchField").val();
        var citySearch = userSearch.trim();
        var forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=" + key;
        
        $.ajax({
            url: forecastUrl,
            method: "GET"
        }).then(function (response) {
            var forecastDays = response.list;
            var dayCount = 1;
            for (var i = 0; i < forecastDays.length; i++) {                
                var dateTime = forecastDays[i].dt_txt;
                var date = dateTime.split(" ")[0];
                var time = dateTime.split(" ")[1];
                if (time === "12:00:00") {
                    var day = date.split("-")[2];
                    var month = date.split("-")[1];
                    var year = date.split("-")[0];
                    $("#day" + dayCount).children(".card-date").html(day + "/" + month + "/" + year);
                    $("#day" + dayCount).children(".card-icon").html("<img src=http://openweathermap.org/img/w/" + forecastDays[i].weather[0].icon + ".png>" );
                    if (celsiusYN) {
                        $("#day" + dayCount).children(".card-temp").html("Temp: "+ (forecastDays[i].main.temp - 273.15).toFixed(2) + "°C");
                    } else {
                        $("#day" + dayCount).children(".card-temp").html("Temp: "+ ((forecastDays[i].main.temp - 273.15) * 1.80 + 32).toFixed(2) + "°F");
                    }
                    
                     
                    $("#day" + dayCount).children(".card-humid").html("Humidity: " + forecastDays[i].main.humidity + "%"); 
                    
                    dayCount++;
                    
                }

            }
        })

    }

    
    


    function tempConversion() {

        if (celsiusYN) {
            $("#celFar").text("Convert to Celsius");
            celsiusYN = false;
        } else {
            $("#celFar").text("Convert to Farenheit");
            celsiusYN = true;
        }

    }

    tempConversion();

    $("#celFar").on("click", function () {
        // console.log(currentTempF);

        tempConversion();
        currentWeather();
        forecast();

    })

      


    

    $("#searchBtn").on("click", function(event) {
        // Prevent default behaviour of the submit button i.e. retain user input text
        event.preventDefault();
        $(".weatherContainer").removeClass("hide");

        if (searchHistory.length > 7) {
        
        searchHistory.shift();
        searchHistory.push($("#searchField").val().charAt(0).toUpperCase() + $("#searchField").val().slice(1));

    } else {
        searchHistory.push($("#searchField").val().charAt(0).toUpperCase() + $("#searchField").val().slice(1));
    }
        
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        currentWeather();
        renderSearchHistory();
        forecast();
        

    })

    function renderSearchHistory() {
        $(".cityHistory").empty();
        
        for (var i = 0; i < searchHistory.length; i++) {
            var historyButton = $("<button>")
            // console.log(searchHistory[i]);
            historyButton.addClass("city btn btn-light btn-lg btn-block");            
            historyButton.text(searchHistory[i]);            
            $(".cityHistory").prepend(historyButton);
        }

        $(".city").on("click", function() {
        
            $(".weatherContainer").removeClass("hide");
            $("#searchField").val($(this).text());
            currentWeather();
            forecast();
        })

    }

    renderSearchHistory();
    
    $("#clearHistory").on("click", function() {
        $(".cityHistory").empty();
        $("#searchField").val("");
        searchHistory = [];
        localStorage.clear();
    })



})