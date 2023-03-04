<?php
  require_once "./bdd.php";
  session_start();
  $userPseudo = $_SESSION['auth'];

  if(isset($_GET['gameMode']) && $_GET['score']) {
    require_once './functions.php';

    $gameMode = cleandata($_GET['gameMode']);
    $newScore = cleandata($_GET['score']);

    if(filter_var($newScore, FILTER_VALIDATE_INT) !== false) {
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
    else {
      throw new Exception("Données invalides.");
    }
  }
?>