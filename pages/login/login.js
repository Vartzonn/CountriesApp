// Ajouts d'eventListener sur les boutonns pour retourner la carte
const signUpBtn = document.querySelector('.sign-up-btn');
signUpBtn.addEventListener('click', () => rotateCard(false));
const signInBtn = document.querySelector('.sign-in-btn');
signInBtn.addEventListener('click', () => rotateCard(true));

function rotateCard(isReverse) {
  const loginForms = document.querySelector('.login-forms');

  let degValue = '180deg';
  if(isReverse) {
    degValue = '0deg';
  }

  loginForms.style.transform = `rotateY(${degValue})`;
}

// Ajout d'un eventListener sur le formulaire de login
const loginForm = document.querySelector('.form-login');
const rememberMe = document.querySelector('#rememberMe');
loginForm.addEventListener('submit', () => {
  if(rememberMe.checked) {
    const data = JSON.stringify({
      user: loginForm.pseudo.value,
      pwd: loginForm.password.value
    })
    localStorage.setItem('rememberMe', data)
  }
})


// Fonction d'auto-login quand l'utilisateur a coché "Se souvenir de moi"
function autoLogin() {
  const userDatas = JSON.parse(localStorage.getItem('rememberMe'));

  if(userDatas) {
    if(userDatas.user && userDatas.pwd) {
      loginForm.pseudo.value = userDatas.user;
      loginForm.password.value = userDatas.pwd;
      rememberMe.checked = true;
      
      loginForm.submit();
    }
  }
}
// Si la BDD nous a renvoyé une erreur sur la tentative de connexion on ne fait pas l'autologin
if(window.location.href.includes('err=3')) {
  if(localStorage.getItem('rememberMe')) {
    localStorage.removeItem('rememberMe');
  }
}
else {
  autoLogin();
}