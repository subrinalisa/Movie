/*====================================
Functions
======================================*/
const owlActivation = (container) => {
    const check = container.classList.contains('owl-carousel');
    if (check) {
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
    } else {
        return false;
    }
}
const renderData = (data, container) => {
    const check = container.classList.contains('row');
    data.map((element) => {
        let name = element.title ? element.title : element.name;
        let img = `https://image.tmdb.org/t/p/w500/${element.poster_path}`;
        img = element.poster_path != null ? img : imgLink;
        let rating = element.vote_average;
        let overview = element.overview ? element.overview : 'No information available';
        if (check) {
            container.innerHTML += `
                <div class="col-md-4 col-xl-3">
                    <div class="single">
                        <div class="card">
                            <figure>
                                <a href="details.html"><img src=${img} class="img-fluid" alt="${name}"></a>
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
                            </div>
                        </div>
                    </div>
                </div>
                `
        } else {
            container.innerHTML += `
                <div class="single">
                    <div class="card">
                        <figure>
                            <a href="details.html"><img src=${img} class="img-fluid" alt="${name}"></a>
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
                        </div>
                    </div>
                </div>
                `
        }
    });
    owlActivation(container);
}
const fetchData = async (url, container) => {
    const res = await fetch(url);
    const data = await res.json();
    renderData(data.results, container);
}
/*====================================
DOM Elements
======================================*/
const apiKey = 'cc1515597480af4c70bc29393fc2e4ac';
const movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`;
const tvUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=popularity.desc`;
const imgLink = `https://i.ibb.co/BqCkWGx/Untitled-design.jpg`;

const topMovies = document.querySelector('#top-movies .owl-carousel');
const topSeries = document.querySelector('#top-series .owl-carousel');
const allMovies = document.querySelector('#movies .content');
const allSeries = document.querySelector('#series .content');
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