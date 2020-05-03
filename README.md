# Farmer's Almanac - Weather Edition

As a traveler I wanated to see the weather outlook for multiple cities so that I can plan my trip accordingly. There are numerious websites out there where I can look up weather data but I wanted a travel specific app that I could save to my bookmarks tab in my browser. One that can I can use to seach for any US city and store a list of those cities to acces current and forcast info at a later time. So that's what I created, and its completly free to use. 

## Here's how it works

If you are using the application for the first time, you will be directed to a landing page with a search box where you can enter a city and state. It's important to follow the format displayed in the input box of (City, State) because this is the format that the is recognized by the application. 

Once you enter the first (City, State) into the input box click the #Get Weather button. The application will then use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for that city. The application then uses the retrived data to dynamically update the HTML and CSS of the in browser weather dashboard utilizing  javascript and jQuery functionality. The weather dashboard now will display the Name of City along with with the current Temperature, Humidity, Windspped, and UV index. The UVIndex also utilizes a color code system to display the severity of the UV Index Value.

UV Index Color Code:
Green: Low
Yellow: Moderate
Orange: High
Red: Very High
Violet: Extreme

The weather dashboard also generates a easy to digest 5 day forcast for the city below the current weather info. The 5 day forecast  displays the forcast Date, Weather Icon, Temperature, and Humidity. 

Each city you search automatically gets saved to a search history list of cities for ease of access. Clicking on any city in this list generates the same function as its initial search. Utilizing this feature you can create a list of cities  before your trip and have quick updated acces to the weather info at anypoint. The data is stored in local storage so closing the browser or refreshing the page wil not erase the list. This way you will always have access to your saved data until you wish to clear it.

After the trip, or if your itenary changes during your trip, quickly clear the list by clicking the #Clear History button. This will clear your list of cities so you can create a fresh one. Don't worry though accidently clicking the button will not automatically clear out you list. You will be asked to verify your decision before the list is cleared. If you do not wish to clear just select cancel.

The following image demonstrates the application functionality:

![weather dashboard function](./Assets/Farmers-Weather-Dashboard.gif)

## Technologies Used
- jQuery and javascript - Used for event listeners of parent and childeren elements as well as to store and recall those varible in local storage. Used to dynamically change html and display current day and date.
- momentjs - Used to pull current date and local time.
- Bootstrap - Used to pull existing html and CSS for creating resposive organizational structer and styling for the site.
- HTML - Used to create parent elements on the DOM.
- CSS - Styles html elements on page.
- GitHub - Hosts repository that can be deployed to GitHub Pages.