 var serverData = [],
     getStarRating;
 $(function () {

     //Search auto-complete event
     $("#inputMovies").autocomplete({
         source: function (request, response) {
             $.ajax({
                 url: "http://www.omdbapi.com/?s=" + $("#inputMovies").val() + "",
                 dataType: "jsonp",
                 success: function (data) {
                     var dataArray = [];
                     if (data.Response === "True") {
                         for (var i = 0; i < data.Search.length; i++) {
                             dataArray.push(data.Search[i].Title);
                         }
                     } else {
                         dataArray.push(data.Error);
                     }
                     response(dataArray);
                 }
             });
         },
         minLength: 1,
         select: function (event, ui) {
             isMoviePresent = false;
             if (localStorage.getItem("movies")) {
                 moviesdata = JSON.parse(localStorage.getItem('movies'));
                 $.each(moviesdata, function (i, item) {
                     if (moviesdata[i].Title == $("#inputMovies").val()) {
                         isMoviePresent = true;
                         $(".item-row").html("");
                         showData();
                         $("#filter").val('All');
                         return false;
                     } else {
                         isMoviePresent = false;
                     }
                 });
                 if (!isMoviePresent) {
                     getData();
                 }

             } else {
                 getData();
             }

         }
     });

     //getData for ajax call
     var getData = function () {
         var title = "";
         $.ajax({
             url: "http://www.omdbapi.com/?t=" + $("#inputMovies").val() + "&y=&plot=short&r=json",
             success: function (result) {
                 var isMoviePresent = false,
                     serverData = [];
                 localStorage.setItem('MovieData', result);
                 var data1 = localStorage.getItem('MovieData');
                 console.log(data1[0].Title);
                 if (localStorage.getItem("movies")) {
                     serverData = JSON.parse(localStorage.getItem('movies'));
                     $.each(serverData, function (i, item) {
                         title = serverData[i].Title;
                         if (serverData[i].Title !== $("#inputMovies").val()) {
                             isMoviePresent = false;
                         } else {
                             isMoviePresent = true;
                             return false;
                         }
                     });
                     if (isMoviePresent) {
                         showItem(title);
                     } else {
                         serverData.push(result);
                         localStorage.setItem('movies', JSON.stringify(serverData));
                         showItem($("#inputMovies").val());
                     }

                 } else {
                     serverData.push(result);
                     localStorage.setItem('movies', JSON.stringify(serverData));
                     showData();
                 }
                 $("#inputMovies").val("");
             }
         });
     }

     //showData to show all local-storage data
     var showData = function () {
         if (localStorage.getItem("movies")) {
             moviesdata = JSON.parse(localStorage.getItem('movies'));
             for (var i = 0; i < moviesdata.length; i++) {
                 if (moviesdata[i].Poster == "N/A") {
                     moviesdata[i].Poster = "assests/img/no-poster-img.png";
                 }
                 var starStr = getStarRating(moviesdata[i].imdbRating);
                 var str = "<div class='col-xs-12 col-sm-6 col-md-4 col-lg-4'><div class='item' onclick='itemClick(\"" + moviesdata[i].Title + "\")'><h3 class='title'>" + moviesdata[i].Title + "</h3><img class='poster' alt='poster' src=" + moviesdata[i].Poster + ">" + starStr + "<h5 class='year'><span>Year :</span>" + moviesdata[i].Year + "</h5><h5 class='genere'><span>Genre :</span>" + moviesdata[i].Genre + "</h5><h5 class='director'><span>Director: </span>" + moviesdata[i].Director + "</h5><h5 class='actors'><span>Actors :</span>" + moviesdata[i].Actors + "</h5><h5 class='plot'><span>Plot :</span>" +
                     moviesdata[i].Plot + "</h5></div></div>";
                 $(".item-row").append(str);
             }
         }
     };

     //showItem to show specific item data
     var showItem = function (title) {
         if (localStorage.getItem("movies")) {
             serverData = JSON.parse(localStorage.getItem('movies'));
             $.each(serverData, function (i, item) {
                 if (serverData[i].Poster == "N/A") {
                     serverData[i].Poster = "assests/img/no-poster-img.png";
                 }
                 var starStr = getStarRating(serverData[i].imdbRating);
                 if (serverData[i].Title == title) {
                     var str = "<div class='col-xs-12 col-sm-6 col-md-4 col-lg-4'><div class='item' onclick='itemClick(\"" + serverData[i].Title + "\")'><h3 class='title'>" + serverData[i].Title + "</h3><img class='poster' alt='poster' src=" + serverData[i].Poster + ">" + starStr + "<h5 class='year'><span>Year :</span>" + serverData[i].Year + "</h5><h5 class='genere'><span>Genre :</span>" + serverData[i].Genre + "</h5><h5 class='director'><span>Director: </span>" + serverData[i].Director + "</h5><h5 class='actors'><span>Actors :</span>" + serverData[i].Actors + "</h5><h5 class='plot'><span>Plot :</span>" +
                         serverData[i].Plot + "</h5></div></div>";
                     $(".item-row").append(str);
                 }
             });
         }
     };

     //filter event based on select value
     $('#filter').on('change', function () {
         var moviesData, genreObj = {},
             selectedVal = this.value;
         $(".item-row").html("");
         if (selectedVal !== "All") {
             if (localStorage.getItem("movies")) {
                 moviesData = JSON.parse(localStorage.getItem('movies'));
                 $.each(moviesData, function (i, item) {
                     var genre = moviesData[i].Genre.split(",");
                     for (var j = 0; j < genre.length; j++) {
                         if (genre[j].trim() == selectedVal) {
                             genreObj.title = moviesData[i].Title;
                             genreObj.value = genre[j].trim();
                             switch (genreObj.value) {
                             case "Action":
                                 {
                                     showItem(genreObj.title);
                                     break;
                                 }
                             case "Adventure":
                                 {
                                     showItem(genreObj.title);
                                     break;
                                 }
                             case "Crime":
                                 {
                                     showItem(genreObj.title);
                                     break;
                                 }
                             case "Drama":
                                 {
                                     showItem(genreObj.title);
                                     break;
                                 }
                             case "Mystry":
                                 {
                                     showItem(genreObj.title);
                                     break;
                                 }
                             case "Sci-fi":
                                 {
                                     showItem(genreObj.title);
                                     break;
                                 }
                             }
                         } else {
                             genreObj.title = "";
                             genreObj.value = "";
                         }
                     }

                 });
             }
         } else {
             showData();
         }
     });

     //modal overlay saving-data on save click
     $("#modal-save").click(function () {
         if (localStorage.getItem("movies")) {
             var moviesData = JSON.parse(localStorage.getItem('movies'));
             $.each(moviesData, function (i, item) {
                 if (moviesData[i].Title == $(".modal-title").html()) {
                     moviesData[i].Year = $("#modal-year").val();
                     moviesData[i].Genre = $("#modal-genre").val();
                     moviesData[i].Director = $("#modal-director").val();
                     moviesData[i].Actors = $("#modal-actors").val();
                     moviesData[i].Plot = $("#modal-plot").val();
                 }
             });
             localStorage.setItem('movies', JSON.stringify(moviesData));
             $(".item-row").html("");
             showData();
             $("#edit-modal").modal("hide");
         }
     });

     //modal overlay reset-data on reset click
     $("#modal-reset").click(function () {
         if (localStorage.getItem("movies")) {
             var moviesData = JSON.parse(localStorage.getItem('movies'));
             $.each(moviesData, function (i, item) {
                 if (moviesData[i].Title == $(".modal-title").html()) {
                     $("#modal-year").val(moviesData[i].Year);
                     $("#modal-genre").val(moviesData[i].Genre);
                     $("#modal-director").val(moviesData[i].Director);
                     $("#modal-actors").val(moviesData[i].Actors);
                     $("#modal-plot").val(moviesData[i].Plot);
                 }
             });
         }
     });

     //clear search-box
     $(".fa-close").click(function () {
         $("#inputMovies").val('');
     });

     //function convert IMDB ratings to stars
     getStarRating = function (starRating) {
         var starStr = "";
         if (starRating == "N/A") {
             starStr = "<div class='wporg-ratings'><span class='dashicons dashicons-star-filled dashicons-grey'></span><span class='dashicons dashicons-star-filled dashicons-grey'></span><span class='dashicons dashicons-star-filled dashicons-grey'></span><span class='dashicons dashicons-star-filled dashicons-grey'></span><span class='dashicons dashicons-star-filled dashicons-grey'></span></div>";
         } else {
             starRating = starRating / 2;
             if (starRating <= 0.5) {
                 starStr = "<div class='wporg-ratings'><span class='dashicons dashicons-star-half'></span><span class='dashicons dashicons-star-filled dashicons-grey'></span><span class='dashicons dashicons-star-filled dashicons-grey'></span><span class='dashicons dashicons-star-filled dashicons-grey'></span><span class='dashicons dashicons-star-filled dashicons-grey'></span></div>";
             } else if (starRating > 0.5 && starRating <= 1) {
                 starStr = "<div class='wporg-ratings'><span class='dashicons dashicons-star-filled'></span><span class='dashicons dashicons-star-filled dashicons-grey'></span><span class='dashicons dashicons-star-filled dashicons-grey'></span><span class='dashicons dashicons-star-filled dashicons-grey'></span><span class='dashicons dashicons-star-filled dashicons-grey'></span></div>";
             } else if (starRating > 1 && starRating <= 1.5) {
                 starStr = "<div class='wporg-ratings'><span class='dashicons dashicons-star-filled'></span><span class='dashicons dashicons-star-half'></span><span class='dashicons dashicons-star-filled dashicons-grey'></span><span class='dashicons dashicons-star-filled dashicons-grey'></span><span class='dashicons dashicons-star-filled dashicons-grey'></span></div>";
             } else if (starRating > 1.5 && starRating <= 2) {
                 starStr = "<div class='wporg-ratings'><span class='dashicons dashicons-star-filled'></span><span class='dashicons dashicons-star-filled'></span><span class='dashicons dashicons-star-filled dashicons-grey'></span><span class='dashicons dashicons-star-filled dashicons-grey'></span><span class='dashicons dashicons-star-filled dashicons-grey'></span></div>";
             } else if (starRating > 2 && starRating <= 2.5) {
                 starStr = "<div class='wporg-ratings'><span class='dashicons dashicons-star-filled'></span><span class='dashicons dashicons-star-filled'></span><span class='dashicons dashicons-star-half'></span><span class='dashicons dashicons-star-filled dashicons-grey'></span><span class='dashicons dashicons-star-filled dashicons-grey'></span></div>";
             } else if (starRating > 2.5 && starRating <= 3) {
                 starStr = "<div class='wporg-ratings'><span class='dashicons dashicons-star-filled'></span><span class='dashicons dashicons-star-filled'></span><span class='dashicons dashicons-star-filled'></span><span class='dashicons dashicons-star-filled dashicons-grey'></span><span class='dashicons dashicons-star-filled dashicons-grey'></span></div>";
             } else if (starRating > 3 && starRating <= 3.5) {
                 starStr = "<div class='wporg-ratings'><span class='dashicons dashicons-star-filled'></span><span class='dashicons dashicons-star-filled'></span><span class='dashicons dashicons-star-filled'></span><span class='dashicons dashicons-star-half'></span><span class='dashicons dashicons-star-filled dashicons-grey'></span></div>";
             } else if (starRating > 3.5 && starRating <= 4) {
                 starStr = "<div class='wporg-ratings'><span class='dashicons dashicons-star-filled'></span><span class='dashicons dashicons-star-filled'></span><span class='dashicons dashicons-star-filled'></span><span class='dashicons dashicons-star-filled'></span><span class='dashicons dashicons-star-filled dashicons-grey'></span></div>";
             } else if (starRating > 4 && starRating <= 4.5) {
                 starStr = "<div class='wporg-ratings'><span class='dashicons dashicons-star-filled'></span><span class='dashicons dashicons-star-filled'></span><span class='dashicons dashicons-star-filled'></span><span class='dashicons dashicons-star-filled'></span><span class='dashicons dashicons-star-half'></span></div>";
             } else if (starRating > 4.5 && starRating <= 5) {
                 starStr = "<div class='wporg-ratings'><span class='dashicons dashicons-star-filled'></span><span class='dashicons dashicons-star-filled'></span><span class='dashicons dashicons-star-filled'></span><span class='dashicons dashicons-star-filled'></span><span class='dashicons dashicons-star-filled'></span></div>";
             }
         }
         return starStr;
     }
     $("#edit-modal").modal("hide");
     showData();
 });

 //handlling the item click for each item
 var itemClick = function (title) {
     if (localStorage.getItem("movies")) {
         var moviesData = JSON.parse(localStorage.getItem('movies'));
         $.each(moviesData, function (i, item) {
             if (moviesData[i].Title == title) {
                 $(".star-ratings").html('');
                 $(".modal-title").html(title);
                 $("#modal-poster").attr("src", moviesData[i].Poster);
                 $(".star-ratings").append(getStarRating(moviesData[i].imdbRating))
                 $("#modal-year").val(moviesData[i].Year);
                 $("#modal-genre").val(moviesData[i].Genre);
                 $("#modal-director").val(moviesData[i].Director);
                 $("#modal-actors").val(moviesData[i].Actors);
                 $("#modal-plot").val(moviesData[i].Plot);
             }
         });
         $("#edit-modal").modal("show");
     }
 }