<?php 
  $path = "/ProjetSolo";
  $noHeader = ['login'];
?>

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- GOOGLE FONTS -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&display=swap" rel="stylesheet">

  <!-- BOOTSTRAP -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">

  <!-- FONT-AWESOME -->
  <script src="https://kit.fontawesome.com/a39d65a413.js" crossorigin="anonymous"></script>

  <!-- GLOBAL STYLE -->
  <link rel="stylesheet" href=<?= "$path/style/style.css" ?> />

  <!-- MAIN JS FILE -->
  <script src=<?= "$path/include/header.js" ?> defer type="text/javascript"></script>

  <title>CoutriesApp</title>
</head>
<body>
  <?php if(!in_array(basename($_SERVER["SCRIPT_FILENAME"], '.php'), $noHeader)) { ?>
    <header>
      <h1 class='title'>CountriesApp</h1>
      <nav>
        <a href="#" class="btn btn-primary me-2">
          <i class='fa-solid fa-user'></i>
        </a>
        <a href=<?= "$path/model/logout.php" ?> class="btn btn-danger logout-btn">
          <i class="fa-solid fa-power-off"></i>
        </a>
      </nav>
    </header>
  <?php } else { ?>
    <h1 class='without-header title pt-4'>CountriesApp</h1>
  <?php } ?>

  <div class="main-container">