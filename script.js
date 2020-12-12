const countryContainerEl = document.querySelector(".countries-container");
const regionSelectorEl = document.querySelector(".region-selector");

countryContainerEl.addEventListener("click", onClickCountry);

countries = [];
regions = [];

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
  const filterCountries = countries.filter(
    (country) => country.region === value
  );
  renderCountries(filterCountries);
}

function onClickCountry(event) {
  console.log("event: ", event);
  const countryCard = event.target.closest(".country-card");
  const country = countryCard.querySelector(".country-name").innerText;
  console.log("country: ", country);
  location.href = `/country.html?country=${country}`;
}

async function init() {
  countries = await getCountries();
  regions = getRegionsFromCountries(countries);
  renderRegions(regions);
  renderCountries(countries);
}

init();
