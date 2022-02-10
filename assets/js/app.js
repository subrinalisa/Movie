/*====================================
DOM Elements
======================================*/
const apiKey = 'cc1515597480af4c70bc29393fc2e4ac';
const defaultImg = `https://i.ibb.co/BqCkWGx/Untitled-design.jpg`;
const movies = document.querySelector('#movies');
const body = document.body;
const genre = document.querySelector('#navigation .dropdown-menu');
const series = document.querySelector('#series');
const searchSection = document.querySelector('.searching');
const search = document.querySelector('#searching');
const searchForm = document.querySelector('#search-form');
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');
const currBtn = document.querySelector('#currBtn');
let pageNumber = 1;
let genreID = '';
let searchQuery = '';
/*====================================
Owl Carousel Activation
======================================*/
const owlActivation = (container) => {
    const carousel = container.classList.contains('owl-carousel');
    if (carousel) {
        $(container).owlCarousel({
            loop: true,
            margin: 15,
            nav: true,
            navText: [`<i class="bi bi-chevron-left text-white"></i>`, `<i class="bi bi-chevron-right text-white"></i>`],
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                768: {
                    items: 3
                },
                1000: {
                    items: 4
                },
                1200: {
                    items: 5
                }
            }
        });
    }
}
/*====================================
Pagination
======================================*/
if (prevBtn || nextBtn || currBtn) {
    prevBtn.addEventListener('click', e => {
        if (pageNumber > 1) {
            pageNumber = pageNumber - 1;
            if (movies) {
                fetchData('movie', movies, 0);
            } else {
                fetchData('tv', series, 0);
            }
        } else {
            alert('Invalid Request');
        }
        currBtn.textContent = pageNumber;
    });
    nextBtn.addEventListener('click', e => {
        pageNumber = pageNumber + 1;
        if (movies) {
            fetchData('movie', movies, 0);
        } else {
            fetchData('tv', series, 0);
        }
        currBtn.textContent = pageNumber;
    });
}
/*====================================
Trailer Modal
======================================*/
body.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-btn')) {
        const id = e.target.getAttribute('data-id');
        const type = e.target.getAttribute('data-type');
        const url = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${apiKey}`;
        trailerShow(url);
    }
})
const trailerShow = async (url) => {
    const res = await fetch(url);
    let data = await res.json();
    data = data.results[0];
    const previewModal = document.querySelector('#preview .ratio');
    previewModal.innerHTML = `
    <iframe src="https://www.youtube.com/embed/${data.key}?autoplay=1" title="${data.name}" allow='autoplay' allowfullscreen></iframe>`;
}
const stopVdo = () => {
    $("#preview iframe").attr('src', '');
}
/*====================================
Genre Filter & Searching
======================================*/
const fetchGenre = async (type) => {
    const url = `https://api.themoviedb.org/3/genre/${type}/list?api_key=${apiKey}&language=en-US`;
    const res = await fetch(url);
    const data = await res.json();
    data.genres.forEach((element, index) => {
        if (index > 14)
            return
        genre.innerHTML += `<li><a class="dropdown-item" role="button" genre-id="${element.id}">${element.name}</a></li>`;
    });
}
genre.addEventListener('click', e => {
    genreID = e.target.getAttribute('genre-id');
    searchValue = 0;
    fetchData('movie', search, 0);
    searchSection.style.display = 'block';
});
searchForm.addEventListener('submit', e => {
    searchValue = 1;
    e.preventDefault();
    searchQuery = searchForm.querySelector('input').value;
    fetchData('', search, 1);
    searchSection.style.display = 'block';
    searchForm.querySelector('input').value = '';
});
/*====================================
Rendered Data to Dom
======================================*/
const renderData = (data, container, type) => {
    container.innerHTML = '';
    let markup = '';
    data.map((element) => {
        let name = element.title ? element.title : element.name;
        let img = `https://image.tmdb.org/t/p/w500/${element.poster_path}`;
        img = element.poster_path != null ? img : defaultImg;
        let rating = element.vote_average;
        let overview = element.overview ? element.overview : 'No information available';
        let release = element.release_date ? element.release_date : element.first_air_date;
        release = release ? release.slice(0, 4) : release;
        markup = `
        <div class="single">
            <div class="card">
                <figure>
                    <a href="#preview" data-bs-toggle="modal"><img src=${img} class="img-fluid modal-btn" alt="${name}" data-id="${element.id}" data-type="${type}"></a>
                    <span>${release}</span>
                </figure>
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <div class="name">${name}</div>
                        <div class="rating text-warning">${rating}</div>
                    </div>
                </div>
                <div class="card-footer">
                    <h6>Overview:</h6>
                    <hr>
                    <p>${overview}</p>
                    <button type="button" class="btn modal-btn" data-bs-target="#preview" data-bs-toggle="modal" data-id="${element.id}" data-type="${type}">Watch Trailer</button>
                </div>
            </div>
        </div>`;
        if (container.classList.contains('row')) {
            container.innerHTML += `
            <div class="col-md-4 col-xl-3">
                ${markup}
            </div>`;
        } else {
            container.innerHTML += markup;
        }
    });
    jQuery("#preloader").show().fadeOut(250);
    owlActivation(container);
}
/*====================================
Fetch Data
======================================*/
const fetchData = async (type, container, searchValue) => {
    let url = '';
    if (searchValue) {
        url = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${searchQuery}`;
    } else {
        url = `https://api.themoviedb.org/3/discover/${type}?api_key=${apiKey}&page=${pageNumber}&with_genres=${genreID}`;
    }
    const res = await fetch(url);
    const data = await res.json();
    renderData(data.results, container, type);
}
/*====================================
Initial
======================================*/
if (movies) {
    fetchData('movie', movies, 0);
}
if (series) {
    fetchData('tv', series, 0);
}
fetchGenre('movie');