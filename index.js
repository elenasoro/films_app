let films = [
  {
    title: 'The Godfather',
    year: 1972,
    rating: 0
  },
  {
    title: 'The Shawshank Redemption',
    year: 1975,
    rating: 0
  },
  {
    title: 'The Dark Knight',
    year: 2008,
    rating: 0
  },
  {
    title: '12 Angry Man',
    year: 1957,
    rating: 0
  },
  {
    title: 'Shindler\'s List',
    year: 1993,
    rating: 0
  },
  {
    title: 'The Lord of the Rings',
    year: 1991,
    rating: 0
  }
]
  
if(!localStorage.getItem('films')){
  localStorage.setItem('films', JSON.stringify(films.sort(compareRating)));
}

insertFilms()
insertStars()
highlightStars()
handleClick()
handleAddNewFilmClick()

function highlightStars(){
  const films = document.querySelectorAll('.film')
  const filmsArr = JSON.parse(localStorage.getItem("films"))
  films.forEach((film, film_index) => {
    const starsArray = film.querySelectorAll('i'); 
    for(let i = 5 - filmsArr[film_index].rating; i < 5; i++){
     starsArray[i].classList.add('selected')
    }
  })
}

function insertFilms(){
  JSON.parse(localStorage.getItem("films")).forEach(item => {
    let list_item = document.createElement('li');
    list_item.className = 'film';
    list_item.innerHTML = `${item.title} (${item.year})`;
    document.querySelector('#films_list').appendChild(list_item);
  })
}

function insertStars(){
  const film_items = document.querySelectorAll('.film');
  film_items.forEach(item => {
    const rating_container = document.createElement('div');
    rating_container.className = 'rating_container';
    item.appendChild(rating_container);
  })

  const rating_containers = document.querySelectorAll('.rating_container');
  rating_containers.forEach(item => {
    for(let i = 0; i<5; i++){
      const star = document.createElement('i');
      star.className = 'fas fa-star rating_star';
      item.appendChild(star);
    }
  })
}

function handleClick(){
  document.querySelectorAll('.film').forEach((film,film_index) => {
    const starsArray = film.querySelectorAll('i');
    starsArray.forEach((star, star_index) => {
      star.addEventListener('click', function(){
        saveRating(film_index, star_index)
        updateFilmsList()
      })
    })
  })
}

function compareRating(filmA, filmB) {
  return filmB.rating - filmA.rating || compareTitle(filmA, filmB);
}

function compareTitle(a, b) {
  const titleA = a.title.toLowerCase()
  const titleB = b.title.toLowerCase()
  if (titleA < titleB) return -1
  if (titleA > titleB) return 1
  return 0
}

function saveRating(film_index, star_index){
  const films = JSON.parse(localStorage.getItem("films"))
  films[film_index].rating = 5 - star_index
  films.sort(compareRating)
  localStorage.setItem('films', JSON.stringify(films));
}

function highlightSelectedRating(starsArray, star_index) {
  starsArray.forEach(star => {
    star.classList.remove('selected')
  })
  for(let i = star_index; i < starsArray.length; i++){
    starsArray[i].classList.add('selected')
  }
}

function updateFilmsList(){
  films_list.parentNode.removeChild(document.querySelector('ul'))
  let list = document.createElement('ul');
  list.id = 'films_list';
  document.body.insertBefore(list, document.querySelector('script'))
  insertFilms()
  insertStars()
  highlightStars()
  handleClick()
}

function addNewFilm() {
  const title = document.querySelector('#new-film-title').value
  const year = document.querySelector('#new-film-year').value
  const films = JSON.parse(localStorage.getItem('films'))
  films.push({
    title,
    year,
    rating: 0
  })
  localStorage.setItem('films', JSON.stringify(films.sort(compareRating)))
  updateFilmsList()
}

function handleAddNewFilmClick(){
  const button = document.querySelector('.add-film__button')
  button.addEventListener('click', addNewFilm)
}
