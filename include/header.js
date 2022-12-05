// Quand on clique sur le bouton de déconnexion on enlève les identifiants du localStorage
const logoutBtn = document.querySelector('.logout-btn');
if(logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    if(localStorage.getItem('rememberMe')) {
      localStorage.removeItem('rememberMe');
    }
  });
}

// Quand on clique sur le titre ça nous redirige vers le page d'acceuil
const title = document.querySelector('header .title');
title.addEventListener('click', () => {
  window.location.href = '/ProjetSolo/index.php';
})