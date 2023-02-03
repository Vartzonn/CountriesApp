<?php
  if (!empty($_POST['signup-mail']) && filter_var($_POST['signup-mail'], FILTER_VALIDATE_EMAIL)) {
    $loginPath = '../pages/login/login.php';

    require_once './bdd.php';

    $vermail = $_POST['signup-mail'];
    $mailcheck = $conn->query("SELECT * FROM user WHERE mail = '$vermail'")->fetch();
    if ($mailcheck) {
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
                $userReq = $conn->prepare('INSERT INTO user(pseudo, password, mail) VALUES(:pseudo, :password, :mail)');
                $userReq->bindParam(':pseudo', $pseudo);
                $userReq->bindParam(':password', $hashed);
                $userReq->bindParam(':mail', $mail);
                $userReq->execute();

                $score = 0;
                $classementReq = $conn->prepare('INSERT INTO classement(pseudo, flagScore, countryScore, capitalScore) VALUES(:pseudo, :flagScore, :countryScore, :capitalScore)');
                $classementReq->bindParam(':pseudo', $pseudo);
                $classementReq->bindParam(':flagScore', $score);
                $classementReq->bindParam(':countryScore', $score);
                $classementReq->bindParam(':capitalScore', $score);
                $classementReq->execute();
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