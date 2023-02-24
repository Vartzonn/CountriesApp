<?php 
  include '../../include/header.php';

  // Si l'user n'est pas admin, on le redirige
  if(!$isAdmin) {
    $loginPath = '../login/login.php';
    header("Location:$loginPath");
  }
?>

<div class="admin-container">
  <button id="addUserBtn" class="btn btn-success mt-2 ms-2" data-bs-toggle="modal" data-bs-target="#addUserModal">
    Ajouter un utilisateur
  </button>

  <!-- Bootstrap Modal Add User -->
  <div class="modal fade" id="addUserModal" tabindex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="addUserModalLabel">Ajouter un utilisateur</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form action="#">
            <div class="input-group mb-3">
              <span class="input-group-text">Pseudo</span>
              <input type="text" class="form-control" name="pseudo" />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Mot de passe</span>
              <input type="password" class="form-control" name="password" />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Adresse mail</span>
              <input type="text" class="form-control" name="mail" />
            </div>

            <div>
              <input type="checkbox" class="btn-check" name="admin" id="admin" autocomplete="off">
              <label class="btn btn-outline-primary" for="admin">Administrateur</label><br>
            </div>
          </form>
        </div>
        <div class="modal-footer mt-1">
          <button type="button" class="btn btn-success confirm-add-user" disabled data-bs-dismiss="modal">Confirmer</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
        </div>
      </div>
    </div>
  </div>

  <div class="admin-table">
    <table id="users">
      <thead>
        <tr>
          <th>Id</th>
          <th>Pseudo</th>
          <th>Mail</th>
          <th>Admin</th>
          <th>Score - Drapeaux</th>
          <th>Score - Pays</th>
          <th>Score - Capitale</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody class="usersBody"></tbody>
    </table>
  </div>

  <!-- Bootstrap Modal Delete User -->
  <div class="modal fade" id="deleteUserModal" tabindex="-1" aria-labelledby="deleteUserModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="deleteUserModalLabel">Supprimer un utilisateur</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Êtes-vous sûr de vouloir supprimer <strong><span class="deleteUserModal-pseudo"></span></strong> ?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
          <button type="button" class="btn btn-danger confirm-delete-user" data-bs-dismiss="modal">Confirmer</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Bootstrap Toast Delete User -->
  <div id="alertToast" class="toast align-items-center text-bg-primary position-fixed border-0 mb-5 me-2 bottom-0 end-0" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="d-flex">
      <div class="toast-body">
        L'utilisateur a bien été supprimé !
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>
</div>

<?php 
  include '../../include/footer.php';
?>

<script src="./admin.js" type="text/javascript"></script>