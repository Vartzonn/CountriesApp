<?php 
  // On vérifie si on est bien login
  require './model/functions.php';
  logged_only();

  include './include/header.php';
?>

<div class="home-container">
  <h2>Bonjour <?= $_SESSION['auth'] ?></h2>
</div>

<script type='text/javascript' src='./index.js'></script>

<?php include './include/footer.php'; ?>