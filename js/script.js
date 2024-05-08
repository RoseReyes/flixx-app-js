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

const displayMovieDetails = async () => {
  const movieId = window.location.search.split('=')[1];
  const movie = await fetchAPIData(`movie/${movieId}`);

  displayBackgroundImage('movie', movie.backdrop_path);

  const div = document.createElement('div');
  div.innerHTML = `<div class="details-top">
            <div>
              ${
                movie.poster_path
                  ? `<img
                src='https://image.tmdb.org/t/p/w500${movie.poster_path}'
                class='card-img-top'
                alt='${movie.title}'
              />`
                  : `<img
                src='../images/no-image.jpg'
                class='card-img-top'
                alt='${movie.title}'
              />`
              }
            </div>
            <div>
              <h2>${movie.title}</h2>
              <p>
                <i class="fas fa-star text-primary"></i>
                ${movie.vote_average} / 10
              </p>
              <p class="text-muted">Release Date: ${movie.release_date}</p>
              <p>
                ${movie.overview}
              </p>
              <h5>Genres</h5>
              <ul class="list-group">
                ${movie.genres
                  .map((genre) => `<li>${genre.name}</li>`)
                  .join('')}
              </ul>
              <a href="${
                movie.homepage
              }" target="_blank" class="btn">Visit Movie Homepage</a>
            </div>
          </div>
          <div class="details-bottom">
            <h2>Movie Info</h2>
            <ul>
              <li><span class="text-secondary">Budget:</span> $${numberWithCommas(
                movie.budget
              )}</li>
              <li><span class="text-secondary">Revenue:</span> $${numberWithCommas(
                movie.revenue
              )}</li>
              <li><span class="text-secondary">Runtime:</span> ${
                movie.runtime
              } minutes</li>
              <li><span class="text-secondary">Status:</span> ${
                movie.status
              }</li>
            </ul>
            <h4>Production Companies</h4>
            <div class="list-group">${movie.production_companies
              .map((company) => `<span>${company.name}</span>`)
              .join(', ')}</div>
          </div>`;

  document.querySelector('#movie-details').appendChild(div);
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
    numberWithCommas;
  });
};

const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const displayBackgroundImage = (type, path) => {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://tmdb.org/t/p/original/${path})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
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
      displayMovieDetails();
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
