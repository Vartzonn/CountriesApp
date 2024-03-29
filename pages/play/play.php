<?php 
  include '../../include/header.php';
?>

<div class="play-container w-100">
  <?php include '../../include/gameModes.php' ?>
  
  <!-- SCORE -->
  <div class="score-container position-absolute">
    <p class="mb-1">Score: <span class="score">0</span></p>
    <p class="mb-1">Meill. score: <span class="best-score">0</span></p>
  </div>

  <!-- JEU -->
  <div class="game-container w-100 p-4">
    <div class="question-container">
      <h3 class="question-title">A quel pays appartient ce drapeau ?</h3>
      <div class="question-item">
        <div class="fa-4x question-loader question-loader_active">
          <i class="fas fa-spinner fa-pulse"></i>
        </div>
        <div class="question"></div>
      </div>
    </div>
    <div class="answer-container">
      <button type='button' class="btn btn-outline-primary answer">A</button>
      <button type='button' class="btn btn-outline-primary answer">B</button>
      <button type='button' class="btn btn-outline-primary answer">C</button>
      <button type='button' class="btn btn-outline-primary answer">D</button>
    </div>
  </div>
</div>

<script type="module">
  import './play.js';
</script>

<?php 
  include '../../include/footer.php';
?>