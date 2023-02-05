const tbody = document.querySelector(".usersBody");
const currentUser = tbody.id;

// On ajoute une classe active au clic pour montrer à l'utilisateur le mode sélectionné
const gameModes = document.querySelectorAll('.game-mode');
gameModes.forEach(mode => {
  mode.addEventListener('click', () => {
    // On enlève la classe de l'ancien mode et on la met sur le nouveau
    const currentActiveMode = document.querySelector('.active-mode');
    if(currentActiveMode !== mode) {
      currentActiveMode.classList.remove('active-mode');
      mode.classList.add('active-mode');

      getRanking();
    }
  })
})

/**
 * Fait une requête pour obtenir le classement des joueurs dans le mode de jeu sélectionné
*/
function getRanking() {
  fetch(`../../model/getRanking.php?gameMode=${getGameMode()}`)
  .then(res => res.json())
  .then(datas => {
    createRankingTable(datas);
  })
  .catch(err => console.error('Erreur getRanking: ' + err))
}
getRanking();

/**
 * Récupère l'info du mode de jeu puis ajoute "Score" à ce dernier
 * Sert pour les appels à la base de donnée
*/
function getGameMode() {
  const currentMode = document.querySelector('.active-mode').id;
  return currentMode + 'Score';
}

/**
 * Rempli le tableau du classement avec les données de la BDD
 * @param {[]} datas Tableau contenant les résultats
*/
function createRankingTable(datas) {
  // Vide le tableau de ces anciennes valeurs afin d'afficher les nouvelles
  while(tbody.lastChild) {
    tbody.removeChild(tbody.lastChild);
  }

  // Affiche les nouvelles valeurs
  for(let i = 0; i < datas.length; i++) {
    const user = datas[i];

    const tr = document.createElement("tr");
    if(user.pseudo === currentUser) {
      tr.classList.add('current-user-row');
    }
    
    const classementTd = document.createElement('td');
    classementTd.textContent = i+1;
    tr.appendChild(classementTd);

    const pseudoTd = document.createElement("td");
    pseudoTd.textContent = user.pseudo;
    tr.appendChild(pseudoTd);
    
    const scoreTd = document.createElement("td");
    scoreTd.textContent = user[getGameMode()];
    tr.appendChild(scoreTd);
    
    tbody.appendChild(tr);
  }
}