const global = {
  currentPage: window.location.pathname,
};

const displayPopularMovies = async () => {
  const {results} = await fetchAPIData('movie/popular');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');

    div.innerHTML = `<a href='movie-details.html?id=${movie.id}'>
          ${
            movie.poster_path
              ? `<img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class='card-img-top'
            alt="${movie.title}"
          />`
              : `<img
            src="../images/no-image.jpg"
            class='card-img-top'
            alt='Movie Title'
          />`
          }
        </a>
        <div class='card-body'>
          <h5 class='card-title'>${movie.title}</h5>
          <p class='card-text'>
            <small class='text-muted'>Release: ${movie.release_date}</small>
          </p>
        </div>`;

    // append to main div
    document.getElementById('popular-movies').appendChild(div);
  });
};

const displayPopularTVShows = async () => {
  const {results} = await fetchAPIData('tv/popular');

  results.forEach((tv) => {
    const div = document.createElement('div');
    div.classList.add('card');

    div.innerHTML = `<a href="tv-details.html?id=${tv.id}">
            ${
              tv.poster_path
                ? `<img
            src="https://image.tmdb.org/t/p/w500${tv.poster_path}"
            class='card-img-top'
            alt="${tv.name}"
          />`
                : `<img
            src="../images/no-image.jpg"
            class='card-img-top'
            alt='Movie Title'
          />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${tv.name}</h5>
            <p class="card-text">
              <small class="text-muted">Aired: ${tv.first_air_date}</small>
            </p>
          </div>`;

    document.getElementById('popular-shows').appendChild(div);
  });
};

// Fetch data from API
const fetchAPIData = async (endpoint) => {
  const API_KEY = '42800da2d7c030192c267c15664aab8f';
  const API_URL = 'https://api.themoviedb.org/3/';

  toggleSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();

  toggleSpinner();

  return data;
};

const toggleSpinner = () => {
  const el = document.querySelector('.spinner');

  if (!el.classList.contains('show')) {
    el.classList.add('show');
  } else {
    el.classList.remove('show');
  }
};

const highlightActiveLink = () => {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
};

// Init app
const init = () => {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularTVShows();
      break;
    case '/movie-details.html':
      console.log('Movie Details');
      break;
    case '/tv-details.html':
      console.log('TV Show Details');
      break;
    case '/search.html':
      console.log('Search');
      break;
  }

  highlightActiveLink();
};

// Events
document.addEventListener('DOMContentLoaded', init);
