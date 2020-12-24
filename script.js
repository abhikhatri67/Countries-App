const countryContainerEl = document.querySelector(".countries-container");
const regionSelectorEl = document.querySelector(".region-selector");
const darkModeBtnEl = document.querySelector(".btn-dark-mode");

countryContainerEl.addEventListener("click", onClickCountry);
darkModeBtnEl.addEventListener("click", toggleDarkMode);

let countries = [];
let regions = [];

function initTheme() {
  let isDarkMode = getItem("darkMode");
  changeTheme(isDarkMode);
}

async function init() {
  countries = await getCountries();
  regions = getRegionsFromCountries(countries);
  renderRegions(regions);
  renderCountries(countries);
}

async function getCountries() {
  const resp = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await resp.json();

  return countries;
}

function getRegionsFromCountries(countries) {
  const regions = countries.map((country) => country.region);
  return Array.from(new Set(regions));
}

function renderCountries(countries) {
  countryContainerEl.innerHTML = "";
  const fragment = document.createDocumentFragment();

  countries.forEach((country) => {
    const countryCardEl = document.createElement("div");
    countryCardEl.classList.add("country-card");

    countryCardEl.innerHTML = `
        <div class="card-header">
          <img class="flag-img" src="${country.flag}" alt="" />
        </div>
        <div class="card-content">
          <div class="country-name">${country.name}</div>
          <div class="capital">Capital: ${country.capital}</div> 
          <div class="population">Population: ${country.population.toLocaleString()}</div> 
        </div>
  `;

    fragment.appendChild(countryCardEl);
  });

  countryContainerEl.appendChild(fragment);
}

function renderRegions(regions) {
  regions.forEach((region) => {
    const option = document.createElement("option");
    option.innerText = region;
    regionSelectorEl.appendChild(option);
  });
}

function filterCountries(event) {
  const value = event.target.value.toLowerCase();
  const filterCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(value)
  );
  renderCountries(filterCountries);
}

function filterCountriesByRegion(event) {
  const value = event.target.value;
  const filteredCountries = countries.filter(
    (country) => country.region === value
  );
  renderCountries(filteredCountries);
}

function onClickCountry(event) {
  const countryCard = event.target.closest(".country-card");
  const country = countryCard.querySelector(".country-name").innerText;

  location.href = `/country/country.html?country=${country}`;
}

function toggleDarkMode() {
  darkModeBtnEl.classList.toggle("active");
  const isDarkMode = darkModeBtnEl.classList.contains("active");
  setItem("darkMode", isDarkMode);
  changeTheme(isDarkMode);
}

function changeTheme(isDarkMode) {
  const filterCountriesEl = document.querySelector(".filter-countries");

  const body = document.body;
  const header = document.querySelector(".header");

  body.style.color = isDarkMode ? "hsl(0, 0%, 100%)" : "hsl(200, 15%, 8%)";
  body.style.backgroundColor = isDarkMode
    ? "hsl(207, 26%, 17%)"
    : "hsl(0, 0%, 98%)";
  header.style.backgroundColor = isDarkMode
    ? "hsl(209, 23%, 22%)"
    : "hsl(0, 0%, 94%)";
  filterCountriesEl.style.backgroundColor = isDarkMode
    ? "hsl(209, 23%, 22%)"
    : "hsl(0, 0%, 98%)";
  regionSelectorEl.style.backgroundColor = isDarkMode
    ? "hsl(209, 23%, 22%)"
    : "hsl(0, 0%, 98%)";
  darkModeBtnEl.style.color = isDarkMode ? "white" : "black";
}

function setItem(key, value) {
  localStorage.setItem(key, value);
}

function getItem(key) {
  return JSON.parse(localStorage.getItem(key));
}

initTheme();
init();
