<?php
  if (!empty($_POST['signup-mail']) && filter_var($_POST['signup-mail'], FILTER_VALIDATE_EMAIL)) {
    $loginPath = '../pages/login/login.php';

    require_once './bdd.php';

    $vermail = $_POST['signup-mail'];
    $mailcheck = $conn->query("SELECT * FROM user WHERE mail = '$vermail'")->fetch();
    if ($mailcheck && 0 ===1) {
      header("Location:$loginPath?err=1");
    }
    else {
      require_once './functions.php';
      require_once './variables.php';

      if (!empty($_POST['signup-pseudo']) && !empty($_POST['signup-mail'])) {
        $mail = cleandata($_POST['signup-mail']);
        $pseudo = cleandata($_POST['signup-pseudo']);
        $pseudoCheck = $conn->query("SELECT * FROM user WHERE pseudo = '$pseudo'")->fetch();

        if ($pseudoCheck) {
          header("Location:$loginPath?err=2");
        }
        else {
          if (!empty($_POST['signup-password']) && preg_match($passwordPattern, $_POST['signup-password'])) {
            $password = $_POST['signup-password'];
            $hashed = password_hash($password, PASSWORD_BCRYPT);

            if (!empty($_POST) && !empty($hashed) && !empty($pseudo) && !$pseudoCheck && !empty($mail)) {
              try {
                $req = $conn->prepare('INSERT INTO user(pseudo, password, mail) VALUES(:pseudo, :password, :mail)');
                $req->bindParam(':pseudo', $pseudo);
                $req->bindParam(':password', $hashed);
                $req->bindParam(':mail', $mail);
                $req->execute();
              } 
              catch (PDOException $e) {
                echo "Error: " . $e;
              }
              finally {
                try {
                  $userdata = $conn->query("SELECT pseudo, mail FROM user WHERE pseudo = '$pseudo'")->fetch(PDO::FETCH_OBJ);
                }
                catch (PDOException $e) {
                  echo "Error: " . $e;
                }
                finally {
                  session_start();
                  $_SESSION['auth'] = $userdata->pseudo;
                  header("Location:../index.php");
                }
              }
            }
            else {
              header("Location:$loginPath");
            }
          } 
          else {
            header("Location:$loginPath?err=500");
          }
        }
      }
      else {
        header("Location:$loginPath?err=500");
      }
    }
  }
?>