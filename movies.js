//IMDB API
const apiKey = "k_s9252ij2";
const apiurl1 = 'https://imdb-api.com/en/API/InTheaters/k_s9252ij2';
const apiUrl2 = 'https://imdb-api.com/en/API/Top250Movies/k_s9252ij2';
const apiurl3 = 'https://imdb-api.com/en/API/MostPopularMovies/k_s9252ij2';

// This function will be called when the 'Add to Favorites' button is clicked.
function addToFavorites(movie) {
    // Retrieve the current list of favorites from localStorage.
    let favorites = localStorage.getItem('favorites');
  
    // If there are no favorites yet, we initialize an empty array.
    if (!favorites) {
      favorites = [];
    } else {
      // If there are already favorites, we parse the JSON string into an array.
      favorites = JSON.parse(favorites);
    }
  
    // Add the movie to the array.
    favorites.push(movie);
  
    // Save the updated favorites array back to localStorage.
    // We convert the array into a JSON string because localStorage can only store strings.
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
  }


const mostPopularContainer = document.querySelector('#most-popular');

async function fetchMostPopularMovies() {
    try {
        const response = await fetch(apiurl3, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": apiKey,
                "x-rapidapi-host": "imdb-api.com"
            }
        });
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

function createMostPopularMovieCards(movieData) {
    movieData.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('bg-white-500', 'text-white', 'text-center', 'py-2', 'rounded', 'cursor-pointer', 'hover:bg-white-700', 'w-40', 'h-80');

        const movieLink = document.createElement('a');
        movieLink.href = movie.fullTitle; // Depending on the API's returned structure

        const movieImage = document.createElement('img');
        movieImage.classList.add('image-size');
        movieImage.src = movie.image; // Depending on the API's returned structure
        movieImage.alt = movie.title; // Depending on the API's returned structure
        movieLink.appendChild(movieImage);

        const movieTitle = document.createElement('h3');
        movieTitle.textContent = movie.title; // Depending on the API's returned structure
        
        const movieRating = document.createElement('p'); // Create new paragraph element for rating
        movieRating.textContent = `Rating: ${movie.imDbRating}`; // Assuming 'imdbRating' is the correct key
        
        
        const addToFavoritesButton = document.createElement('button');
        addToFavoritesButton.textContent = 'Add to Favorites';
        addToFavoritesButton.classList.add('add-to-favorites');
        let movieData = {
            fullTitle: movie.fullTitle,
            image: movie.image,
            title: movie.title,
            imDbRating: movie.imDbRating
          };
        addToFavoritesButton.addEventListener('click', () => {
            addToFavorites(movieData);
          
       
        });

        movieCard.appendChild(movieLink);
        movieCard.appendChild(movieTitle);
        movieCard.appendChild(movieRating); 
        movieCard.appendChild(addToFavoritesButton);

        mostPopularContainer.appendChild(movieCard);
    });
}

// Call the function to fetch and display movies
(async function() {
  const mostPopularMovies = await fetchMostPopularMovies();
  createMostPopularMovieCards(mostPopularMovies.slice(0, 15));
})();

const topRatedContainer = document.querySelector('#top-10');

async function fetchTopRatedMovies() {
    try {
        const response = await fetch(apiUrl2, {
            method: "GET",
            headers: {
                'X-RapidAPI-Host': 'imdb-api.com',
                'X-RapidAPI-Key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const movieData = await response.json();
            return movieData.items; // Assuming the movies are in a property named 'items'.
        }
    } catch (error) {
        console.log('There has been a problem with your fetch operation: ', error);
    }
}

function createTopRatedMovieCards(movieData) {
    movieData.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('bg-white-500', 'text-white', 'text-center', 'py-2', 'rounded', 'cursor-pointer', 'hover:bg-white-700', 'w-40', 'h-80');
    
        const movieLink = document.createElement('a');
        movieLink.href = movie.fullTitle;
    
        const movieImage = document.createElement('img');
        movieImage.classList.add('image-size');
        movieImage.src = movie.image;
        movieImage.alt = movie.title;
        movieLink.appendChild(movieImage);
    
        movieCard.appendChild(movieLink);
    
        const movieTitle = document.createElement('h3');
        movieTitle.textContent = movie.title;
        movieCard.appendChild(movieTitle);

        const movieRating = document.createElement('p');
        movieRating.textContent = `Rating: ${movie.imDbRating}`;
        movieCard.appendChild(movieRating);
        
        const addToFavoritesButton = document.createElement('button');
        addToFavoritesButton.textContent = 'Add to Favorites';
        addToFavoritesButton.classList.add('add-to-favorites');
        let movieData = {
            fullTitle: movie.fullTitle,
            image: movie.image,
            title: movie.title,
            imDbRating: movie.imDbRating
          };
        addToFavoritesButton.addEventListener('click', () => {
            addToFavorites(movieData);
          
      
        });
    
        movieCard.appendChild(movieLink);
        movieCard.appendChild(movieTitle);
        movieCard.appendChild(movieRating); 
        movieCard.appendChild(addToFavoritesButton);
        topRatedContainer.appendChild(movieCard);
    });
}

