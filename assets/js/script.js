//  Get HTML Elements
let buttonBlock = $(".buttons");
let drinkDiv = $("#displayDrink");

//  Place Movie Data On Page
function renderMovieData(data) {
    let cardSection = $("#card-section");
    console.log(cardSection);
    console.log(data);

    $("#card-section").html("<p class=\"subtitle is-3\">Your recommendations</p>");

    let baseImageURL = "https://image.tmdb.org/t/p/w92";

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

    currentPage = data.page;
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

        let saveButton = $("<button></button>");
        saveButton.attr("class", "button is-link is-outlined");
        saveButton.attr("value", data.results[i].id);
        saveButton.append("Save");

        let mediaTitle = $("<p></p>");
        mediaTitle.attr("class", "title is-4");
        mediaTitle.append(data.results[i].title);

        let mediaTitleLink = $("<a></a>");
        mediaTitleLink.attr("href", "");
        mediaTitleLink.attr("id", "movieDetails");

        let mediaContent = $("<p></p>");
        mediaContent.attr("class", "content is-6");
        mediaContent.append(data.results[i].overview);


        //  Place Movie Elements
        $(movieImage).appendTo(figureImage);
        $(figureImage).appendTo(mediaLeftDiv);

        $(saveButton).appendTo(mediaTitle);
        $(mediaTitle).appendTo(mediaRightDiv);
        $(mediaContent).appendTo(mediaRightDiv);

        $(mediaLeftDiv).appendTo(mediaDiv);
        $(mediaRightDiv).appendTo(mediaDiv);

        $(mediaDiv).appendTo(cardDiv);
        cardSection.append(cardDiv);
    }
}

function renderDrink(data){
    console.log(data);

    //  Jeff Notes For Modal

    //  Clear Current Drink
    $(drinkDiv).text("");

    //let drinkName = $("<div></div>");
    //drinkName.attr("id", "displayDrink");
    //drinkName.attr("style", "display:none;");
    //drinkName.attr("role", "dialog");
    drinkDiv.attr("title", "How To Make A " + data.drinks[0].strDrink);

    let drinkImage = $("<img />");
    drinkImage.attr("style", "width: 25%;");
    if (data.drinks[0].strDrinkThumb) {
        drinkImage.attr("src", data.drinks[0].strDrinkThumb);
    } else {
        drinkImage.attr("src", "");
    }
    
    let drinkDetails = $("<p></p>");
    //drinkDetails.attr("class", "");
    drinkDetails.append(data.drinks[0].strInstructions);

    //drinkName.append(data.drinks[0].strDrink);

    //drinkImage.appendTo(drinkName);
    //drinkDetails.appendTo(drinkName);
    
    $(drinkDiv).text(drinkImage);
    //drinkDiv.find('.modal-title').text("How To Make A " + data.drinks[0].strDrink);
    //$(drinkDiv).text("title", "How To Make A " + data.drinks[0].strDrink);
    $(drinkDiv).text(data.drinks[0].strInstructions);

    //drinkDiv.append(drinkName);
}



function getAPIDrink() {
    let drinkAPI = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

    fetch(drinkAPI)
        .then(function (response) {
            console.log(response.status);
            return response.json();
        })
        .then(function(data) {
            renderDrink(data);
        });
}



//  Fetch API Movie Data
function getAPIMovieData(genreIDs, currentPage) {
    
    //currentPage = 5;

    console.log("Page: " + currentPage);
    let movieAPI = "https://api.themoviedb.org/3/discover/movie?api_key=0d37b66cfda3facaf7d62b81d68fd669&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=" + currentPage + "&primary_release_date.gte=2010-01-01&primary_release_date.lte=2020-12-31&vote_average.gte=6&with_genres=" + genreIDs + "";
    console.log(movieAPI);
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

function getAPIMovieDetails() {
    let movieDetailAPI = "https://developers.themoviedb.org/3/movies/get-movie-details?api_key=0d37b66cfda3facaf7d62b81d68fd669&language=en-US&"
}

function changePage(currentPage) {

}


//  Search Button Listener
$(".genreButton").click(function () {
    console.log($(this).val());
    movies = getAPIMovieData($(this).val());
});


//  Drink Modal
$( function() {
    $("#displayDrink").dialog({
        modal: true,
        autoOpen: false,
        width: 700,
        height: 700
    });
    $("#getDrinkButton").click(function () {
        getAPIDrink();
        $("#displayDrink").dialog("open");
    });
});


//$("#getDrinkButton").click(function () {
//    console.log($(this).val());
//    getAPIDrink();
//});


