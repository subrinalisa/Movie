<h2>Movie Club</h2>
<p>It is a demo movie website. User can find latest or top rated movies or series from here.</p>
<h2>Live Link: <a href="https://subrinalisa.github.io/Movie/" style="font-size: 18px;">Demo</a></h2>
<h2>Work Description</h2>
<ul>
    <li>
        <b>Initial Stage:</b> Initially some global variables(pageNumber, genreID, searchValue, searchQuery) are
        defined with an initial value. It will then invoke <b>fetchData</b> function.
    </li>
    <li>
        <p><b>Fetch Data:</b> It is an asynchronous function. It takes two parameters- type(movie/tv), container.
            Async-await library is used to fetch the data
            through api.</p>
        <p>It has two types of url - one is for searching data & another is for printing data into
            dom.
            If searchValue is not empty then it'll call for the searching url. Otherwise it'll set the url for
            discovering
            movies/tv. After fetching the data & converted it into json format, it is then sent to <b>renderData</b>
            function.</p>
    </li>
    <li>
        <b>Render Data:</b> This function takes three parameters - data, container(dom element), type(movie/tv). The
        data array is mapped to get each element's information.
        After rendering all data into the dom, it will call <b>owlActivation</b> function.
    </li>
    <li>
        <b>Owl Activation:</b> This function takes one parameter - container. It will check
        either it's container contains class='owl-carousel' or not. If yes, then it will activate owl carousel
        plugin to
        that container. Otherwise it won't be executed.
    </li>
    <li>
        <p><b>Genre Filter:</b> It'll call <b>fetchGenre</b> function initially. This is an asynchronous function.
            It will call for an api & resultant data are stored into the navigation dropdown menu <b>Genre</b></p>
        <p>Once any genre category is clicked, it'll call the <b>fetchData</b> function with its genre id. The
            <b>searchValue</b> is set to zero, so that it doesn't call the search url for rendering data.
        </p>
    </li>
    <li>
        <b>Search Data:</b> It is an event listener. Each time the user writes something to the searchbar & hits
        enter, the value will be added to the <b>searchQuery</b> variable & call <b>fetchData</b> function. The
        <b>searchValue</b> is set to one, so that it should call the search url for rendering data.
    </li>
    <li>
        <p><b>Watch Trailer:</b> Once user clicks on the image or hit the watch trailer button, a modal will be
            popped up with a short youtube clip. It is at first take the data id(key value) & type(movie/tv) &
            generate
            a url to fetch the videos. The data contains a couple of short video clips, but only the first one is
            selected here.</p>
        <p>To stop playing the video in background <b>stopVdo</b> function is called. It will set
            the
            source empty when user closes the popup.</p>
    </li>
    <li>
        <b>Pagination:</b> It has three buttons- previous, current & next. Initially the pageNumber is set to 1.
        When user clicks the next button it'll add plus 1 to the pageNumber & call the <b>fetchData</b> function to
        render data according to the page number. Similarly when user hits the previous button, pageNumber is
        decreased by 1 & call the <b>fetchData</b> function. The current page number is updated into the Dom.
    </li>
    <li>
        <b>Dom:</b> If any movie or tv doesn't have an image, it'll then show a default image defined in
        <b>defaultImg</b> variable. If the movie/tv doesn't have an overview, it will print <b>No information
            available</b> in the description. If the movie/tv doesn't have a release, it will print
        <b>undefined</b>.
    </li>
</ul>
<h2>Api Used</h2>
<p>
    The Movie Database (TMDB) API
</p>
<h2>Challenges</h2>
<ul>
    <li>Rendering data into carousel</li>
    <li>No preview image</li>
    <li>Movie's/Tv's long name breaks the layout</li>
</ul>
<h2>Solutions</h2>
<ul>
    <li>Activate the carousel after rendering data into the element</li>
    <li>Make a default image with same dimension as other images(500x750) & generate an image link</li>
    <li>Set a height for movie/tv name div</li>
</ul>
<h2>Technology Used</h2>
<ul>
    <li>Html</li>
    <li>Css</li>
    <li>Css Animation</li>
    <li>Sass</li>
    <li>Bootstrap</li>
    <li>Jquery</li>
    <li>Javascript</li>
    <li>Javascript Api</li>
    <li>Owl Carousel</li>
</ul>
<h2>Files Used</h2>
<table>
    <tr>
        <th>File Name</th>
        <th>Description</th>
        <th>Location</th>
    </tr>
    <tr>
        <td>style.scss</td>
        <td>For styling the website</td>
        <td>assets/css/style.scss</td>
    </tr>
    <tr>
        <td>app.js</td>
        <td>For rendering data through api</td>
        <td>assets/js/app.js</td>
    </tr>
</table>
<h2>Future Features</h2>
<ul>
    <li>Code will be more optimized</li>
    <li>Design will be updated</li>
</ul>
