const global = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  api: {
    apiKey: '42800da2d7c030192c267c15664aab8f',
    apiURL: 'https://api.themoviedb.org/3/',
  },
};
// Display movies
const displayPopularMovies = async () => {
  const { results } = await fetchAPIData('movie/popular');

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

// Display movie details
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

// Display tv shows
const displayPopularTVShows = async () => {
  const { results } = await fetchAPIData('tv/popular');

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

// Display tv show details
const displayShowDetails = async () => {
  const seriesId = window.location.search.split('=')[1];
  console.log(seriesId);

  const series = await fetchAPIData(`tv/${seriesId}`);
  console.log(series);

  displayBackgroundImage('series', series.backdrop_path);

  const div = document.createElement('div');
  div.innerHTML = `<div class="details-top">
          <div>
            ${
              series.poster_path
                ? `<img
                src='https://image.tmdb.org/t/p/w500${series.poster_path}'
                class='card-img-top'
                alt='${series.name}'
              />`
                : `<img
                src='../images/no-image.jpg'
                class='card-img-top'
                alt='${series.name}'
              />`
            }
          </div>
          <div>
            <h2>${series.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${series.vote_average} / 10
            </p>
            <p class="text-muted">Release Date: ${series.first_air_date}</p>
            <p>
              ${series.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
               ${series.genres
                 .map((genre) => `<li>${genre.name}</li>`)
                 .join('')}
            </ul>
            <a href="${
              series.homepage
            }" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${
              series.number_of_episodes
            }</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${
                series.last_episode_to_air.air_date
              }
            </li>
            <li><span class="text-secondary">Status:</span> ${
              series.status
            }</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${series.production_companies
            .map((company) => `<span>${company.name}</span>`)
            .join(', ')}</div>
        </div>`;

  document.querySelector('#show-details').appendChild(div);
};

// Show/hide spinner
const toggleSpinner = () => {
  const el = document.querySelector('.spinner');

  if (!el.classList.contains('show')) {
    el.classList.add('show');
  } else {
    el.classList.remove('show');
  }
};

// Highlight menu link
const highlightActiveLink = () => {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
    numberWithCommas;
  });
};

// Number formatting
const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Display backdrop movie/tv show poster
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

// Display movie slider
const displaySlider = async () => {
  const { results } = await fetchAPIData('movie/now_playing');

  results.forEach((result) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');

    div.innerHTML = `<a href="movie-details.html?id=${result.id}">
    <img src="https://image.tmdb.org/t/p/w500${result.poster_path}" alt="${result.title}" />
      </a> <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${result.vote_average} / 10
            </h4>`;

    document.querySelector('.swiper-wrapper').appendChild(div);

    initSwiper();
  });
};

const displaySearchResults = (results) => {
  // Clear the div containers
  document.querySelector('#search-results').innerHTML = '';
  document.querySelector('#search-results-heading').innerHTML = '';
  document.querySelector('#pagination').innerHTML = '';

  results.forEach((result) => {
    const div = document.createElement('div');
    div.classList.add('card');

    div.innerHTML = `<a href="${global.search.type}-details.html?id=${
      result.id
    }">
      ${
        result.poster_path
          ? `<img
            src="https://image.tmdb.org/t/p/w500${result.poster_path}"
            class="card-img-top"
            alt="${global.search.type === 'movie' ? result.title : result.name}"
          /> `
          : `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${global.search.type === 'movie' ? result.title : result.name}"
          />`
      }
      </a>
      <div class="card-body">
        <h5 class="card-title">${
          global.search.type === 'movie' ? result.title : result.name
        }</h5>
        <p class="card-text">
          <small class="text-muted">Release: ${
            global.search.type === 'movie'
              ? result.release_date
              : result.first_air_date
          }</small>
        </p>
        
      </div>`;

    document.querySelector('#search-results').appendChild(div);
    document.querySelector(
      '#search-results-heading'
    ).innerHTML = `<h2>${results.length} of ${global.search.totalResults} Results for ${global.search.term}</h2>`;
  });

  displayPagination();
};

// Create and display pagination for search
const displayPagination = () => {
  const div = document.createElement('div');
  div.classList.add('pagination');

  div.innerHTML = `<button class="btn btn-primary" id="prev">Prev</button>
          <button class="btn btn-primary" id="next">Next</button>
          <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>`;

  document.querySelector('#pagination').appendChild(div);

  // Disable previous button if on first page
  if (global.search.page === 1) {
    document.querySelector('#prev').disabled = true;
  }

  // Disable next button if on last page
  if (global.search.page === global.search.totalPages) {
    document.querySelector('#next').disabled = true;
  }

  // Next page
  document.querySelector('#next').addEventListener('click', async () => {
    global.search.page++;
    const { results } = await searchAPIData();
    displaySearchResults(results);
  });

  // Previous page
  document.querySelector('#prev').addEventListener('click', async () => {
    global.search.page--;
    const { results } = await searchAPIData();
    displaySearchResults(results);
  });
};

// Show alert
const showAlert = (message, className = 'error') => {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);

  alertEl.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alertEl);

  setTimeout(() => alertEl.remove(), 3000);
};

// Search movies/show from API
const search = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');

  if (global.search.type !== '' && global.search.term !== '') {
    const { results, total_pages, page, total_results } = await searchAPIData();

    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;

    if (results.length === 0) {
      showAlert('No results found');
      return;
    }

    displaySearchResults(results);

    document.querySelector('#search-term').value = '';
  } else {
    showAlert('Please enter a search term');
  }
};

// Fetch data from API
const fetchAPIData = async (endpoint) => {
  toggleSpinner();

  const response = await fetch(
    `${global.api.apiURL}${endpoint}?api_key=${global.api.apiKey}&language=en-US`
  );
  const data = await response.json();

  toggleSpinner();

  return data;
};

// Make request to search
const searchAPIData = async () => {
  toggleSpinner();

  const response = await fetch(
    `${global.api.apiURL}search/${global.search.type}?api_key=${global.api.apiKey}&language=en-US&query=${global.search.term}&page=${global.search.page}`
  );
  const data = await response.json();

  toggleSpinner();

  return data;
};

// Initialize movie slider
const initSwiper = () => {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
};

// Init app
const init = () => {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displaySlider();
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularTVShows();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      displayShowDetails();
      break;
    case '/search.html':
      search();
      break;
  }

  highlightActiveLink();
};

// Events
document.addEventListener('DOMContentLoaded', init);
