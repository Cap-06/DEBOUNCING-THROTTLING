let debounceTimer;

document.getElementById('movieSearch').addEventListener('input', function(event) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function() {
        fetchMovies(event.target.value);
    }, 1000); // Adjust the debounce delay as needed
});

function fetchMovies(query) {
    const apiKey = '9c472d10'; // Replace with your actual API key
    const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            updateMovieResults(data.Search);
        })
        .catch(error => console.error('Error fetching movies:', error));
}

function updateMovieResults(movies) {
    const movieResultsDiv = document.getElementById('movieResults');
    movieResultsDiv.innerHTML = ''; // Clear previous results

    if (movies) {
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card'); // Add your styles here

            const title = document.createElement('h3');
            title.textContent = movie.Title;

            const year = document.createElement('p');
            year.textContent = `Year: ${movie.Year}`;

            movieCard.appendChild(title);
            movieCard.appendChild(year);
            movieResultsDiv.appendChild(movieCard);
        });
    } else {
        movieResultsDiv.innerHTML = 'No results found';
    }
}