// Toast
const alertToast = document.getElementById('alertToast');
const toastBody = document.querySelector('.toast-body');

const tbody = document.querySelector(".usersBody");
let targetedDeletePseudo = '';

const addUserBtn = document.querySelector('.addUserBtn');

const confirmDeleteUserBtn = document.querySelector('.confirm-delete-user');
confirmDeleteUserBtn.addEventListener('click', () => {
  deleteUser();
})

function getUsers() {
  fetch('../../model/getUsers.php')
  .then(res => res.json())
  .then(datas => {
    fillAdminTable(datas);
  })
  .catch(() => {
    toggleToast(true, 'Une erreur est survenue lors de la récupération des utilisateurs.')
  })
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
      <button class="btn btn-danger delete-user-btn" id=${user.pseudo} data-bs-toggle="modal" data-bs-target="#deleteUserModal">
        <i class="fa-solid fa-trash"></i>
      </button>
      <button class="btn btn-primary confirm-edit-user-btn d-none" id=${user.pseudo}>
        <i class="fa-solid fa-check"></i>
      </button>
      <button class="btn btn-danger cancel-edit-user-btn d-none" id=${user.pseudo}>
        <i class="fa-solid fa-xmark"></i>
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
      const tdSelected = btn.parentElement;
      const trSelected = tdSelected.parentElement;
      toggleEditBtns(tdSelected);
      editUser(trSelected, false);
    })
  })

  // On affiche la modal de confirmation
  const deleteUserBtns = document.querySelectorAll('.delete-user-btn');
  deleteUserBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalPseudo = document.querySelector('.deleteUserModal-pseudo');
      modalPseudo.textContent = btn.id;
      targetedDeletePseudo = btn.id;
    })
  })

  const confirmEditUserBtn = document.querySelectorAll('.confirm-edit-user-btn');
  confirmEditUserBtn.forEach(btn => {
    const tdSelected = btn.parentElement;
    const trSelected = tdSelected.parentElement;
    btn.addEventListener('click', () => {
      toggleEditBtns(tdSelected);
      editUser(trSelected, false);
    })
  })

  const cancelEditUserBtn = document.querySelectorAll('.cancel-edit-user-btn');
  cancelEditUserBtn.forEach(btn => {
    const tdSelected = btn.parentElement;
    const trSelected = tdSelected.parentElement;
    btn.addEventListener('click', () => {
      toggleEditBtns(tdSelected);
      editUser(trSelected, true);
    })
  })
}

/**
 * Permet de modifier un user
 * 
 * @param {HTMLTableRowElement} trSelected => élément tr parent du bouton sur lequel on a cliqué
 * @param {boolean} isCancel => indique si on a cliqué sur la croix pour cancel l'edit
*/
function editUser(trSelected, isCancel) {
  const trChildren = trSelected.children;
  const alreadyEditingRow = trSelected.querySelector("input[type='text']");

  if(!alreadyEditingRow) {
    for(let i = 0; i < trChildren.length; i++) {
      const td = trChildren[i];
      const oldValue = td.textContent;

      switch(i) {
        case 0:
        case 7:
          break;
        case 1:
          td.innerHTML = `<input type="text" class="w-50 form-control d-inline-block" onchange="checkInputValue(this, 2)" oldValue="${oldValue}" value="${oldValue}" />`;
          break;
        case 2:
          td.innerHTML = `<input type="text" class="w-50 form-control d-inline-block" onchange="checkInputValue(this, 3)" oldValue="${oldValue}" value="${oldValue}" />`;
          break;
        case 3:
          const adminCheckbox = td.firstElementChild;
          adminCheckbox.disabled = false;
          adminCheckbox.setAttribute("oldValue", adminCheckbox.checked);
          break;
        case 4:
        case 5:
        case 6:
          td.innerHTML = `<input type="number" min="0" class="w-25 form-control d-inline-block" oldValue="${oldValue}" value="${oldValue}" />`;
          break;
        default:
          td.innerHTML = `<input type="text" class="w-50 form-control d-inline-block" oldValue="${oldValue}" value="${oldValue}" />`;
          break;
      }
    }
  }
  else {
    // Si ce n'est pas le cancel, on envoie les données à la BDD
    if(!isCancel) {
      const data = {
        oldPseudo: trChildren[1].firstElementChild.getAttribute('oldValue'),
        pseudo: trChildren[1].firstElementChild.value,
        mail: trChildren[2].firstElementChild.value,
        isAdmin: trChildren[3].firstElementChild.checked,
        flagScore: trChildren[4].firstElementChild.value,
        countryScore: trChildren[5].firstElementChild.value,
        capitalScore: trChildren[6].firstElementChild.value
      }

      fetch(`../../model/editUser.php`, {
        method: 'POST',
        body: JSON.stringify(data)
      })
      .then(res => res.text())
      .then(res => {
        if(res == '1') {
          toggleToast(false, "L'utilisateur a bien été modifié !");
          removeInputsFromTd(trChildren, false);
        }
      })
      .catch(() => {
        toggleToast(true, "Une erreur est survenue.");
      })
    }
    else {
      removeInputsFromTd(trChildren, true);
    }
  }
}

