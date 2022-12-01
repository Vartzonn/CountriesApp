<?php 
  function cleandata($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }

  $loginPath = '/ProjetSolo/pages/login/login.php';

  function logged_only() {
    session_start();
    if(session_status() == PHP_SESSION_NONE || !isset($_SESSION['auth'])) {
      // header("Location: $loginPath");
    }
  }
?>