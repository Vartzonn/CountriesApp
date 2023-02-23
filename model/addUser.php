<?php 
  require_once "./bdd.php";
  $_POST = json_decode(file_get_contents('php://input'), true);

  if(isset($_POST['pseudo']) &&
    isset($_POST['password']) &&
    isset($_POST['mail']) &&
    isset($_POST['isAdmin'])
  ) {
    $pseudo = $_POST['pseudo'];
    $password = $_POST['password'];
    $mail = $_POST['mail'];
    $isAdmin = $_POST['isAdmin'];

    if(!$isAdmin) {
      $isAdmin = 0;
    }

    try {
      $sql = "INSERT INTO user (pseudo, password, mail, isAdmin) VALUES ('$pseudo', '$password', '$mail', $isAdmin)";
      $conn->query($sql);
      $sql = "INSERT INTO classement (pseudo) VALUES ('$pseudo')";
      $conn->query($sql);

      echo 1;
    } catch (PDOException $e) {
      echo "Error: " . $e->getMessage();
    }
    finally {
      $conn = null;
    }
  }
  else {
    echo "Il manque des informations dans la requête.";
  }
?>