// variable to hold the list of cities in search
var currentDate = moment().format("dddd MMM Do");
var savedCitiesList;
if (localStorage.savedCitiesList === undefined) {
    savedCitiesList = [];
} else {
    savedCitiesList = JSON.parse(window.localStorage.savedCitiesList);
}
// creating global variable for new city
var newCity

// This function handles the event of adding a city to the savedCitiesList array
function searchAndSave(event) {
    if ($("#cityStateInput").val() !== "") {
        event.preventDefault();
        newCity = $("#cityStateInput").val().trim();
        savedCitiesList.push(newCity);
        localStorage.setItem("savedCitiesList", JSON.stringify(savedCitiesList));
        createCitiesStateList();
        weatherForcast(newCity);
    }
};
// this function handles looking at local storage and prepending new items to the search list.
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
// call function to create list of sities if they exist in local storage
createCitiesStateList()

// this function allows user to clear the list of cities from local storage.
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
    apiKey = "cc62b6c835bfbb5dca22c27c9a6e7024";
    queryUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + newCity + "&appid=" + apiKey
    queryUrlForcast = "https://api.openweathermap.org/data/2.5/forecast?q=" + newCity + "&appid=" + apiKey
    var uvindex;

    $.ajax({
        url: queryUrlCurrent,
        method: "GET",
    }).then(function (response) {
        $("#currentWeather").empty();
        var iconCode = (response.weather[0].icon);
        var iconurl = "http://openweathermap.org/img/w/" + iconCode + ".png";

        var currentWeatherData = $(
            `<div>
        <h2>${response.name + " - " + currentDate} <img src="${iconurl}"> </h2> 
        <p>${"Temperature: " + (Math.floor((response.main.temp - 273.15) * 1.80 + 32)) + "°F"}<p> 
        <p>${"Humidity: " + response.main.humidity + "%"}<p> 
        <p>${"Wind Speed: " + response.wind.speed + " MPH"}<p> 
            </div>`
        );
        $("#currentWeather").append(currentWeatherData);
       

        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lat;
        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function (uvresponse) {
            console.log(uvresponse)
            uvIndex = $("<p>").text("UV Index: " + uvresponse.value );
            $(currentWeatherData).append(uvIndex);

        });
    })

    $.ajax({
        url: queryUrlForcast,
        method: "GET",
    }).then(function(response){
        console.log(response);
        $("#fiveDay").empty();
        for (let i = 0; i < response.list.length; i++) {
            if (response.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                var newCard = $("<div>").attr("class", "card");
                newCard.append($("<h3>").text(moment(response.list[i].dt, "X").format("MMM Do")));
                newCard.append($("<img>").attr("src", "https://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png"));
                newCard.append($("<p>").attr("class", "card-text").html("Temp: " + (Math.floor((response.list[i].main.temp - 273.15) * 1.80 + 32)) + "°F"));
                newCard.append($("<p>").attr("class", "card-text").text("Humidity: " + response.list[i].main.humidity + "%"));

                $("#fiveDay").append(newCard);
            }
        }
    })

}



// event listeners 
// $("#searchButton").on("click", weatherForcast)
// $("#cityStateList").on("click", previousCities)
$("#searchButton").on("click", searchAndSave)
$("#clearSearch").on("click", clearCityStateList)

