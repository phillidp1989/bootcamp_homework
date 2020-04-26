# Weather Dashboard

In this project, I was tasked with creating a weather dashboard which provides the user with the ability to search for a city and be presented with the current weather and the 5-day forecast.

<img src="https://user-images.githubusercontent.com/61989740/80313950-32a31d80-87e6-11ea-8c85-9203274bd9ab.png"> 

## Link to deployed application

https://phillidp1989.github.io/bootcamp_homework/week6/ 

## Description

The app features a header with the title of 'Weather Dashboard', a sidebar containing a search bar, list of recently searched cities pulled from local storage (maximum of 8) and the main part of the app shows the current weather of a searched for city and the five day forecast. In addition to the core functionality, I have added a clear history button, which wipes local storage and clears the list of recently searched for cities. Also, there is a button which toggles between celsius and farenheit metrics for the current and forecast temperatures. The app makes use of bootstrap grid system, so the site is fully responsive to devices of different sizes.

As with other tasks, the requirements were set out in a User Story and corresponding Acceptance Criteria:

## User Story


AS A traveler<br>
I WANT to see the weather outlook for multiple cities<br>
SO THAT I can plan a trip accordingly<br><br>


## Acceptance Criteria

GIVEN a weather dashboard with form inputs
<ol>
<li>WHEN I search for a city<br>
THEN I am presented with current and future conditions for that city and that city is added to the search history
<br><br>

I satisfied this requirement by using three APIs from the OpenWeather website, retrieving data through multiple ajax calls. Using JavaScript, buttons are dynamically added to the sidebar with the name of the searched city providing the text content of these buttons. Each search text is saved to local storage and then retrieved when the user refreshes their browser. An event listener is then added to each new button and the defined functions to retrieve and display current and forecasted weather are called.</li>

<li>WHEN I view current weather conditions for that city<br>
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index<br><br>

The city name, the date, an icon representation of weather conditions, the temperature, the humidity and the wind speed are retrieved using the Current Weather API and the UV Index is called in a nested ajax call using the UV API provided by OpenWeather. The temperature is returned in Kelvin, so further calculation is done in JavaScript to convert this to Celsius and Farenheit.</li>

<li>WHEN I view the UV index<br>
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe<br><br>

This could have been satisfied by using setAttributes of attr(), but I decided to use addClass to add specific classes depending on the UV index, using an if else statement to achieve this. Each class was named according to its background colour, which would then be applied to the UV Index div.</li>

<li>WHEN I view future weather conditions for that city<br>
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
<br><br>

Similarly, this was achieved using the 5 day/ 3 hour OpenWeather API. Like with the current weather data, I provide the user with the option of viewing the temperature in Celsius or Farenheit.</li>

<li>WHEN I click on a city in the search history<br>
THEN I am again presented with current and future conditions for that city<br><br>

Each city that has been searched for is added to the sidebar as a button. An event listener has been added to the common class assigned to all of these buttons which then runs the currentWeather() and forecast() functions against the city.</li>

<li>WHEN I open the weather dashboard<br>
THEN I am presented with the last searched city forecast<br><br>

Using the localStorage.getItem function, each of the searched for cities (held in an array) is looped through, a button created and prepended to the sideboard upon reloading of the browser. This ensures that the last searched for item is displayed when the user reloaded the page.</li>


</ol>


## Challenges and things I learned

The biggest challenge I faced was regarding scope and the accessiblity of variables in different functions. Specifically, this affected the way I have written my code for retrieving the UVIndex. Ideally, I wanted to have a separate function to retrieve and render this data as it uses its own API. However, the search parameter for the UV Index is lat and lon rather than the city name. I therefore needed to nest my ajax calls to make use of the lat and lon data from the current weather API.

This was an incredibly interesting and useful project as it gave me a good insight into how to use APIs and how this can enrich an application. With more time, I would like to add an additional API to my JS file to show the map of the city being searched for and to catch any API call fails to alert the user that their search did not yield any results. Also, I would like to explore the possibility of using Levenshtein Distance algorithm to deal with misspelled searches.
