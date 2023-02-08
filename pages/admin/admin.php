<?php 
  include '../../include/header.php';

  // Si l'user n'est pas admin, on le redirige
  if(!$isAdmin) {
    $loginPath = '../login/login.php';
    header("Location:$loginPath");
  }
?>

<div class="admin-container">
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
</div>



<?php 
  include '../../include/footer.php';
?>

<script src="./admin.js" type="text/javascript"></script>