<?php 
  function cleandata($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }

  function logged_only() {
    if(session_status() == PHP_SESSION_NONE || !isset($_SESSION['auth'])) {
      header("Location: /ProjetSolo/pages/login/login.php");
    }
  }
?>