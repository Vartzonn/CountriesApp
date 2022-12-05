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


// Afficher les carousels de drapeaux
const carouselContainers = document.querySelectorAll('.flags-carousel-container');
carouselContainers.forEach(carousel => {
  let startNumber = 0;
  let endNumber = Math.floor(allCountries.length / 2);
  if(carousel === carouselContainers[1]) {
    startNumber = endNumber;
    endNumber = 2*startNumber;
  }

  for(let i = startNumber; i < endNumber; i++) {
    if(allCountries[i].name.common !== 'Nepal') {
      const flag = allCountries[i].flags.svg ? allCountries[i].flags.svg : allCountries[i].flags.png;
      
      const carouselItem = document.createElement('div');
      carouselItem.classList.add('flag-carousel-item');
      carouselItem.style.backgroundImage = `url(${flag})`;
      
      carousel.appendChild(carouselItem);
    }
  }
  carousel.style.opacity = '1';
})