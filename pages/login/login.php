<?php 
  include '../../include/header.php'; 

  require '../../model/variables.php';
?>

<div class="login-forms-container h-100 w-100 p-4">
  <!-- FORMULAIRE DE CONNEXION -->
  <div class="login-forms rounded-4 shadow mt-3">
    <div class="card-front p-4">
      <form action="../../model/login.php" method="POST" class='form-login'>
        <h2 class="text-center">Connexion</h2>

        <div class="mt-4 mb-3">
          <label for="pseudo" class="form-label">Votre pseudo</label>
          <input 
            type="text"
            class="form-control"
            required
            pattern=<?=$htmlPseudoPattern?>
            minlength="3"
            maxlength="20"
            id="pseudo"
            name="pseudo"
            placeholder="Votre pseudo"
          />
        </div>

        <div class="mb-4">
          <label for="password" class="form-label">Votre mot de passe</label>
          <input 
            type="password"
            class="form-control"
            required
            pattern=<?=$htmlPasswordPattern?>
            minlength="6"
            maxlength="24"
            id="password"
            name="password"
            placeholder="Votre mot de passe" 
          />
          <?php 
            if(isset($_GET['err'])) {
              if($_GET['err'] == 3) {
                echo '<div class="form-text ps-2 text-danger">Identifiant incorrect.</div>';
              }
            }
          ?>
        </div>


        <div class="form-check form-switch">
          <input class="form-check-input cs-pointer" type="checkbox" role="switch" id="rememberMe">
          <label class="form-check-label cs-pointer" for="rememberMe">Se souvenir de moi</label>
        </div>

        <div class="button-container mt-5">
          <button type="submit" class="btn btn-primary login-btn">Se connecter</button>
          <button type="button" class="btn btn-outline-dark mt-4 sign-up-btn">S'inscrire</button>
        </div>
      </form>
    </div>

    <!-- FORMULAIRE D'INSCRIPTION -->
    <div class="card-back rounded-4 p-4">
      <form action="../../model/signup.php" method="POST">
          <h2 class="text-center">Inscription</h2>

          <div class="mt-4 mb-3">
            <label for="signup-pseudo" class="form-label">Votre pseudo</label>
            <input
              type="text"
              class="form-control"
              required
              pattern=<?=$htmlPseudoPattern?>
              minlength="3"
              maxlength="20"
              id="signup-pseudo"
              name="signup-pseudo"
              placeholder="Votre pseudo"
            />
            <?php 
              if(isset($_GET['err'])) {
                if($_GET['err'] == 2) {
                  echo '<div class="form-text ps-2 text-danger">Ce pseudo existe déjà.</div>';
                }
              }
            ?>
          </div>

          <div class="mb-3">
            <label for="signup-mail" class="form-label">Votre mail</label>
            <input 
              type="email"
              class="form-control"
              required
              pattern=<?=$htmlMailPattern?>
              id="signup-mail"
              name="signup-mail"
              placeholder="Votre mail"
            />
            <?php 
              if(isset($_GET['err'])) {
                if($_GET['err'] == 1) {
                  echo '<div class="form-text ps-2 text-danger">Ce mail existe déjà.</div>';
                }
              }
            ?>
          </div>

          <div>
            <label for="signup-password" class="form-label">Votre mot de passe</label>
            <input
              type="password"
              class="form-control"
              required
              pattern=<?=$htmlPasswordPattern?>
              minlength="6"
              maxlength="24"
              id="signup-password"
              name="signup-password"
              placeholder="Votre mot de passe"
            />
          </div>

          <?php 
            if(isset($_GET['err'])) {
              if($_GET['err'] == 500) {
                echo '<div class="form-text ps-2 text-danger">Une erreur est survenue. Veuillez réessayer.</div>';
              }
            }
          ?>

          <div class="button-container mt-3 pt-3">
            <button type="submit" class="btn btn-primary">S'inscrire</button>
            <button type="button" class="btn btn-outline-dark mt-4 sign-in-btn">Se connecter</button>
          </div>
        </form>
    </div>
  </div>
</div>


<?php include '../../include/footer.php'; ?>

<script src="./login.js" type="text/javascript"></script>