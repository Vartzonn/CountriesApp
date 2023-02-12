<?php 
  require_once "./bdd.php";
  $_POST = json_decode(file_get_contents('php://input'), true);

  if(isset($_POST['pseudo'])) {
    $pseudo = $_POST['pseudo'];

    try {
      $sql = "DELETE FROM user WHERE pseudo='$pseudo'";
      $conn->query($sql);
      $sql = "DELETE FROM classement WHERE pseudo='$pseudo'";
      $conn->query($sql);

      echo 1;
    } catch (PDOException $e) {
      echo "Error: " . $e->getMessage();
    }
    finally {
      $conn = null;
    }
  }
?>