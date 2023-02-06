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
  card.setAttribute('continent', continentTrad);
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
// Au changement du continent dans le select, on filtre les cartes
let continentFilter = 'all';
selectContinent.addEventListener('change', (ev) => {
  continentFilter = ev.target.value;
  checkFilter();
})

// On crée un regex pour comparer la valeur de l'input avec le nom du pays
let filteredValue = '';
let filteredRegex = new RegExp(filteredValue, 'gi');
// A l'input sur la barre de recherche on filtre les cartes
const filterInput = document.querySelector('#filter-country');
filterInput.addEventListener('input', (ev) => {
  filteredValue = ev.target.value;
  filteredRegex = new RegExp(filteredValue, 'gi');
  checkFilter();
})

// On check les filtres
function checkFilter() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    // On filtre par rapport au continent dans le select
    if(continentFilter !== 'all') {
      if(card.getAttribute('continent') !== continentFilter) {
        card.style.display = 'none';
        card.setAttribute('filtered', 'true');
      }
      else {
        card.style.display = 'flex';
        card.setAttribute('filtered', 'false');
      }
    }
    else {
      card.style.display = 'flex';
      card.setAttribute('filtered', 'false');
    }
    
    // On filtre par rapport à la barre de recherche
    if(card.id.match(filteredRegex)) {
      if(card.getAttribute('filtered') == 'false') {
        card.style.display = 'flex';
      }
    }
    else {
      card.style.display = 'none';
    }
  })
}

// Bouton pour retourner en haut de la page
const scrollTopBtn = document.querySelector('.goToTop');
window.addEventListener('scroll', () => {
  checkScrollTop();
})
scrollTopBtn.addEventListener('click', () => {
  document.body.scrollTop = 0;
  setTimeout(() => {
    scrollTopBtn.style.display = 'none';
  }, 750)
})

// Fonction pour faire apparaitre le bouton pour retourner en haut de la page si on a assez scroll
function checkScrollTop() {
  if(document.body.scrollTop > 50) {
    scrollTopBtn.style.display = 'block';
  }
  else {
    scrollTopBtn.style.display = 'none';
  }
}
checkScrollTop();