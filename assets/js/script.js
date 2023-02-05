//Variables for current weather
var APIKey = "1e128d5dabf3dcafd12f8a689fd4d644"; 
var searchBtn = document.querySelector(".btn-primary");
var card = document.querySelector(".card");
var forecastContent = document.querySelector(".forecast");
var input = document.querySelector("#inputCity")
var currentTemp = document.querySelector(".temperature");
var cityName = document.querySelector(".city-name");
var currentHumidity = document.querySelector(".humidity")
var currentWind = document.querySelector(".wind")
var weatherIcon = document.querySelector(".icon")
var weatherDescription = document.querySelector(".description")
var currentDate = document.querySelector(".date")
card.style.display = "none";
forecastContent.style.display = "none";

//variables for forecast
var forecastDate = document.querySelector(".date-1")
var forecastIcon = document.querySelector(".icon-1")
var forecastDescription = document.querySelector(".description-1")
var forecastTemperature = document.querySelector(".temperature-1")
var forecastWind = document.querySelector(".wind-1")
var forecastHumidity = document.querySelector(".humidity-1")

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
      // console.log(data);
      //date
      // console.log("date", data.dt)
      // CITY NAME
      cityName.innerHTML = data.name;
      // TEMP
      // console.log("Temp:", data.main.temp);
      currentTemp.innerHTML =
        "Temperature: " + Math.floor(data.main.temp) + `&#8457`;
      // HUM
      // console.log("Hum:", data.main.humidity);
      currentHumidity.innerHTML =
        "Humidity: " + Math.floor(data.main.humidity) + "%";
      // WIND SPEED
      // console.log("WS", data.wind.speed);
      currentWind.innerHTML = "Wind: " + data.wind.speed + "MPH";
      //weather icon
      // console.log("icon", data.weather[0].icon)
      weatherIcon.src =
        "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
      // weather description
      // console.log("description", data.weather[0].main)
      weatherDescription.innerHTML = data.weather[0].main;

      /*  
      currentDate = new Date(data.dt * 1000);
      const day = currentDate.getDate();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      currentDate.innerHTML = "date"(" + month + "/" + day + "/" + year + ") ;
      console.log(day);
      console.log(year);
      console.log(month);
      console.log(currentDate);
      */

      // FETCH FORECAST
      fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
          city +
          "&appid=" +
          APIKey +
          "&units=imperial"
      )
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          // console.log(data)
          for (i = 0; i < data.list.length; i += 8) {
            var weatherData = data.list[i]

            
          }
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
    renderHistories()
});
localStorage.clear()

function renderHistories(){
    // Selecting the UL element
    var ul = document.querySelector(".history")
    for (var i = 0; i < history.length; i++) {
      var cities = history[i]
      // creating li element and adding the text to them
      var cityList = document.createElement('li')
      cityList.classList.add("search-history")
      cityList.textContent = cities
    }

    // Append list to ul element
    ul.appendChild(cityList)
    // return ul
}

