// Select the container in which to display the favorites.
const favoritesContainer = document.querySelector('#favorites');
favoritesContainer.classList.add('grid', 'grid-cols-5', 'gap-4', 'p-0', 'm-0');
// Retrieve the favorites from localStorage.
let favorites = localStorage.getItem('favorites');

// If there are favorites, parse the JSON string into an array.
// If there are no favorites, initialize an empty array.
favorites = favorites ? JSON.parse(favorites) : [];

// Function to create movie tiles for the favorites
function createFavoriteMovieTiles(movieData) {
    movieData.forEach((movie, index) => {
      const movieTile = document.createElement('div');
      movieTile.classList.add('bg-white-500', 'text-white', 'text-center', 'py-2', 'rounded', 'cursor-pointer', 'hover:bg-white-700', 'w-40', 'h-80');
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'X';
      deleteButton.classList.add('delete-button');
      deleteButton.addEventListener('click', () => {
          removeFromFavorites(index);
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

 