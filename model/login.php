<?php
  require './functions.php';
  require './variables.php';
  $loginPath = '../pages/login/login.php';

  if(!empty($_POST['pseudo'])) {
    $pseudo = cleandata($_POST['pseudo']);
  }
  else {
    header("Location:$loginPath");
  }

  if(!empty(($_POST['password'])) && preg_match($passwordPattern, $_POST['password']) && !empty($pseudo)) {
    try {
      require_once './bdd.php';

      $userdata = $conn->query("SELECT * FROM user WHERE pseudo = '$pseudo'")->fetch(PDO::FETCH_OBJ);
    } catch (PDOException $e) {
      echo "Error: " . $e;
    } finally {
      if(!empty($userdata) && password_verify($_POST['password'], $userdata->password)) {
        session_start();
        $_SESSION['auth'] = $userdata->pseudo;
        header("Location:../index.php");
      } else {
        header("Location:$loginPath?err=3");
      }
    }
  }
  else {
    echo "ERREUR DANS LE LOG";
  }
?>