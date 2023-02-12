<?php 
  require_once "./bdd.php";
  $_POST = json_decode(file_get_contents('php://input'), true);

  if(isset($_POST['oldPseudo']) &&
    isset($_POST['pseudo']) &&
    isset($_POST['mail']) &&
    isset($_POST['isAdmin']) &&
    isset($_POST['flagScore']) &&
    isset($_POST['countryScore']) &&
    isset($_POST['capitalScore'])
  ) {
    $oldPseudo = $_POST['oldPseudo'];
    $pseudo = $_POST['pseudo'];
    $mail = $_POST['mail'];
    $isAdmin = $_POST['isAdmin'];
    $flagScore = $_POST['flagScore'];
    $countryScore = $_POST['countryScore'];
    $capitalScore = $_POST['capitalScore'];

    if(!$isAdmin) {
      $isAdmin = 0;
    }

    try {
      $sql = "UPDATE user SET pseudo='$pseudo', mail='$mail', isAdmin='$isAdmin' WHERE pseudo='$oldPseudo'";
      $conn->query($sql);
      $sql = "UPDATE classement SET pseudo='$pseudo', flagScore='$flagScore', countryScore='$countryScore', capitalScore='$capitalScore' WHERE pseudo='$oldPseudo'";
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