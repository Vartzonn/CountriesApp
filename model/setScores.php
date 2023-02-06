<?php
  require_once "./bdd.php";
  session_start();
  $userPseudo = $_SESSION['auth'];

  if(isset($_GET['gameMode']) && $_GET['score']) {
    $gameMode = $_GET['gameMode'];
    $newScore = $_GET['score'];

    try {
      $sql = "UPDATE classement SET $gameMode=$newScore WHERE pseudo='$userPseudo'";
      $conn->query($sql);
    } catch (PDOException $e) {
      echo "Error: " . $e->getMessage();
    }
    finally {
      $conn = null;
    }
  }
?>