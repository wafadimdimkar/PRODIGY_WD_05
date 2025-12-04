const API_KEY = "684f0de82d1e37cc25f6adddf003b6d2";

function getWeather() {
  let city = document.getElementById("cityInput").value.trim();
  if (city === "") return alert("Please enter a city name!");

  fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
}

function getLocationWeather() {
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
  });
}

function fetchWeather(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      document.getElementById("weatherBox").style.display = "block";
      document.getElementById("cityName").innerText = data.name;
      document.getElementById("temperature").innerText = Math.round(data.main.temp) + "°C";
      document.getElementById("condition").innerText = data.weather[0].description.toUpperCase();
      document.getElementById("humidity").innerText = data.main.humidity;
      document.getElementById("wind").innerText = data.wind.speed;
      document.getElementById("icon").src = 
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    })
    .catch(() => alert("City not found! Try again."));
}
