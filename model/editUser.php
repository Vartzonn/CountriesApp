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
    require_once './functions.php';
    require_once './regexVariables.php';

    $oldPseudo = cleanData($_POST['oldPseudo']);
    $pseudo = cleanData($_POST['pseudo']);
    $mail = cleanData($_POST['mail']);
    $isAdmin = $_POST['isAdmin'];
    $flagScore = intval(cleanData($_POST['flagScore']));
    $countryScore = intval(cleanData($_POST['countryScore']));
    $capitalScore = intval(cleanData($_POST['capitalScore']));

    if(
      preg_match($pseudoPattern, $oldPseudo) &&
      preg_match($pseudoPattern, $pseudo) &&
      preg_match($mailPattern, $mail) &&
      filter_var($mail, FILTER_VALIDATE_EMAIL) &&
      (filter_var($flagScore, FILTER_VALIDATE_INT) !== false) &&
      (filter_var($flagScore, FILTER_VALIDATE_INT) !== false) &&
      (filter_var($flagScore, FILTER_VALIDATE_INT) !== false)
    ) {
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
      echo "Données invalides.";
    }
  }
  else {
    echo "Il manque des informations dans la requête.";
  }
?>