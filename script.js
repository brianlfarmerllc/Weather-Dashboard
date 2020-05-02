// variable to hold the list of cities in search
var savedCitiesList;
if (localStorage.savedCitiesList === undefined) {
    savedCitiesList = [];
} else {
    savedCitiesList = JSON.parse(window.localStorage.savedCitiesList);
}


// This function handles the event of adding a city to the savedCitiesList array
function searchAndSave(event) {
    if ($("#cityStateInput").val() !== "") {
        event.preventDefault();
        var newCity = $("#cityStateInput").val();
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

function weatherForcast(newCity) {
    console.log(newCity);
}



// event listeners 
$("#searchButton").on("click", searchAndSave)
$("#clearSearch").on("click", clearCityStateList)

