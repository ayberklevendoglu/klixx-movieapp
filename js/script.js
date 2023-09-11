const state = {
  currentPage: window.location.pathname,
};

// fetching data from api
const displayPopularMovies = async () => {
  const { results } = await fetchApiData("movie/popular");
  results.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("card");
    movieCard.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
      ${
        movie.poster_path
          ? `<img
        src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
        class="card-img-top"
        alt="${movie.title}"
      />`
          : `<img
      src="images/no-image.png"
      class="card-img-top"
      alt="Movie Title"
    />`
      }
    </a>
    <div class="card-body">
      <h5 class="card-title">${movie.title}</h5>
      <p class="card-text">
        <small class="text-muted">Release: ${movie.release_date}</small>
      </p>
    </div>`;
    document.querySelector("#popular-movies").appendChild(movieCard);
  });
};

const displayPopularShows = async () => {
  const { results } = await fetchApiData("tv/popular");
  results.forEach((show) => {
    const showCard = document.createElement("div");
    showCard.classList.add("card");
    showCard.innerHTML = `
      <a href="tv-details.html?id=${show.id}">
      ${
        show.poster_path
          ? `<img
        src="https://image.tmdb.org/t/p/w500/${show.poster_path}"
        class="card-img-top"
        alt="${show.name}"
      />`
          : `<img
      src="images/no-image.png"
      class="card-img-top"
      alt="Movie Title"
    />`
      }
        </a>
        <div class="card-body">
          <h5 class="card-title">${show.name}</h5>
          <p class="card-text">
            <small class="text-muted">Aired: ${show.first_air_date}</small>
          </p>
      </div>
    `;
    document.querySelector("#popular-shows").appendChild(showCard);
  });
};

const displayMovieDetail = async () => {
  const movieId = window.location.search.split("=")[1];
  const movie = await fetchApiData(`movie/${movieId}`);

  const div = document.createElement("div");

  div.innerHTML = `
  <div class="details-top">
  <div>
  ${
    movie.poster_path
      ? `<img
    src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
    class="card-img-top"
    alt="${movie.title}"
  />`
      : `<img
  src="images/no-image.png"
  class="card-img-top"
  alt="${movie.title}"
/>`
  }
  </div>
  <div>
    <h2>${movie.title}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${movie.vote_average.toFixed(1)}/ 10
    </p>
    <p class="text-muted">Release Date: ${movie.release_date}</p>
    <p>
      ${movie.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
      ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
    </ul>
    <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Movie Info</h2>
  <ul>
    <li><span class="text-secondary">Budget:</span> $${Intl.NumberFormat('en-US').format(movie.budget)}</li>
    <li><span class="text-secondary">Revenue:</span> $${Intl.NumberFormat('en-US').format(movie.revenue)}</li>
    <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
    <li><span class="text-secondary">Status:</span> ${movie.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">${movie.production_companies.map(
    (company) => `${company.name}`
  )}</div>
</div>`;
  document.querySelector("#movie-details").appendChild(div);
};

const displayTvDetail = async () => {
  const showId = window.location.search.split("=")[1];
  const show = await fetchApiData(`tv/${showId}`);

  const div = document.createElement("div");

  div.innerHTML = `<div class="details-top">
  <div>
  ${
    show.poster_path
      ? `<img
    src="https://image.tmdb.org/t/p/w500/${show.poster_path}"
    class="card-img-top"
    alt="${show.title}"
  />`
      : `<img
  src="images/no-image.png"
  class="card-img-top"
  alt="${show.title}"
/>`
  }
  </div>
  <div>
    <h2>${show.name}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${show.vote_average.toFixed(1)}/ 10
    </p>
    <p class="text-muted">Release Date: ${show.first_air_date}</p>
    <p>
      ${show.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
      ${show.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
    </ul>
    <a href="${
      show.homepage
    }" target="_blank" class="btn">Visit Show Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Show Info</h2>
  <ul>
    <li><span class="text-secondary">Number Of Episodes:</span> ${
      show.last_episode_to_air.episode_number
    }</li>
    <li>
      <span class="text-secondary">Last Episode To Air:</span> ${
        show.last_episode_to_air.name
      }
    </li>
    <li><span class="text-secondary">Status:</span> ${show.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">${show.production_companies.map(
    (company) => `${company.name}`
  )}</div>
</div>`;
  document.querySelector("#show-details").appendChild(div);
};

const fetchApiData = async (endpoint) => {
  const API_KEY = "275ff089c230277879324e81a548ced4";
  const API_URL = "https://api.themoviedb.org/3/";
  showSpinner();
  const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}`);
  const data = await response.json();
  hideSpinner();
  return data;
};

const showSpinner = () => {
  document.querySelector(".spinner").classList.add("show");
};
const hideSpinner = () => {
  document.querySelector(".spinner").classList.remove("show");
};

// highlighting active page
const hightlightActiveLink = () => {
  const navLink = document.querySelectorAll(".nav-link");
  navLink.forEach((link) => {
    if (link.getAttribute("href") === state.currentPage) {
      link.classList.add("active");
    }
  });
};

// init app
const init = () => {
  switch (state.currentPage) {
    case "/":
    case "/index.html":
      displayPopularMovies();
      break;
    case "/shows.html":
      displayPopularShows();
      break;
    case "/movie-details.html":
      displayMovieDetail();
      break;
    case "/tv-details.html":
      displayTvDetail();
      break;
    case "/search.html":
      console.log("Search");
      break;
    default:
      break;
  }
  hightlightActiveLink();
};

document.addEventListener("DOMContentLoaded", init);
