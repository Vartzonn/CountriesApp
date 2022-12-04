<?php
  // On vérifie si on est bien login
  require './model/functions.php';
  logged_only();

  include './include/header.php';
?>

<div class="home-container">
  <a href="./pages/play/play.php">JOUER</a>
  <a href="./pages/revise/revise.php">RÉVISER</a>
  <a href="./pages/ranking/ranking.php">CLASSEMENT</a>
</div>

<script type='text/javascript' src='./index.js'></script>

<?php
  include './include/footer.php'; 
?>