// Call the function to fetch and display top rated movies
(async function() {
    const topRatedMovies = await fetchTopRatedMovies();
    // Only take the first 10 movies
    createTopRatedMovieCards(topRatedMovies.slice(0, 10));
})();

const boxOfficeContainer = document.querySelector('#Box-Office');

async function fetchBoxOfficeMovies() {
    try {
        const response = await fetch(apiurl1, {
            method: "GET",
            headers: {
                'X-RapidAPI-Host': 'imdb-api.com',
                'X-RapidAPI-Key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const movieData = await response.json();
            return movieData.items; // Assuming the movies are in a property named 'items'.
        }
    } catch (error) {
        console.log('There has been a problem with your fetch operation: ', error);
    }
}

function createBoxOfficeMovieCards(movieData) {
    movieData.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('bg-white-500', 'text-white', 'text-center', 'py-2', 'rounded', 'cursor-pointer', 'hover:bg-white-700', 'w-40', 'h-80');
    
        const movieLink = document.createElement('a');
        movieLink.href = movie.fullTitle;
    
        const movieImage = document.createElement('img');
        movieImage.classList.add('image-size');
        movieImage.src = movie.image;
        movieImage.alt = movie.title;
        movieLink.appendChild(movieImage);
    
        movieCard.appendChild(movieLink);
    
        const movieTitle = document.createElement('h3');
        movieTitle.textContent = movie.title;
        movieCard.appendChild(movieTitle);

        const movieRating = document.createElement('p');
        movieRating.textContent = `Rating: ${movie.imDbRating}`;
        movieCard.appendChild(movieRating);
        const addToFavoritesButton = document.createElement('button');
        addToFavoritesButton.textContent = 'Add to Favorites';
        addToFavoritesButton.classList.add('add-to-favorites');
        let movieData = {
            fullTitle: movie.fullTitle,
            image: movie.image,
            title: movie.title,
            imDbRating: movie.imDbRating
          };
        addToFavoritesButton.addEventListener('click', () => {
            addToFavorites(movieData);
          
      
        });
    
        movieCard.appendChild(movieLink);
        movieCard.appendChild(movieTitle);
        movieCard.appendChild(movieRating); 
        movieCard.appendChild(addToFavoritesButton);
        boxOfficeContainer.appendChild(movieCard);
    });
}

// Call the function to fetch and display top box office movies
(async function() {
    const boxOfficeMovies = await fetchBoxOfficeMovies();
    // Only take the first 10 movies
    createBoxOfficeMovieCards(boxOfficeMovies.slice(0, 10));


})();

const upcomingContainer = document.querySelector('#Upcoming');

async function fetchUpcomingMovies() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjk2NTc2ZGUyYmQ2MzE0NWQ3NjBlZjEyNjYwMDhjNCIsInN1YiI6IjY0YzliZmI4MGI3NGU5MDEwYjhhNzRmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GFUv0pcJesjS8uUzYScx2grfKqs_63yjojoorjv79c0'
        }
    };

    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const movieData = await response.json();
            return movieData.results; // Assuming the movies are in a property named 'results'.
        }
    } catch (error) {
        console.log('There has been a problem with your fetch operation: ', error);
    }
}

function createUpcomingMovieCards(movieData) {
    movieData.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('bg-white-500', 'text-white', 'text-center', 'py-2', 'rounded', 'cursor-pointer', 'hover:bg-white-700', 'w-40', 'h-80');

        const movieLink = document.createElement('a');
        movieLink.href = `https://www.themoviedb.org/movie/${movie.id}`;

        const movieImage = document.createElement('img');
        movieImage.classList.add('image-size');
        movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        movieImage.alt = movie.title;
        movieLink.appendChild(movieImage);

        movieCard.appendChild(movieLink);

        const movieTitle = document.createElement('h3');
        movieTitle.textContent = movie.title;
        movieCard.appendChild(movieTitle);

        const movieRating = document.createElement('p');
        movieRating.textContent = `Rating: ${movie.vote_average}`;
        movieCard.appendChild(movieRating);
        
        const addToFavoritesButton = document.createElement('button');
        addToFavoritesButton.textContent = 'Add to Favorites';
        addToFavoritesButton.classList.add('add-to-favorites');
        let movieData = {
            fullTitle: `https://www.themoviedb.org/movie/${movie.id}`,
            image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            title: movie.title,
            imDbRating: movie.vote_average
        };
        addToFavoritesButton.addEventListener('click', () => {
            addToFavorites(movieData);
        });

        movieCard.appendChild(movieLink);
        movieCard.appendChild(movieTitle);
        movieCard.appendChild(movieRating); 
        movieCard.appendChild(addToFavoritesButton);
        upcomingContainer.appendChild(movieCard);
    });
}

// Call the function to fetch and display upcoming movies
(async function() {
    const upcomingMovies = await fetchUpcomingMovies();
    // Only take the first 10 movies
    createUpcomingMovieCards(upcomingMovies.slice(0, 10));
})();
