// On exporte des variables communes à plusieurs fichiers JS du projet
export const baseApiUrl = "https://restcountries.com/v3.1";
export const storageKey = 'allCountries';
export let allCountries = null;

// On récupère les données sur tous les pays depuis une API
// On stocke ces données dans le sessionStorage afin de ne pas ré-appeler l'API
function getAllCountries() {
  allCountries = JSON.parse(sessionStorage.getItem(storageKey));
  if(!allCountries) {
    fetch(baseApiUrl + '/all')
    .then(res => res.json())
    .then(data => {
      sessionStorage.setItem(storageKey, JSON.stringify(data));
      allCountries = data;
    })
  }
}
getAllCountries();