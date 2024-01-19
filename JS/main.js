let today = document.getElementById("today");
let tomorrow = document.getElementById("tomorrow");
let aftertomorrow = document.getElementById("after-tomorrow");
window.onload = function() {
   today.classList.add("load")
   tomorrow.classList.add("load");
   aftertomorrow.classList.add("load");
}
let weatherData
const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

async function getData(city = "cairo") {
   const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=cbdc8f0add6240bc864134042241801&q=${city}&days=3`);
      const finalResponse = await response.json()
      weatherData = finalResponse;
   
}
// today information selector
const todayDay = document.querySelector("#today #day");
const todayDate = document.querySelector("#today #date");
const todayCity = document.querySelector("#today #city");
const todayDegree = document.querySelector("#today #currentDegree");
const todayWeatherImg = document.querySelector("#today #weatherImg");
const todayWeatherCondition = document.querySelector("#today #Weather-condition");
const todayWeatherHumidity = document.querySelector("#today #humidity");
const todayWeatherWind = document.querySelector("#today #wind");
const todayWeatherWindDir = document.querySelector("#today #wind_dir");

// display toDay information
function toDayWeather(data) {
   let date = new Date()
   todayDay.textContent = daysOfWeek[ date.getDay() ]
   todayDate.textContent = date.getDate() + monthsOfYear[date.getMonth()];
   todayCity.textContent = data.location.name
   todayDegree.textContent = data.current.temp_c;
   todayWeatherImg.setAttribute("src", data.current.condition.icon);
   todayWeatherCondition.textContent = data.current.condition.text;
   todayWeatherHumidity.textContent = data.current.humidity+"%";
   todayWeatherWind.textContent = data.current.wind_kph + "km/h";
   todayWeatherWindDir.textContent = data.current.wind_dir
} 

// tomorrow information selector
const tomorrowDay = document.querySelector("#tomorrow .day-head p");
const tomorrowImg = document.querySelector("#tomorrow .icon img");
const tomorrowMaxDegree = document.querySelector("#tomorrow .max-degree .Degree");
const tomorrowMinDegree = document.querySelector("#tomorrow .min-degree .Degree");
const tomorrowWeatherConditions = document.querySelector("#tomorrow .Weather-conditions");

// display tomorrow information
function tomorrowWeather(data) {
   let date = new Date(data.forecast.forecastday[1].date);
   tomorrowDay.textContent = daysOfWeek[date.getDay()];
   tomorrowImg.setAttribute("src", data.forecast.forecastday[1].day.condition.icon);
   tomorrowMaxDegree.textContent = data.forecast.forecastday[1].day.maxtemp_c;
   tomorrowMinDegree.textContent = data.forecast.forecastday[1].day.mintemp_c;
   tomorrowWeatherConditions.textContent = data.forecast.forecastday[1].day.condition.text;
}

// after tomorrow information selector
const aftertomorrowDay = document.querySelector("#after-tomorrow .day-head p");
const afterTomorrowImg = document.querySelector("#after-tomorrow .icon img");
const aftertomorrowMaxDegree = document.querySelector(
  "#after-tomorrow .max-degree .Degree"
);
const aftertomorrowMinDegree = document.querySelector(
  "#after-tomorrow .min-degree .Degree"
);
const aftertomorrowWeatherConditions = document.querySelector(
  "#after-tomorrow .Weather-conditions"
);

// display after tomorrow information
function afterTomorrowWeather(data) {
   let date = new Date(data.forecast.forecastday[2].date);
   aftertomorrowDay.textContent = daysOfWeek[date.getDay()];
   afterTomorrowImg.setAttribute(
     "src",
     data.forecast.forecastday[2].day.condition.icon
   );
   aftertomorrowMaxDegree.textContent =
     data.forecast.forecastday[2].day.maxtemp_c;
   aftertomorrowMinDegree.textContent =
     data.forecast.forecastday[2].day.mintemp_c;
   aftertomorrowWeatherConditions.textContent =
     data.forecast.forecastday[2].day.condition.text;
}
async function start(city) {
   await getData(city)
   if (!weatherData.error) {
     toDayWeather(weatherData)
     tomorrowWeather(weatherData);
     afterTomorrowWeather(weatherData);
   }
}

start("cairo")

// Search input
const searchCity = document.getElementById("searchCity");

searchCity.oninput = function() {
   start(this.value);

}

const userLocationBtn = document.getElementById("userLocation");
userLocationBtn.onclick = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(callBack);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }

}

function callBack(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  start(latitude + "," + longitude);
}
