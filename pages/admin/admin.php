<?php 
  include '../../include/header.php';

  if(!$isAdmin) {
    $loginPath = '../login/login.php';
    header("Location:$loginPath");
  }
?>

<h1>Page Admin</h1>

<?php 
  include '../../include/footer.php';
?>