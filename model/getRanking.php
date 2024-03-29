<?php 
  require_once "./bdd.php";

  if(isset($_GET['gameMode'])) {
    require_once './functions.php';

    $gameMode = cleandata($_GET['gameMode']);

    try {
      $sql = "SELECT pseudo, $gameMode FROM classement ORDER BY $gameMode DESC";
      $ranking = $conn->query($sql)->fetchAll();

      echo json_encode($ranking);
    } catch (PDOException $e) {
      echo "Error: " . $e->getMessage();
    }
    finally {
      $conn = null;
    }
  }
?>