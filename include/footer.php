    </div>
    <?php if(basename($_SERVER["SCRIPT_FILENAME"], '.php') !== 'login') { ?>
      <footer>
        <nav>
          <!-- Container des réseaux -->
          <div class="networks-container">
            <a href="https://github.com/Vartzonn" target="_blank" class="no-underline">
              <i class="fa-brands fa-github fa-xl"></i>
            </a>
            <a href="https://www.linkedin.com/in/antoine-brunelle/" target="_blank" class="no-underline">
              <i class="fa-brands fa-linkedin fa-xl"></i>
            </a>
            <a href="https://antoine-brunelle.fr/" target="_blank" class="no-underline">
              <i class="fa-solid fa-globe fa-xl"></i>
            </a>
            <a href="https://www2.itroom.fr/" target="_blank" class="no-underline">
              <i class="fa-solid fa-briefcase fa-xl"></i>
            </a>
          </div>

          <a href="https://restcountries.com/" target="_blank">API Documentation</a>
          <a href="#">Test</a>
        </nav>
      </footer>
    <?php } ?>
  </body>
</html>