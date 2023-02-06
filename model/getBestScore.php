<?php 
  require_once "./bdd.php";
  session_start();
  $userPseudo = $_SESSION['auth'];

  if(isset($_GET['gameMode'])) {
    $gameMode = $_GET['gameMode'];

    try {
      $sql = "SELECT $gameMode FROM classement WHERE pseudo='$userPseudo'";
      $bestScore = $conn->query($sql)->fetch();
      echo $bestScore[$gameMode];
    } catch (PDOException $e) {
      echo "Error: " . $e->getMessage();
    }
    finally {
      $conn = null;
    }
  }
?>