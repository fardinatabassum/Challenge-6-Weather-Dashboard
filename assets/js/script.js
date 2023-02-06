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

          var cardGroup = document.querySelector(".card-group")
          cardGroup.innerHTML = "" //TO remove duplication

          for (i = 0; i < data.list.length; i += 8) {
            var forecastData = data.list[i]
            // console.log(data)

            var forecastTimeString = forecastData.dt_txt

            var forecastTime = forecastTimeString.split(" ")[0]

            //Create forecast-card div
            var forecastCard = document.createElement("div")
            forecastCard.classList.add(".forecast-card")

            //Create card div
            var forecastBody = document.createElement("div")
            forecastBody.classList.add(".card-body")
            
            // HEADER
            //Create header element
            var forecastHeader = document.createElement("h3")
            forecastHeader.classList.add("date-1")
            forecastHeader.innerText = forecastTime

            //Create IMAGE
            var forecastImage = document.createElement("img")
            forecastImage.classList.add("icon-1")
            forecastImage.src = "http://openweathermap.org/img/wn/" + forecastData.weather[0].icon + ".png";

            //Creating Li
            var forecastList1 = document.createElement("li")
            var forecastList2 = document.createElement("li")
            var forecastList3 = document.createElement("li")
            var forecastList4 = document.createElement("li")

            //Description
            forecastList1.classList.add(".description-1")
            forecastList1.innerText = forecastData.weather[0].description

            //Temperature
            forecastList2.classList.add(".temperature-1");
            forecastList2.innerText = "Temperature: " + Math.floor(forecastData.main.temp) + '\u2109'; 

            //Wind
            forecastList3.classList.add("wind-1")
            forecastList3.innerText = "Wind: " + forecastData.wind.speed + " MPH"

            //Humidity
            forecastList4.classList.add("humidity-1");
            forecastList4.innerText = "Humidity: " + Math.floor(forecastData.main.humidity) + " %";
            

            // APPENDIND TO DIV
            // UL Div
            var forecastUl = document.createElement("ul")
            forecastUl.classList.add("list-unstyled")
            forecastUl.appendChild(forecastImage)
            forecastUl.appendChild(forecastList1)
            forecastUl.appendChild(forecastList2)
            forecastUl.appendChild(forecastList3)
            forecastUl.appendChild(forecastList4)
            

            //Append header to card-body
            forecastBody.appendChild(forecastHeader)
            forecastBody.appendChild(forecastUl)


            //Apppend to forecast-card
            forecastCard.appendChild(forecastBody)

            var cardGroup = document.querySelector(".card-group")
            cardGroup.appendChild(forecastCard)

          }

        })
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

