<?php
  require_once "./bdd.php";
  session_start();
  $userPseudo = $_SESSION['auth'];

  if(isset($_GET['scoreGame']) && $_GET['score']) {
    $scoreGame = $_GET['scoreGame'];
    $newScore = $_GET['score'];

    try {
      $sql = "UPDATE classement SET $scoreGame=$newScore WHERE pseudo='$userPseudo'";
      $conn->query($sql);
    } catch (PDOException $e) {
      echo "Error: " . $e->getMessage();
    }
  }

  $conn = null;
?>