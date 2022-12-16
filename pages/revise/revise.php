<?php 
  include '../../include/header.php';
?>

<!-- Conteneur des filtres -->
<div class="filter-container px-3 pt-3">
  <div class="select-container d-flex align-items-center gap-2">
    <p class="m-0">Trier par continent :</p>
    <select name="select-continent" id="select-continent" class="form-select w-50">
      <option value='all'>Tous</option>
    </select>
  </div>
  
  <div class="search-container input-group">
    <span class="input-group-text" id="basic-addon1">
      <i class="fa-solid fa-magnifying-glass"></i>
    </span>
    <input type="text" id="filter-country" class="form-control ps-2" placeholder="Recherchez un pays" />
  </div>
</div>

<!-- Conteneur de toutes les cartes -->
<div class="revise-container"></div>

<!-- Bouton pour retourner en haut de la page -->
<button class="btn btn-primary goToTop">
<i class="fa-solid fa-arrow-up"></i>
</button>

<script type="module">
  import "./revise.js"
</script>

<?php 
  include '../../include/footer.php';
?>