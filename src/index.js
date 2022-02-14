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

searchCity("Paris");
