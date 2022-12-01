<?php
  $loginPath = '/ProjetSolo/pages/login/login.php';

  session_start();
  session_destroy();
  session_unset();
  header("Location: $loginPath");
?>