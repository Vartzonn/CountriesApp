<?php 
  require_once "./bdd.php";

  try {
    $sql = "SELECT user.id, user.pseudo, user.mail, user.isAdmin, classement.* FROM user JOIN classement ON user.pseudo = classement.pseudo";
    $users = $conn->query($sql)->fetchAll(PDO::FETCH_CLASS);

    echo json_encode($users);
  } catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
  }
  finally {
    $conn = null;
  }
?>