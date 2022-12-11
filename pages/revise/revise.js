import { allCountries } from '../../include/global.js';

const frenchContinentTrad = {
  'Europe': 'Europe',
  'Africa': 'Afrique',
  'North America': 'Amérique du Nord',
  'South America': 'Amérique du Sud',
  'Asia': 'Asie',
  'Oceania': 'Océanie',
  'Antarctica': 'Antarctique'
}

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
  const countryName = country.translations.fra.common ? country.translations.fra.common : country.name.common;

  // On vérifie si le pays a une capitale, pour afficher ou non la ligne "Capitale"
  let hasCapital = true;
  if(!country.capital) {
    hasCapital = false;
  }

  // On traduit en français le nom du continent
  const continent = country.continents[0];
  const continentTrad = frenchContinentTrad[continent];

  // On crée la carte du pays
  const card = document.createElement('div');
  card.classList.add('card');
  card.id = countryName;
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
      <h3 class="card-title">${countryName}</h3>
      <ul class="card-text info-list">
        <li>${hasCapital ? `Capitale: ${country.capital[0]}` : 'Pas de capitale'}</li>
        <li>Population: ${country.population.toLocaleString()}</li>
        <li>Continent: ${continentTrad}</li> 
      </ul>
    </div>
  `;

  return card;
}


// Ajout des noms des continents dans le select
const selectContinent = document.querySelector('#select-continent');
for(let continent in frenchContinentTrad) {
  const continentTrad = frenchContinentTrad[continent];
  const option = document.createElement('option');
  option.value = continentTrad;
  option.innerHTML = continentTrad;
  selectContinent.appendChild(option);
}