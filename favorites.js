// Select the container in which to display the favorites.
const favoritesContainer = document.querySelector('#favorites');
favoritesContainer.classList.add('grid', 'grid-cols-5', 'gap-4', 'p-0', 'm-0');

// Retrieve the favorites from localStorage.
let favorites = localStorage.getItem('favorites');

// If there are favorites, parse the JSON string into an array.
// If there are no favorites, initialize an empty array.
favorites = favorites ? JSON.parse(favorites) : [];

let deletionIndex; // Global variable to store the index of the movie to delete

// Function to create movie tiles for the favorites
function createFavoriteMovieTiles(movieData) {
    movieData.forEach((movie, index) => {
      const movieTile = document.createElement('div');
      movieTile.classList.add('bg-white-500', 'text-white', 'text-center', 'py-2', 'rounded', 'cursor-pointer', 'hover:bg-white-700', 'w-40', 'h-80');
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'X';
      deleteButton.classList.add('delete-button');
      deleteButton.addEventListener('click', () => {
          deletionIndex = index; // Save the index of the movie to delete
          showModal(); // Show the modal
      });
      movieTile.appendChild(deleteButton); // Append the delete button here
  
      const movieLink = document.createElement('a');
      movieLink.href = movie.fullTitle;
      const movieImage = document.createElement('img');
      movieImage.classList.add('image-size');
      movieImage.src = movie.image;
      movieImage.alt = movie.title;
      movieLink.appendChild(movieImage);
      movieTile.appendChild(movieLink);
  
      const movieTitle = document.createElement('h3');
      movieTitle.textContent = movie.title;
      movieTile.appendChild(movieTitle);
  
      const movieRating = document.createElement('p');
      movieRating.textContent = `Rating: ${movie.imDbRating}`;
      movieTile.appendChild(movieRating);
  
      favoritesContainer.appendChild(movieTile);
    });
}

// Call the function to display favorites
createFavoriteMovieTiles(favorites);

function removeFromFavorites(index) {
    // Remove the movie from the array
    favorites.splice(index, 1);
  
    // Update localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
  
    // Remove all children from the favorites container
    while (favoritesContainer.firstChild) {
      favoritesContainer.firstChild.remove();
    }
  
    // Re-render the favorites
    createFavoriteMovieTiles(favorites);
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Show the modal
function showModal() {
  modal.style.display = "block";
}

// Hide the modal
function hideModal() {
  modal.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  hideModal();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    hideModal();
  }
}

// Get the button elements
var confirmButton = document.getElementById('confirm');
var cancelButton = document.getElementById('cancel');

// Handle the click events
confirmButton.addEventListener('click', function() {
  // Handle confirmation here
  removeFromFavorites(deletionIndex);
  hideModal();
});

cancelButton.addEventListener('click', function() {
  // Handle cancellation here
  hideModal();
});

 