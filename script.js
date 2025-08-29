
  const apiKey = "8beadf4d0d3d22f8732f02f533f5c360";
  const searchBox = document.querySelector("#city");
  const searchBtn = document.querySelector(".search img");

  const weatherIcon = document.querySelector(".weather img");
  const temp = document.querySelector(".temp");
  const cityName = document.querySelector(".weather h2");
  const humidity = document.querySelector(".humanity p:first-of-type");
  const wind = document.querySelector(".wind p:first-of-type");

  async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("City not found!");
      }
      const data = await response.json();

      // Update UI
      temp.textContent = Math.round(data.main.temp) + "°C";
      cityName.textContent = data.name;
      humidity.textContent = data.main.humidity + "%";
      wind.textContent = data.wind.speed + " km/h";

      // Change weather icon
      const weatherMain = data.weather[0].main.toLowerCase();
      if (weatherMain.includes("cloud")) {
        weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
      } else if (weatherMain.includes("rain")) {
        weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163657.png";
      } else if (weatherMain.includes("clear")) {
        weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/869/869869.png";
      } else if (weatherMain.includes("snow")) {
        weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/642/642102.png";
      } else {
        weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
      }
    } catch (error) {
      alert(error.message);
    }
  }

  // When click on search icon
  searchBtn.addEventListener("click", () => {
    getWeather(searchBox.value);
  });

  // When press Enter key
  searchBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      getWeather(searchBox.value);
    }
  });

