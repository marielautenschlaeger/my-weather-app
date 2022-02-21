let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let humidityElement= document.querySelector("#humidity");
let windElement=document.querySelector("#wind");
let dateElement = document.querySelector("#date");
let iconElement= document.querySelector("#current-weather-icon");
dateElement.innerHTML = `${day}, ${hours}:${minutes}`;

function displayForecast () {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML= `<div class="row">`;
  let days = ["Thu", "Fri", "Sat"];
  days.forEach (function (day) {

  forecastHTML=   forecastHTML+ 
  `
                <div class="col-2,5">
                    <div class="card-body">
                        <h5 class="card-title">${day}</h5>
                        <div class="row">
                            <div class="col">
                                <img src="VISUALS/cloudy.png" class="weather-icon" alt="cloud" width="30px">
                            </div>
                            <div class="col"> 
                                13°C 
                            </div>
                        </div>
                    </div>
                    </div> 
                    `;
                    });              

  forecastElement.innerHTML=forecastHTML +`</div>`;
  forecastElement.innerHTML= forecastHTML;
                  }





function showWeather(response) {
  document.querySelector("#city-replace").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  windElement.innerHTML=Math.round(response.data.wind.speed);
  humidityElement.innerHTML= response.data.main.humidity;
    iconElement.setAttribute(
      "src",
 `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
 );  
 
 celsiusTemperature= response.data.main.temp;
}

function searchCity(city) {
  let apiKey = "5ac08486b98ea5cc5b0828ea3fdae030";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function sendForm(event) {
  event.preventDefault();
  let city = document.querySelector("#typed-city").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", sendForm);

let celsiusTemperature = null;


function displayFahrenheitTemperature (event){
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature*9)/5 +32;
  let temperatureElement = document.querySelector ("#temperature");
  temperatureElement.innerHTML= Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
  event.preventDefault();
  let temperatureElement = document.querySelector ("#temperature");
  temperatureElement.innerHTML= Math.round(celsiusTemperature);

}

let fahrenheitLink = document.querySelector ("#fahrenheit-link")
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature)

let celsiusLink= document.querySelector ("#celsius-link");
celsiusLink.addEventListener ("click", displayCelsiusTemperature);


searchCity("Paris");
displayForecast();