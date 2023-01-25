<?php
  include './include/header.php';
?>

<div class="home-container">
  <div class="flags-carousel-container"></div>
  <div class="home-links-container">
    <a href="./pages/play/play.php">JOUER</a>
    <a href="./pages/revise/revise.php">RÉVISER</a>
    <a href="./pages/ranking/ranking.php">CLASSEMENT</a>
  </div>
  <div class="flags-carousel-container reverse"></div>
</div>

<script type='module'>
  import './index.js';
</script>

<?php
  include './include/footer.php'; 
?>