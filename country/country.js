const overallContainerEl = document.querySelector(".overall-container");
const titleEl = document.querySelector("title");
const darkModeBtnEl = document.querySelector(".btn-dark-mode");

darkModeBtnEl.addEventListener("click", toggleDarkMode);

let countryName = "";

function initTheme() {
  let isDarkMode = getItem("darkMode");
  changeTheme(isDarkMode);
}

async function getCountryDetails(country) {
  const resp = await fetch(
    `https://restcountries.eu/rest/v2/name/${country.toLowerCase()}?fullText=true`
  );
  const details = await resp.json();

  return details;
}

async function initCountry() {
  const country = window.location.search.split("=")[1];
  const details = await getCountryDetails(country);

  // Update title here.
  titleEl.innerText = details[0].name;

  renderCountry(details);
}

function renderCountry(countryDetails) {
  const country = countryDetails[0];

  const fragment = document.createDocumentFragment();
  overallContainerEl.innerHTML += `<div class="country-container">
        <div class="flag-container">
          <img src="${country.flags.svg}" alt="" />
        </div>
        <div class="country-content">
          <h1>${country.name.common}</h1>
          <div class="info-lists">
            <ul>
              <li><strong>Native Name:</strong> ${country.nativeName}</li>
              <li><strong>Population:</strong> ${country.population}</li>
              <li><strong>Region:</strong> ${country.region}</li>
              <li><strong>Sub Region:</strong> ${country.subregion}</li>
              <li><strong>Capital:</strong> ${country.capital}</li>
            </ul>
            <ul>
              <li><strong>Top Level Domain:</strong> </li>
              <li><strong>Currencies:</strong> Belgie</li>
                <li><strong>Languages:</strong>
                  ${country.languages.map((lang) => lang.name).join(", ")}
                </li>
            </ul>
          </div>

          <div class="info-border-countries">
            <div>
              <strong>Border Countries:</strong>
            </div>
            <div class="border-button-container">
              ${country.borders.map(
                (border) => `<button class="btn">${border}</button>`
              )}
            </div>
          </div>
        </div>
      </div>
  `;
}

function toggleDarkMode() {
  darkModeBtnEl.classList.toggle("active");
  const isDarkMode = darkModeBtnEl.classList.contains("active");
  setItem("darkMode", isDarkMode);
  changeTheme(isDarkMode);
}

function changeTheme(isDarkMode) {
  const body = document.body;
  const header = document.querySelector(".header");

  body.style.color = isDarkMode ? "hsl(0, 0%, 100%)" : "hsl(200, 15%, 8%)";
  body.style.backgroundColor = isDarkMode
    ? "hsl(207, 26%, 17%)"
    : "hsl(0, 0%, 98%)";
  header.style.backgroundColor = isDarkMode
    ? "hsl(209, 23%, 22%)"
    : "hsl(0, 0%, 94%)";
}

function setItem(key, value) {
  localStorage.setItem(key, value);
}

function getItem(key) {
  return JSON.parse(localStorage.getItem(key));
}

initTheme();
initCountry();
