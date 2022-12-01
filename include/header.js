// Quand on clique sur le bouton de déconnexion on enlève les identifiants du localStorage
const logoutBtn = document.querySelector('.logout-btn');
if(logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    if(localStorage.getItem('rememberMe')) {
      localStorage.removeItem('rememberMe');
    }
  });
}
