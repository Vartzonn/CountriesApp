const baseApiUrl = "https://restcountries.com/v3.1";
const storageKey = 'allCountries';

let allCountries;

function getAllCountries() {
  const datas = sessionStorage.getItem(storageKey);
  if(datas) {
    allCountries = JSON.parse(datas);
  }
  else {
    fetch(baseApiUrl + '/all')
      .then(res => res.json())
      .then(data => {
        sessionStorage.setItem(storageKey, JSON.stringify(data));
        allCountries = data;
      })
  }
}

getAllCountries();
