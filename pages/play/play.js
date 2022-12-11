// On ajoute une classe active au clic pour montrer à l'utilisateur le mode sélectionné
const gameModes = document.querySelectorAll('.game-mode');
gameModes.forEach(mode => {
  mode.addEventListener('click', () => {
    // On enlève la classe de l'ancien mode et on la met sur le nouveau
    document.querySelector('.active-mode').classList.remove('active-mode');
    mode.classList.add('active-mode');

    // On change la question selon le mode choisi
    const questionTitle = document.querySelector('.question-title');
    switch(mode.id) {
      case 'flag': 
        questionTitle.innerHTML = 'A quel pays appartient ce drapeau ?';
        break;
      case 'country':
        questionTitle.innerHTML = 'Quel est le drapeau de ce pays ?';
        break;
      case 'capital':
        questionTitle.innerHTML = 'Quelle est la capitale de ce pays ?';
        break;
      default:
        questionTitle.innerHTML = 'A quel pays appartient ce drapeau ?';
        break;
    }
  })
})