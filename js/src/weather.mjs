// state
let state = localStorage.getItem("weatherState");

// utils
const API_KEY = "2a12527f777b1cbb783fcf5604ac51ae";
const needForecast = true ? "" : "daily";
const unitSetting = true ? "metric" : "imperial";
const icons = {
  "clear sky": "B",
  "few clouds": "H",
  "overcast clouds": "Y",
  "scattered clouds": "N",
  "broken clouds": "Y",
  "shower rain": "T",
  "heavy intensity rain": "R",
  rain: "Q",
  thunderstorm: "0",
  snow: "U",
  mist: "M",
  "moderate rain": "R",
  // "C":'*',
  // "F":'+',
};

// templates
const Template = (function () {
  function Template() {
    this.$layoutWeather = document.getElementById("layout-weather");
    this.$selectedAndForecast = document.createElement("selected-and-forecast");
    document.querySelector(".current").after(this.$selectedAndForecast);
  }

  Template.prototype.current = () => {
    this.$layoutWeather.innerHTML = `
          <section class="current">
            <div class="summary">
              <div class="icon">${icons[state.current.description]}</div>
              <div class="stats">${state.current.temp}°</div>
            </div>
            <div class="location">${state}</div>
          </section>`;
  };
  Template.prototype.selected = (loc, status, icon, stats) => {
    this.$selectedAndForecast.innerHTML = `
          <section class="selected">
            <div class="selected-location"></div>
            <div class="selected-status"></div>
            <div class="selected-summary">
              <span class="selected-icon"></span>
              <span class="selected-stats">°</span>
            </div>
          </section>`;
  };
  Template.prototype.forecast = () => {
    this.$selectedAndForecast`<section class="forecast">
            <ul class="forecast-list">
              <li class="forecast-item">
                <div class="item-name">${state}</div>
                <span class="item-icon">${state}</span>
                <span class="item-temp-high">${state}°</span>
                <span class="item-temp-low">${state}°</span>
              </li>
            </ul>
          </section>`;
  };

  //   <section class="selected-and-forecast">

  // </section>

  return Template();
})();
const template = new Template();

// functions
const render = () => {
  template.current();
  template.selected();
  template.forecast();
};

const setState = (current, daily) => {
  localStorage.setItem(
    "weatherState",
    JSON.stringify({
      current: {
        dt: current.dt,
        temp: current.temp,
        description: current.weather[0].description,
        mainly: current.weather[0].main,
      },
      days: daily.slice(0, 4),
      timezone,
    })
  );
};

const getData = async () => {
  const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${37.5326}&lon=${127.024612}&exclude=hourly${needForecast}&appid=${API_KEY}&units=${unitSetting}`;

  const response = await fetch(URL).catch((e) => {
    console.log(new Error(e));
  });
  const data = await response.json();
  const { current, daily, timezone } = data;

  setState(current, daily, timezone);
};

export const initWeather = async () => {
  if (!state) await getData();
  render();
};