<?php
  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "countriesapp2";
  $dbAlreadyExist = false;

  try {
    $conn = new PDO("mysql:host=$servername", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "CREATE DATABASE $dbname";
    $conn->exec($sql);
  } catch (PDOException $e) {
    if(str_contains($e->getMessage(), "database exists")) {
      $dbAlreadyExist = true;
    }
  }

  $conn = null;

  if(!$dbAlreadyExist) {
    try {
      $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $sql = "CREATE TABLE user (
          id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          pseudo VARCHAR(20) NOT NULL,
          mail VARCHAR(100) NOT NULL,
          password VARCHAR(256) NOT NULL,
          isAdmin VARCHAR(5)
          )";
      $conn->exec($sql);
    } catch (PDOException $e) {
      echo $sql . "<br>" . $e->getMessage();
    }

    $conn = null;

    try {
      $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $sql = "CREATE TABLE classement (
          id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          pseudo VARCHAR(20) NOT NULL,
          score INT(6) NOT NULL
          )";
      $conn->exec($sql);
    } catch (PDOException $e) {
      echo $sql . "<br>" . $e->getMessage();
    }

    $conn = null;
  }
?>