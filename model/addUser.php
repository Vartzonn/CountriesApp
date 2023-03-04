<?php 
  require_once "./bdd.php";
  require_once './regexVariables.php';
  $_POST = json_decode(file_get_contents('php://input'), true);

  if(isset($_POST['pseudo']) &&
    isset($_POST['password']) &&
    isset($_POST['mail']) &&
    isset($_POST['isAdmin'])
  ) {
    require_once './functions.php';

    $pseudo = cleandata($_POST['pseudo']);
    $password = $_POST['password'];
    $mail = cleandata($_POST['mail']);
    $isAdmin = $_POST['isAdmin'];

    if(
      preg_match($pseudoPattern, $pseudo) &&
      preg_match($passwordPattern, $password) &&
      preg_match($mailPattern, $mail) &&
      filter_var($mail, FILTER_VALIDATE_EMAIL) &&
      filter_var($isAdmin, FILTER_VALIDATE_BOOLEAN)
    ) {
      if(!$isAdmin) {
        $isAdmin = 0;
      }
  
      try {
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
  
        $sql = "INSERT INTO user (pseudo, password, mail, isAdmin) VALUES ('$pseudo', '$hashedPassword', '$mail', $isAdmin)";
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
      echo "Données invalides.";
    }
  }
  else {
    echo "Il manque des informations dans la requête.";
  }
?>