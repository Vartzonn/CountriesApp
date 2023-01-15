import { allCountries } from '../../include/global.js';

const questionContainer = document.querySelector('.question-container');
const questionItem = document.querySelector('.question-item');
const questionLoader = document.querySelector('.question-loader');
const answersBtn = document.querySelectorAll('.answer');
let answerArray = [];
const activeClass = 'question-loader_active';
let goodCountry = getRandomCountry();

// On ajoute une classe active au clic pour montrer à l'utilisateur le mode sélectionné
const gameModes = document.querySelectorAll('.game-mode');
gameModes.forEach(mode => {
  mode.addEventListener('click', () => {
    // On enlève la classe de l'ancien mode et on la met sur le nouveau
    const currentActiveMode = document.querySelector('.active-mode');
    if(currentActiveMode !== mode) {
      currentActiveMode.classList.remove('active-mode');
      mode.classList.add('active-mode');

      // On récupère un pays aléatoire
      goodCountry = getRandomCountry();
      
      // On change la question selon le mode choisi
      const questionTitle = document.querySelector('.question-title');
      switch(mode.id) {
        case 'flag': 
          questionTitle.innerHTML = 'A quel pays appartient ce drapeau ?';
          askFlag();
          break;
        case 'country':
          questionTitle.innerHTML = 'Quel est le drapeau de ce pays ?';
          askCountry();
          break;
        case 'capital':
          questionTitle.innerHTML = 'Quelle est la capitale de ce pays ?';
          askCapital();
          break;
        default:
          questionTitle.innerHTML = 'A quel pays appartient ce drapeau ?';
          askFlag();
          break;
      }
    }
  })
})
askFlag();

// Question sur les drapeaux
function askFlag() {
  clearQuestionItem();

  generateAnswers();

  const questionDiv = document.querySelector('.question');
  questionDiv.style.backgroundImage = `url(${goodCountry.flags.svg})`;
  
  clearLoader();
}

// Question sur les pays
function askCountry() {
  clearQuestionItem();

  generateAnswers();

  const questionDiv = document.querySelector('.question');
  questionDiv.textContent = goodCountry.translations.fra.common;

  clearLoader();
}

// Question sur les capitales
function askCapital() {
  clearQuestionItem();

  generateAnswers();
  
  const questionDiv = document.querySelector('.question');
  questionDiv.textContent = goodCountry.translations.fra.common;

  clearLoader();
}


function generateAnswers() {
  const activeMode = document.querySelector('.active-mode');
  const isFlagMode = activeMode.id === 'flag';
  const isCountryMode = activeMode.id === 'country';
  const isCapitalMode = activeMode.id === 'capital';

  // On ajoute une classe si on joue aux drapeaux
  if(!questionContainer.classList.contains('contain-flag')) {
    if(isFlagMode) {
      questionContainer.classList.add('contain-flag');
    }
  }
  else {
    if(!isFlagMode) {
      questionContainer.classList.remove('contain-flag');
    }
  }

  answerArray = [];

  goodCountry = getRandomCountry();
  // Si on est sur le mode capitale, on vérifie que le pays a bien une capitale
  if(isCapitalMode) {
    while(!goodCountry.capital) {
      goodCountry = getRandomCountry();
    }
  }

  // On stocke 3 mauvaises réponses dans un array
  for(let i = 0; i < 3; i++) {
    let randomWrongAnswer = getRandomCountry();

    if(isCapitalMode) {
      while(!randomWrongAnswer.capital) {
        randomWrongAnswer = getRandomCountry();
      }
    }

    if(randomWrongAnswer == goodCountry || answerArray.includes(randomWrongAnswer)) {
      i--;
    }
    else {
      answerArray.push(randomWrongAnswer);
    }
  }

  answerArray = pushRandomIndex();

  // On met les réponses dans les boutons
  for(let i = 0; i < answerArray.length; i++) {
    answersBtn[i].classList.remove('contain-flag');
    answersBtn[i].style.backgroundImage = 'none';
    answersBtn[i].textContent = '';

    if(isFlagMode) {
      answersBtn[i].textContent = answerArray[i].translations.fra.common;
    }
    else if(isCountryMode) {
      answersBtn[i].classList.add('contain-flag');
      answersBtn[i].style.backgroundImage = `url(${answerArray[i].flags.svg})`;
    }
    else if(isCapitalMode) {
      answersBtn[i].textContent = answerArray[i].capital[0];
    }

    // On met l'id de chaque pays sur le bouton pour vérifier la bonne réponse
    answersBtn[i].id = allCountries.indexOf(answerArray[i]);
  }
}

// Au clique des boutons réponses
const seeResponseTimer = 300;
answersBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    // On disabled les boutons pour ne pas pouvoir répondre plusieurs fois
    answersBtn.forEach(button => {
      button.setAttribute('disabled', true);
    })

    btn.classList.remove('btn-outline-primary');

    let func;
    const activeMode = document.querySelector('.active-mode');
    if(activeMode.id === 'flag') {
      func = askFlag;
    }
    else if(activeMode.id === 'country') {
      func = askCountry;
    }
    else if(activeMode.id === 'capital') {
      func = askCapital;
    }

    // On vérifie si la réponse est bonne
    if(btn.id == allCountries.indexOf(goodCountry)) {
      btn.classList.add('btn-success');

      newQuestionAfterResponse(func, btn, true)
    }
    else {
      btn.classList.add('btn-danger');

      toggleClassesOnRightBtn();

      newQuestionAfterResponse(func, btn, false)
    }
  })
})

// On fait apparaitre une nouvelle question après un setTimeout,
// On retire/ré-ajoute les classes nécessaires sur les boutons
function newQuestionAfterResponse(newQuestionFunc, btn, isGood) {
  setTimeout(() => {
    if(isGood) {
      btn.classList.remove('btn-success');
    }
    else {
      btn.classList.remove('btn-danger');
  
      toggleClassesOnRightBtn();
    }
  
    btn.classList.add('btn-outline-primary');
    newQuestionFunc();

    // On enlève le disabled sur les boutons de réponses
    answersBtn.forEach(button => {
      button.removeAttribute('disabled');
    })

  }, isGood ? seeResponseTimer : (seeResponseTimer + (800 - seeResponseTimer)))
}

function toggleClassesOnRightBtn() {
  for(let i = 0; i < answersBtn.length; i++) {
    if(answersBtn[i].id == allCountries.indexOf(goodCountry)) {
      answersBtn[i].classList.toggle('btn-success');
      answersBtn[i].classList.toggle('btn-outline-primary');
    }
  }
}

// On récupère un pays aléatoire
function getRandomCountry() {
  const randomNumber = Math.floor(Math.random() * allCountries.length);
  return allCountries[randomNumber];
}

// On enlève l'ancienne question et on recrée une div pour en remettre une autre
function clearQuestionItem() {
  questionLoader.classList.add(activeClass);
  while(questionItem.lastElementChild !== questionLoader) {
    questionItem.removeChild(questionItem.lastElementChild);
  }
  createQuestionDiv();
}

// On crée une div qui contiendra la question
function createQuestionDiv() {
  const newDiv = document.createElement('div');
  newDiv.classList.add('question');
  questionItem.appendChild(newDiv);
}

// Pour insérer la bonne réponse aléatoirement dans les réponses
function pushRandomIndex() {
  let randomIndex = Math.floor(Math.random() * answerArray.length);
  answerArray.splice(randomIndex, 0, goodCountry);

  return answerArray;
}

// Pour enlever le loader
function clearLoader() {
  setTimeout(() => {
    questionLoader.classList.remove(activeClass);
  }, 50)
}