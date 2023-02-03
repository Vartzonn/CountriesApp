import { allCountries } from '../../include/global.js';

const questionContainer = document.querySelector('.question-container');
const questionItem = document.querySelector('.question-item');
const questionLoader = document.querySelector('.question-loader');
const answersBtn = document.querySelectorAll('.answer');
const scoreSpan = document.querySelector('.score');
const bestScoreSpan = document.querySelector('.best-score');
let scoreNumber = 0;
let bestScoreNumber = parseInt(bestScoreSpan.textContent);
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

      // On remet le score à 0
      setScores(false);

      // On récupère le meilleur score du mode de jeu choisi afin de l'afficher
      getBestScore();
      
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

/**
 * Question sur les drapeaux
*/ 
function askFlag() {
  clearQuestionItem();

  generateAnswers();

  const questionDiv = document.querySelector('.question');
  questionDiv.style.backgroundImage = `url(${goodCountry.flags.svg})`;
  
  clearLoader();
}

/**
 * Question sur les pays
*/
function askCountry() {
  clearQuestionItem();

  generateAnswers();

  const questionDiv = document.querySelector('.question');
  questionDiv.textContent = goodCountry.translations.fra.common;

  clearLoader();
}

/**
 * Question sur les capitales
*/
function askCapital() {
  clearQuestionItem();

  generateAnswers();
  
  const questionDiv = document.querySelector('.question');
  questionDiv.textContent = goodCountry.translations.fra.common;

  clearLoader();
}

/**
 * Affiche toutes les réponses sur les boutons
*/
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
answersBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    // On disabled les boutons pour ne pas pouvoir répondre plusieurs fois d'affilé
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

      setScores(true);

      newQuestionAfterResponse(func, btn, true)
    }
    else {
      btn.classList.add('btn-danger');

      toggleClassesOnRightBtn();

      setScores(false);

      newQuestionAfterResponse(func, btn, false)
    }
  })
})

/**
 * On réajuste les scores à chaque réponse
 * Si le score est supérieur au meilleur score du joueur, on met le nouveau score dans la bdd
 * @param {boolean} isGoodAnswer si la réponse est bonne on ajoute 1 au score, sinon on passe le score à 0
*/
function setScores(isGoodAnswer) {
  if(isGoodAnswer) {
    scoreNumber++;
    scoreSpan.textContent = scoreNumber;

    if(scoreNumber > bestScoreNumber) {
      bestScoreNumber = scoreNumber;
      bestScoreSpan.textContent = bestScoreNumber;

      // Ajout du nouveau meilleur score dans la bdd
      fetch(`../../model/setScores.php?gameMode=${getGameMode()}&score=${bestScoreNumber}`)
      .catch(err => console.log(err))
    }
  }
  else {
    scoreNumber = 0;
    scoreSpan.textContent = scoreNumber;
  }
}

/**
 * On fait apparaitre une nouvelle question après un setTimeout,
 * On retire/ré-ajoute les classes nécessaires sur les boutons
 * @param {Function} newQuestionFunc 
 * @param {HTMLButtonElement} btn 
 * @param {boolean} isGood
*/
const seeResponseTimer = 300;
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

  }, isGood ? seeResponseTimer : (seeResponseTimer + 500))
}

function toggleClassesOnRightBtn() {
  for(let i = 0; i < answersBtn.length; i++) {
    if(answersBtn[i].id == allCountries.indexOf(goodCountry)) {
      answersBtn[i].classList.toggle('btn-success');
      answersBtn[i].classList.toggle('btn-outline-primary');
    }
  }
}

/**
 * Récupère un pays aléatoire
*/
function getRandomCountry() {
  const randomNumber = Math.floor(Math.random() * allCountries.length);
  return allCountries[randomNumber];
}

/**
 * Enlève l'ancienne question et on recrée une div pour en remettre une autre
*/
function clearQuestionItem() {
  questionLoader.classList.add(activeClass);
  while(questionItem.lastElementChild !== questionLoader) {
    questionItem.removeChild(questionItem.lastElementChild);
  }
  createQuestionDiv();
}

/**
 * Crée une div qui contiendra la question
*/
function createQuestionDiv() {
  const newDiv = document.createElement('div');
  newDiv.classList.add('question');
  questionItem.appendChild(newDiv);
}

/**
 * Insère la bonne réponse aléatoirement dans les réponses
 * @returns {Array}
*/
function pushRandomIndex() {
  let randomIndex = Math.floor(Math.random() * answerArray.length);
  answerArray.splice(randomIndex, 0, goodCountry);

  return answerArray;
}

/**
 * Enlève le loader
*/
function clearLoader() {
  setTimeout(() => {
    questionLoader.classList.remove(activeClass);
  }, 50)
}

/**
 * Récupère l'info du mode de jeu puis ajoute "Score" à ce dernier
 * Cela sert pour les appels à la base de donnée 
*/
function getGameMode() {
  const currentMode = document.querySelector('.active-mode').id;
  return currentMode + 'Score';
}

/**
 * Récupère depuis la bdd le meilleur score du joueur dans le mode de jeu choisi
*/
function getBestScore() {
  fetch(`../../model/getBestScore.php?gameMode=${getGameMode()}`)
  .then(res => res.text())
  .then(data => {
    bestScoreNumber = parseInt(data);
    bestScoreSpan.textContent = data;
  })
  .catch(err => console.error("GetBestScore error " + err))
}
getBestScore();