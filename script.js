const container = document.querySelector('.image-container');

container.addEventListener('wheel', (event) => {
  event.preventDefault();
  container.scrollLeft += event.deltaY;
});
