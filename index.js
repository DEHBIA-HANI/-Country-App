const countriesContenaire = document.querySelector(".countries-container");
const btnSort = document.querySelectorAll(".btnSort");

let sortMethod = "maxToMin";

let countriesData = [];

async function fetchCountries() {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => (countriesData = data));
  console.log(countriesData);
}

function countriesDisplay() {
  countriesContenaire.innerHTML = countriesData
    .filter((country) =>
      country.translations.fra.common
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    )
    .sort((a, b) => {
      if (sortMethod === "maxToMin") {
        return a.population - b.population;
      } else if (sortMethod === "minToMax") {
        return b.populaire - a.populaire;
      } else if (sortMethod === "alpha") {
        return a.translations.fra.common.localeCompare(
          b.translations.fra.common
        );
      }
    })
    .slice(0, inputRange.value)
    .map(
      (country) =>
        `
    <div class="card">
     <img src="${country.flags.svg}" alt="drapeau ${
          country.translations.fra.common
        } ">
    <h3>${country.translations.fra.common}</h3>
    <h4>${country.capital}</h4>
    <p>Population : ${country.population.toLocaleString()}</p>

    </div>
      
    `
    )
    .join("");
}
window.addEventListener("load", fetchCountries());
inputSearch.addEventListener("input", countriesDisplay);
inputRange.addEventListener("input", () => {
  countriesDisplay();
  rangeValue.textContent = inputRange.value;
});

btnSort.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    sortMethod = e.target.id;
    countriesDisplay();
  });
});
// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays
