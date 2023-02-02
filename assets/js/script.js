var APIKey = "1e128d5dabf3dcafd12f8a689fd4d644";
var searchBtn = document.querySelector(".btn-primary");
var card = document.querySelector(".card");
var forecastContent = document.querySelector(".forecast");
card.style.display = "none";
forecastContent.style.display = "none";
var input = document.querySelector("#inputCity")
var currentTemp = document.querySelector(".temperature");
var cityName = document.querySelector(".city-name");
var currentHumidity = document.querySelector(".humidity")
var currentWind = document.querySelector(".wind")

function weatherCall(city) {
  card.style.display = "block";
  forecastContent.style.display = "block";
  // FETCH NOW
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      APIKey +
      "&units=imperial"
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      // CITY NAME
      cityName.innerHTML = data.name
      // TEMP
      console.log("Temp:", data.main.temp);
      currentTemp.innerHTML =
        "Temperature: " + Math.floor(data.main.temp) + `&#8457`;
      // HUM
      console.log("Hum:", data.main.humidity);
      currentHumidity.innerHTML = "Humidity: " + Math.floor(data.main.humidity) + "%"
      // WIND SPEED
      console.log("WS", data.wind.speed);
      currentWind.innerHTML = "Wind: " + (data.wind.speed) + "MPH"
      //weather icon
      console.log("icon", data) 

        // FETCH FORECASE
      fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
          city +
          "&appid=" +
          APIKey +
          "&units=imperial"
      ).then(function (res) {
          return res.json()
      })
      .then(function (data) {
        console.log(data);
      });
    });
}

let history = JSON.parse(localStorage.getItem("city")) || []

searchBtn.addEventListener("click", function () {
    var searchValue = input.value 
    weatherCall(searchValue);
    history.push(searchValue)
    localStorage.setItem("city", JSON.stringify(history))
    // call render function
});
localStorage.clear()
// function named render
// loop through history variable
// create an li for each iteration(document.create("li")) in the for loop
// append history[i] t each li
// append the li's to the ul div in HTML
