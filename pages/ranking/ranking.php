<?php 
  include '../../include/header.php';
?>

<div class="ranking-container w-100">
  <?php include '../../include/gameModes.php' ?>

  <h1 class="ranking-title">Classement</h1>
  <div class="ranking-table">
    <table id="users">
      <thead>
        <tr>
          <th>Classement</th>
          <th>Pseudo</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody class="usersBody" id="<?=$_SESSION['auth']?>"></tbody>
    </table>
  </div>
</div>

<script type="text/javascript" src="./ranking.js"></script>

<?php 
  include '../../include/footer.php';
?>