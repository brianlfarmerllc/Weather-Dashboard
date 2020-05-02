// variable to hold the list of cities in search
var currentDate = moment().format('l');
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
    console.log(queryUrl);

    $.ajax({
        url: queryUrlCurrent,
        method: "GET",
    }).then(function (response) {
        $("#currentWeather").empty()
        var iconCode = (response.weather[0].icon);
        var iconurl = "http://openweathermap.org/img/w/" + iconCode + ".png";

        var currentWeatherData = $(
            `<div>
        <h1>${response.name + " " + currentDate} <img src="${iconurl}"> <h1> 
        <p>${"Temperature: " + (Math.floor((response.main.temp - 273.15) * 1.80 + 32)) + "°F"}<p> 
        <p>${"Humidity: " + response.main.humidity + "%"}<p> 
        <p>${"Wind Speed: " + response.wind.speed + " MPH"}<p> 
        <p>${"UV Index: "}<p> 
            </div>`
        )

        $("#currentWeather").append(currentWeatherData)
    })

}



// event listeners 
// $("#searchButton").on("click", weatherForcast)
$("#searchButton").on("click", searchAndSave)
$("#clearSearch").on("click", clearCityStateList)

