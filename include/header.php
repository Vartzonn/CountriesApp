<?php 
  $path = "/ProjetSolo";
  $fileName = $_SERVER["SCRIPT_FILENAME"];
  $noHeader = ['login'];
  $isNoHeaderPage = in_array(basename($fileName, '.php'), $noHeader);

  // On vérifie si on est bien login sinon on redirige vers la page de login
  if(!$isNoHeaderPage) {
    if(str_contains($fileName, '/ProjetSolo/pages')) {
      require "../../model/functions.php";
      require_once "../../model/getIsAdmin.php";
      include "../../include/loader.php";
    }
    else {
      require "./model/functions.php";
      require_once "./model/getIsAdmin.php";
      include "./include/loader.php";
    }
    logged_only();
  }
?>

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="icon" type="image/x-icon" href="<?=$path?>/favicon.svg">

  <!-- GOOGLE FONTS -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&display=swap" rel="stylesheet">

  <!-- BOOTSTRAP -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>

  <!-- FONT-AWESOME -->
  <script src="https://kit.fontawesome.com/a39d65a413.js" crossorigin="anonymous"></script>

  <!-- GLOBAL STYLE -->
  <link rel="stylesheet" href=<?= "$path/style/style.css" ?> />

  <!-- MAIN JS FILE -->
  <script src=<?= "$path/include/header.js" ?> defer type="text/javascript"></script>
  <script type="module" defer>
    import "<?=$path?>/include/global.js";
  </script>

  <title>CoutriesApp</title>
</head>
<body>
  <?php if(!$isNoHeaderPage) { ?>
    <header>
      <h1 class='title cs-pointer'>CountriesApp</h1>

      <nav>
        <a href="<?=$path?>/pages/play/play.php">Jouer</a>
        <a href="<?=$path?>/pages/revise/revise.php">Réviser</a>
        <a href="<?=$path?>/pages/ranking/ranking.php">Classement</a>
        <?php if ($isAdmin) { ?>
          <a href="<?= $path ?>/pages/admin/admin.php">Admin</a>
        <?php }?>
        <a href=<?= "$path/model/logout.php" ?> class="btn btn-danger logout-btn">
          <i class="fa-solid fa-power-off"></i>
        </a>
      </nav>
    </header>
  <?php } else { ?>
    <h1 class='without-header title pt-4'>CountriesApp</h1>
  <?php } ?>

  <div class="main-container">