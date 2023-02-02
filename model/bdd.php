<?php
  $server = "localhost";
  $user = "root";
  $db = "countriesapp";
  $password = "";

  try {
    $conn = new PDO("mysql:host=$server;dbname=$db;charset=utf8", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }
  catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
  }
?>