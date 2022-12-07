import { baseApiUrl, storageKey, allCountries } from '../../include/global.js';

// On attend que allCountries nous renvoie le tableau contenant tous les pays
const interval = setInterval(() => {
  if(allCountries === null) {
    return
  }
  else {
    fillContainer();
    clearInterval(interval);
  }
}, 500)

// On ajoute toutes les cartes pour réviser dans le container
function fillContainer() {
  const reviseContainer = document.querySelector('.revise-container');
  for(let i = 0; i < allCountries.length; i++) {
    reviseContainer.appendChild(createCard(allCountries[i]));
  }
}

// On crée une fonction qui crée une carte pour un pays donné
function createCard(country) {
  const countryName = country.translations.fra.common ? country.translations.fra.common : country.name.common 

  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
    <img 
      src="${country.flags.svg}"
      class="
        card-img-top
        border-bottom
        border-dark
        border-opacity-50
        h-100
      "
      alt="${countryName} flag"
    >
    <div class="card-body">
      <h5 class="card-title">${countryName}</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  `;

  return card;
}