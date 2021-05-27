//  Get HTML Elements
let buttonBlock = $(".buttons");



//  Place Movie Data On Page
function renderMovieData(data) {
    let cardSection = $("#card-section");
    console.log(cardSection);
    console.log(data);

    $("#card-section").html("<p class=\"subtitle is-3\">Your recommendations</p>");

    let baseImageURL = "https://image.tmdb.org/t/p/w154";

    /*
        TMBD Poster Sizes
            "poster_sizes": [
            "w92",
            "w154",
            "w185",
            "w342",
            "w500",
            "w780",
            "original"
            ],
    */

    let currentPage = data.page;
    let totalPages = data.total_pages;

    $("#card-section").append("<p>Page: " + currentPage + " of " + totalPages + "</p>");

    //  LOOP REQUIRED
    for (i = 0; i < data.results.length; i++) {

        let cardDiv = $("<div></div>");
        cardDiv.attr("class", "card mb-2");

        let mediaDiv = $("<div></div>");
        mediaDiv.attr("class", "card-content media");

        let mediaLeftDiv = $("<div></div>");
        mediaLeftDiv.attr("class", "media-left");

        let figureImage = $("<figure></figure>");
        figureImage.attr("class", "image is-100x150");

        let movieImage = $("<img />");
        if (data.results[i].poster_path) {
            movieImage.attr("src", baseImageURL + data.results[i].poster_path);
        } else {
            movieImage.attr("src", "");
        }
        movieImage.attr("alt", data.results[i].title + " Poster Image");

        let mediaRightDiv = $("<div></div>");
        mediaRightDiv.attr("class", "media-content");

        let mediaTitle = $("<p></p>");
        mediaTitle.attr("class", "title is-4");
        mediaTitle.append(data.results[i].title);

        let mediaContent = $("<p></p>");
        mediaContent.attr("class", "content is-6");
        mediaContent.append(data.results[i].overview);


        //  Place Movie Elements
        $(movieImage).appendTo(figureImage);
        $(figureImage).appendTo(mediaLeftDiv);

        $(mediaTitle).appendTo(mediaRightDiv);
        $(mediaContent).appendTo(mediaRightDiv);

        $(mediaLeftDiv).appendTo(mediaDiv);
        $(mediaRightDiv).appendTo(mediaDiv);

        $(mediaDiv).appendTo(cardDiv);
        cardSection.append(cardDiv);
    }
}

//  Fetch API Movie Data
function getAPIMovieData(genreIDs) {
    let movieAPI = "https://api.themoviedb.org/3/discover/movie?api_key=0d37b66cfda3facaf7d62b81d68fd669&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=2000-01-01&primary_release_date.lte=2020-12-31&vote_average.gte=6&with_genres=" + genreIDs + "";
    fetch(movieAPI)
        .then(function (response) {
            if (response.status !== 200) {
                console.log(response.status);
            }
            return response.json();
        })
        .then(function (data) {
            renderMovieData(data);
        });
}





//  Search Button Listener
$(".genreButton").click(function () {
    console.log($(this).val());
    movies = getAPIMovieData($(this).val());
});




