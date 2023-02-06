const tbody = document.querySelector(".usersBody");

function getUsers() {
  fetch('../../model/getUsers.php')
  .then(res => res.json())
  .then(datas => {
    fillAdminTable(datas);
  })
  .catch(err => console.log('Erreur getUsers: ' + err))
}
getUsers();

/**
 * Rempli le tableau d'admin avec les données
*/
function fillAdminTable(datas) {
  // Vide le tableau de ces anciennes valeurs afin d'afficher les nouvelles
  while(tbody.lastChild) {
    tbody.removeChild(tbody.lastChild);
  }

  // Affiche les nouvelles valeurs
  for(let i = 0; i < datas.length; i++) {
    const user = datas[i];

    const tr = document.createElement("tr");

    // On boucle sur l'objet pour ajouter toutes les cellules du tableau
    for (let property in user) {
      const newTd = document.createElement('td');
      newTd.textContent = user[property];
      tr.appendChild(newTd);
    }

    const editTd = document.createElement('td');
    editTd.innerHTML = `
      <button class="btn btn-primary edit-user-btn" id=${user.pseudo}>
        <i class="fa-solid fa-pen"></i>
      </button>
      <button class="btn btn-danger delete-user-btn" id=${user.pseudo}>
        <i class="fa-solid fa-trash"></i>
      </button>
    `;
    tr.appendChild(editTd);

    tbody.appendChild(tr);
  }

  addBtnEventListener();
}

/**
 * Ajoute les eventListener sur les boutons du tableau
*/
function addBtnEventListener() {
  const editUserBtns = document.querySelectorAll('.edit-user-btn');
  editUserBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      console.log('edit user ' + btn.id);
    })
  })

  const deleteUserBtns = document.querySelectorAll('.delete-user-btn');
  deleteUserBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // FIXME: Ajouter popup de confirmation pour supprimer un user
      deleteUser(btn.id);

      // Retire la ligne du tableau
      const trRemoved = btn.parentElement.parentElement;
      tbody.removeChild(trRemoved);
    })
  })
}

/**
 * Permet de supprimer un user de la base de donnée
*/
function deleteUser(pseudo) {
  const data = {
    pseudo: pseudo
  }

  fetch(`../../model/deleteUser.php`, {
    method: 'POST',
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(data => {
    console.log(data)
    // FIXME: Message pour préciser que ça a fonctionné
  })
  .catch(err => {
    // FIXME: Message d'erreur
    console.log('Erreur deleteUser: ' + err)
  })
}