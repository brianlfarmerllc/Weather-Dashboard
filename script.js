// moment current date format
var currentDate = moment().format("dddd MMM Do");
var yyyymmdd = moment().format("yyyy-MM-DD");
// variable to hold the list of cities in search
var savedCitiesList;
if (localStorage.savedCitiesList === undefined) {
    savedCitiesList = [];
} else {
    savedCitiesList = JSON.parse(window.localStorage.savedCitiesList);
}

// This function handles the event of adding a city to the savedCitiesList array and calls for a current weather and 5 day forcast
function searchAndSave(event) {
    event.preventDefault();
    newCity = $("#cityStateInput").val().trim();

    if ($("#cityStateInput").val() !== "" && savedCitiesList.indexOf(newCity) === -1) {
        savedCitiesList.push(newCity);
        localStorage.setItem("savedCitiesList", JSON.stringify(savedCitiesList));
        createCitiesStateList();
        weatherForcast(newCity);
    }
};
// this function handles looking at local storage and generating saved city, state searches and handles prepending new items to the search list.
function createCitiesStateList() {
    $("#cityStateList").empty();
    for (let i = 0; i < savedCitiesList.length; i++) {
        var li = $("<li>");
        li.addClass("list-group-item");
        li.attr("data-name", savedCitiesList[i]);
        li.text(savedCitiesList[i]);
        $("#cityStateList").prepend(li);
    }
}
//}
// call function to create list of searched city, state if they exist in local storage
createCitiesStateList()

// this function allows user to clear the list of cities from local storage. Has a confirm prompt before clearing data
function clearCityStateList(event) {
    event.preventDefault();
    var youSure = confirm("Are you sure you want to clear search history")
    if (youSure === true) {
        localStorage.clear();
        location.reload();
    } else {
        return
    }
}
// function to generate weather forcast note: newCity passed from searchAndSave function or 
function weatherForcast(newCity) {
    // API key for open weather map
    var apiKey = "cc62b6c835bfbb5dca22c27c9a6e7024";
    // urls for ajax calls using open weather map api
    var queryUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + newCity + "&appid=" + apiKey
    var queryUrlForcast = "https://api.openweathermap.org/data/2.5/forecast?q=" + newCity + "&appid=" + apiKey
    // Ajax call for current weather information

    $.ajax({
        url: queryUrlCurrent,
        method: "GET",
    }).then(function (response) {
        // sets curent weather div to blank status before generating current weather data
        $("#currentWeather").empty();
        // creating the icon using open weather data icon code
        var iconCode = (response.weather[0].icon);
        var iconurl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        // creating div with current weather data to append to page
        var currentWeatherData = $(
            `<div>
        <h2>${response.name + " - " + currentDate} <img src="${iconurl}"> </h2> 
        <p>${"Temperature: " + (Math.floor((response.main.temp - 273.15) * 1.80 + 32)) + "°F"}<p> 
        <p>${"Humidity: " + response.main.humidity + "%"}<p> 
        <p>${"Wind Speed: " + response.wind.speed + " MPH"}<p> 
            </div>`
        );
        // replace header with text and Icon's
        $("#header").empty();
        var headerh1 = $("<h1>").attr("id", "headerH1").text("Farmer's Almanac - Weather Edition");
        $("#header").append(headerh1);
        var headerImg = $("<img>").attr("src", iconurl);
        $("#headerH1").append(headerImg);
        var headerImg2 = $("<img>").attr("src", iconurl);
        $("#headerH1").prepend(headerImg2);


        // appends current weather data to the page
        $("#currentWeather").append(currentWeatherData);

        // varible for the uvurl set below other urlsbecause it uses lat and long from the current weather data response 
        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lat;
        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function (uvResponse) {
            // creates p element with uv data and appends it to current weather data div thats already appended to page
            uvIndex = $("<p>").attr("id", "uvIndexValue").text("UV Index: " + uvResponse.value);
            $(currentWeatherData).append(uvIndex);
            
            if (uvResponse.value < 3) {
                $("#uvIndexValue").addClass("low")
            } else if (uvResponse.value > 3 && uvResponse.value < 6){
                $("#uvIndexValue").addClass("moderate")
            } else if (uvResponse.value > 6 && uvResponse.value < 8){
                $("#uvIndexValue").addClass("high")
            } else if (uvResponse.value > 8 && uvResponse.value < 11){
                $("#uvIndexValue").addClass("veryHigh")
            } else {
                $("#uvIndexValue").addClass("extreme")
            }


        });
    })
    // ajax call for future forecast
    $.ajax({
        url: queryUrlForcast,
        method: "GET",
    }).then(function (forecastResponse) {
        console.log(forecastResponse)
        // sets card deck div to blank status before generating 5 day forcast cards
        $("#fiveDay").empty();
        for (let i = 0; i < forecastResponse.list.length; i++) {
            if (forecastResponse.list[i].dt_txt.indexOf(yyyymmdd) !== 0 && forecastResponse.list[i].dt_txt.indexOf("12:00:00") !== -1) {
                var newCard = $("<div>").attr("class", "col-5 col-lg-3 col-xl-2 card mt-3");
                newCard.append($("<h3>").text(moment(forecastResponse.list[i].dt, "X").format("MMM Do")));
                newCard.append($("<img>").attr("src", "https://openweathermap.org/img/w/" + forecastResponse.list[i].weather[0].icon + ".png"));
                newCard.append($("<p>").attr("class", "card-text").html("Temp: " + (Math.floor((forecastResponse.list[i].main.temp - 273.15) * 1.80 + 32)) + "°F"));
                newCard.append($("<p>").attr("class", "card-text").text("Humidity: " + forecastResponse.list[i].main.humidity + "%"));

                $("#fiveDay").append(newCard);
            }
        }
    })

}

function previousCities(event){
    event.preventDefault();
    var newCity =event.target.textContent;
    weatherForcast(newCity);
};


// event listeners 
$("#cityStateList").on("click", previousCities)
$("#searchButton").on("click", searchAndSave)
$("#clearSearch").on("click", clearCityStateList)



