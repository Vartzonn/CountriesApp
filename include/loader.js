window.addEventListener('load', () => {
  setTimeout(() => {
    const loaderOverlay = document.querySelector('.overlay');
    loaderOverlay.style.opacity = '0';
    loaderOverlay.style.zIndex = '-1';
  }, 200)
})