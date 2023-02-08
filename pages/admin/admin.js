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
      if(property === 'isAdmin') {
        const checkBoxInput = document.createElement('input');
        checkBoxInput.classList.add('form-check-input', 'cs-pointer');
        checkBoxInput.disabled = true;
        checkBoxInput.type = 'checkbox';
        checkBoxInput.checked = user[property];
        newTd.appendChild(checkBoxInput);
      }
      else {
        newTd.textContent = user[property];
      }

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
 * 
 * FIXME:
 *  -Ajouter popup de confirmation pour supprimer un user
*/
function addBtnEventListener() {
  const editUserBtns = document.querySelectorAll('.edit-user-btn');
  editUserBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      console.log('edit user ' + btn.id);
      const trSelected = btn.parentElement.parentElement;
      editUser(trSelected, btn.id);
    })
  })

  const deleteUserBtns = document.querySelectorAll('.delete-user-btn');
  deleteUserBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      deleteUser(btn.id);

      // Retire la ligne du tableau
      const trRemoved = btn.parentElement.parentElement;
      tbody.removeChild(trRemoved);
    })
  })
}

/**
 * Permet de modifier un user
 * 
 * FIXME:
 *  -Modif des boutons au bout du tableau pour annuler l'edit ou le confirmer
 *  -Au moment de la confirmation d'edit, envoi dans la BDD
*/
function editUser(trSelected, pseudo) {
  const trChildren = trSelected.children;

  for(let i = 0; i < trChildren.length; i++) {
    const td = trChildren[i];
    const oldValue = td.textContent;

    switch(i) {
      case 0:
      case 7:
        break;
      case 1:
      case 2:
        td.innerHTML = `<input type="text" class="w-50" value="${oldValue}" />`;
        break;
      case 3:
        td.firstElementChild.disabled = false;
        break;
      case 4:
      case 5:
      case 6:
        td.innerHTML = `<input type="number" class="w-25" value="${oldValue}" />`;
        break;
      default:
        td.innerHTML = `<input type="text" class="w-50" value="${oldValue}" />`;
        break;
    }
  }
}

/**
 * Permet de supprimer un user de la base de donnée
 * 
 * FIXME:
 *  -Message pour préciser que ça a fonctionné
 *  -Message d'erreur
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
  })
  .catch(err => {
    console.log('Erreur deleteUser: ' + err)
  })
}