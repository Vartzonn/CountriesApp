<?php 
  $path = "/ProjetSolo";
  $fileName = $_SERVER["SCRIPT_FILENAME"];
  $noHeader = ['login'];
  $isNoHeaderPage = in_array(basename($fileName, '.php'), $noHeader);

  // On vérifie si on est bien login sinon on redirige vers la page de login
  if(!$isNoHeaderPage) {
    if(str_contains($fileName, '/ProjetSolo/pages')) {
      require_once "../../model/bdd.php";
    }
    else {
      require_once "./model/bdd.php";
    }
  }

  session_start();
  $userPseudo = $_SESSION['auth'];

  try {
    $sql = "SELECT isAdmin FROM user WHERE pseudo='$userPseudo'";
    $response = $conn->query($sql)->fetch();
    $isAdmin = $response['isAdmin'];
  } catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
  }
  finally {
    $conn = null;
  }
?>