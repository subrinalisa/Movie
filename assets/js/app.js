/*====================================
Functions
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
const renderData = (data, container) => {
    container.innerHTML = '';
    let markup = '';
    data.map((element) => {
        let name = element.title ? element.title : element.name;
        let img = `https://image.tmdb.org/t/p/w500/${element.poster_path}`;
        img = element.poster_path != null ? img : imgLink;
        let rating = element.vote_average;
        let overview = element.overview ? element.overview : 'No information available';
        let release = element.release_date ? element.release_date : element.first_air_date;
        let type = element.title ? 'movie' : 'tv';
        markup = `
        <div class="single">
            <div class="card">
                <figure>
                    <a href="#preview" class="" data-bs-toggle="modal"><img src=${img} class="img-fluid modal-link" alt="${name}" data-id="${element.id}" data-type="${type}"></a>
                    <span>${release.slice(0, 4)}</span>
                </figure>
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <div class="name">
                            ${name}
                        </div>
                        <div class="rating text-warning">
                            ${rating}
                        </div>
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
    owlActivation(container);
}
const fetchData = async (url, container) => {
    lastUrl = url;
    const res = await fetch(url);
    const data = await res.json();
    currPage = data.page;
    renderData(data.results, container);
}
const pagination = (url) => {
    if (allMovies) {
        jQuery("#preloader").show().fadeOut(250);
        fetchData(url, allMovies);
    } else if (allSeries) {
        jQuery("#preloader").show().fadeOut(250);
        fetchData(url, allSeries);
    }
}
/*====================================
DOM Elements
======================================*/
const apiKey = 'cc1515597480af4c70bc29393fc2e4ac';
const movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`;
const tvUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=popularity.desc`;
const imgLink = `https://i.ibb.co/BqCkWGx/Untitled-design.jpg`;
let currPage = 1;
let lastUrl = '';
const body = document.body;
const topMovies = document.querySelector('#top-movies .owl-carousel');
const topSeries = document.querySelector('#top-series .owl-carousel');
const allMovies = document.querySelector('#movies .content');
const allSeries = document.querySelector('#series .content');
const searchingSection = document.querySelector('#searching');
const searching = document.querySelector('#searching .content');
const searchForm = document.querySelector('#search');
const searchInput = document.querySelector('#search input');
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');
const currBtn = document.querySelector('#currBtn');
searchingSection.style.display = 'none';
/*====================================
Functions Calling
======================================*/
if (topMovies) {
    fetchData(movieUrl, topMovies);
}
if (topSeries) {
    fetchData(tvUrl, topSeries);
}
if (allMovies) {
    fetchData(movieUrl, allMovies);
}
if (allSeries) {
    fetchData(tvUrl, allSeries);
}
if (prevBtn || nextBtn) {
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        lastUrl = lastUrl + `&page=${currPage+1}`;
        pagination(lastUrl);
        currBtn.innerText = `${currPage+1}`;
    });
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currPage > 1) {
            lastUrl = lastUrl + `&page=${currPage-1}`;
            pagination(lastUrl);
            currBtn.innerText = `${currPage-1}`;
        } else {
            alert(`Invalid Request`);
        }
    });
}
/*====================================
Event
======================================*/
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = searchInput.value;
    const url = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${v}`;
    searchingSection.style.display = 'block';
    fetchData(url, searching);
    searchInput.value = '';
});
body.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-link') || e.target.classList.contains('modal-btn')) {
        const id = e.target.getAttribute('data-id');
        const type = e.target.getAttribute('data-type');
        const url = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${apiKey}`;
        modalUpdate(url);
    }
})
const modalUpdate = async (url) => {
    const res = await fetch(url);
    let data = await res.json();
    data = data.results[0];
    const previewModal = document.querySelector('#preview .ratio');
    previewModal.innerHTML = `
    <iframe src="https://www.youtube.com/embed/${data.key}?autoplay=1" title="${data.name}" allow='autoplay' allowfullscreen></iframe>
    `;
}
const stopVdo = () => {
    $("#preview iframe").attr('src', '');
}