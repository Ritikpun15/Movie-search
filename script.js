let moviesBox = document.querySelector(".movies-list");
let search = document.querySelector("#search");
let tags = document.querySelector("#tags");
let next = document.querySelector(".nextBtn");
let previous = document.querySelector(".previousBtn");
let page = document.querySelector(".page");
let num = 1;
let totalNum = 100;

const BASEURL =
  "https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1";
const APIURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=`;
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const GENREAPI = `https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&sort_by=popularity&total_pages=5&with_genres=`;

const getMovies = async (APIURL) => {
  const response = await fetch(APIURL);
  const data = await response.json();
  showMovies(data);
};

const showMovies = (data) => {
  moviesBox.innerHTML = "";
  data.results.forEach((item) => {
    let box = document.createElement("div");
    box.classList.add("box");
    box.innerHTML = ` <img src="${IMGPATH + item.poster_path}" alt="" />
        <div class="overlay">
          <div class="title">
            <h2>${item.title}</h2>
            <span class="rating">${item.vote_average.toFixed(1)}</span>
          </div>
          <h5>Release Date : ${item.release_date}</h5>
          <h3>Overview :</h3>
          <p>
            ${item.overview}
          </p>
        </div>`;
    moviesBox.appendChild(box);
    page.innerText = `Page ${data.page}`;
  });
};

search.addEventListener("keyup", (e) => {
  if (e.target.value != "") {
    getMovies(SEARCHAPI + e.target.value);
  } else {
    getMovies(APIURL);
  }
});

getMovies(APIURL);

function toggleBtn() {
  if (tags.style.display == "block") {
    tags.style.display = "none";
  } else {
    tags.style.display = "block";
  }
}

let genres = [
  { id: 28, name: "Action" },

  { id: 12, name: "Adventure" },

  { id: 16, name: "Animation" },

  { id: 35, name: "Comedy" },

  { id: 80, name: "Crime" },

  { id: 99, name: "Documentary" },

  { id: 18, name: "Drama" },

  { id: 10751, name: "Family" },

  { id: 14, name: "Fantasy" },

  { id: 36, name: "History" },

  { id: 27, name: "Horror" },

  { id: 10402, name: "Music" },

  { id: 9648, name: "Mystery" },

  { id: 10749, name: "Romance" },

  { id: 878, name: "Science Fiction" },

  { id: 10770, name: "TV Movie" },

  { id: 53, name: "Thriller" },

  { id: 10752, name: "War" },

  { id: 37, name: "Western" },
];

const setGenre = () => {
  tags.innerHTML = "";
  genres.forEach((genre) => {
    let tag = document.createElement("div");
    tag.classList.add("tag");
    tag.id = genre.id;
    tag.innerText = genre.name;
    tag.addEventListener("click", (event) => {
      getMovies(GENREAPI + event.target.id);
      document.querySelector("#pages").innerHTML = "";
    });
    tags.appendChild(tag);
  });
};

setGenre();

next.addEventListener("click", () => {
  if (num >= totalNum) {
    num = 1;
  } else {
    num += 1;
  }
  getMovies(APIURL + num);
});

previous.addEventListener("click", () => {
  if (num == 1) {
    num = 100;
  } else {
    num -= 1;
  }
  getMovies(APIURL + num);
});