/**
 * Au moment de l'edit, à chaque changement de l'input, on regarde si le pseudo ou le mail n'est pas déjà utilisé
 * @param {HTMLInputElement} input
 * @param {number} columnNumber
*/
function checkInputValue(input, columnNumber) {
  const columnToCheck = document.querySelectorAll(`table td:nth-child(${columnNumber})`);
  const inputValue = input.value;
  const parentTd = input.parentElement;
  let errorMsg = '';

  const actionBtnsArr = ['confirm-edit-user-btn', 'cancel-edit-user-btn'];
  const toggleBtnDisability = (isDisabled) => {
    actionBtnsArr.forEach(btnClass => {
      const btn = parentTd.parentElement.querySelector(`.${btnClass}`);
      btn.disabled = isDisabled;
    })
  }

  if(inputValue !== '') {
    if(columnNumber === 3 && !inputValue.includes('@')) {
      errorMsg = "L'email doit contenir un @";
    }
    else {
      columnToCheck.forEach(td => {
        if(errorMsg === '') {
          if(td !== parentTd) {
            if(td.textContent === inputValue) {
              if(columnNumber === 2) {
                errorMsg = 'Un utilisateur a déjà ce pseudo.';
              }
              else {
                errorMsg = 'Un utilisateur a déjà ce mail.';
              }
            }
            else {
              errorMsg = '';
            }
          }
        }
      })
    }
  }
  else {
    errorMsg = 'La case ne peut pas être vide.';
  }

  if(!!errorMsg) {
    input.classList.add('border', 'border-danger');
    toggleBtnDisability(true);
    toggleToast(true, errorMsg);
  }
  else {
    input.classList.remove('border', 'border-danger');
    toggleBtnDisability(false);
  }
}

/**
 * Cache/Affiche les boutons "Edit" et "Delete"
 * Affiche/Cache les boutons "Confirm edit" et "Cancel edit"
 * @param {HTMLTableCellElement} tdSelected => élément td parent du bouton sur lequel on a cliqué
*/
function toggleEditBtns(tdSelected) {
  const actionBtnsArr = ['edit-user-btn', 'delete-user-btn', 'confirm-edit-user-btn', 'cancel-edit-user-btn'];
  actionBtnsArr.forEach(btnClass => {
    const btn = tdSelected.querySelector(`.${btnClass}`);
    btn.classList.toggle('d-none');
  })
}

/**
 * Dans l'élément tr sélectionné, enlève les inputs des éléments td
 * @param {HTMLTableRowElement} trChildren => élément tr parent du bouton sur lequel on a cliqué
 * @param {boolean} isCancel => indique si on a cancel l'edit du user ou non
 */
function removeInputsFromTd(trChildren, isCancel) {
  for(let i = 0; i < trChildren.length; i++) {
    const td = trChildren[i];
    let childInput;
    let value = '';

    if(td.children.length > 0) {
      childInput = td.firstElementChild;
      if(isCancel) {
        value = childInput.getAttribute('oldValue');
      }
      else {
        value = childInput.value;
      }
    }

    switch(i) {
      case 0:
      case 7:
        break;
      case 1:
      case 2:
      case 4:
      case 5:
      case 6:
        td.innerHTML = value;
        break;
      case 3:
        childInput.disabled = true;
        if(isCancel) {
          childInput.checked = value === "true";
        }
        break;
      default:
        td.innerHTML = value;
        break;
    }
  }
}

/**
 * Permet de supprimer un user de la base de donnée
*/
function deleteUser() {
  const data = {
    pseudo: targetedDeletePseudo
  }

  fetch(`../../model/deleteUser.php`, {
    method: 'POST',
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(data => {
    if(data == '1') {
      // Retire la ligne du tableau
      const pseudoBtn = document.getElementById(targetedDeletePseudo);
      const trRemoved = pseudoBtn.parentElement.parentElement;
      tbody.removeChild(trRemoved);
      
      // Affiche le popup pour indiquer que la suppression dans la base s'est bien faite
      toggleToast(false, "L'utilisateur a bien été supprimé !");
    }
  })
  .catch(() => {
    // Affiche le popup pour indiquer qu'une erreur est survenue
    toggleToast(true, "Une erreur est survenue.");
  })
}

/**
 * Change le background du toast et son message
 * => En rouge si il y a eu une erreur
 * => En bleu sinon
 * @param {boolean} isError
 * @param {string} toastMsg
*/
function toggleToast(isError, toastMsg) {
  const toast = new bootstrap.Toast(alertToast);
  const successClass = 'text-bg-primary';
  const errorClass = 'text-bg-danger';

  if(isError) {
    if(alertToast.classList.contains(successClass)) {
      alertToast.classList.replace(successClass, errorClass);
    }
  }
  else {
    if(alertToast.classList.contains(errorClass)) {
      alertToast.classList.replace(errorClass, successClass);
    }
  }

  toastBody.textContent = toastMsg;

  // Affiche le toast
  toast.show();
}