 var serverData = [];

 $(function () {
     $("#inputMovies").autocomplete({
         source: function (request, response) {
             $.ajax({
                 url: "http://www.omdbapi.com/?t=" + $("#inputMovies").val() + "&y=&plot=short&r=json",
                 dataType: "jsonp",
                 data: {
                     q: request.term
                 },
                 success: function (data) {
                     var dataArray = [];
                     dataArray.push(data.Title || data.Error);
                     response(dataArray);
                 }
             });
         },
         minLength: 1,
         select: function (event, ui) {
             if (localStorage.getItem("movies")) {
                 moviesdata = JSON.parse(localStorage.getItem('movies'));
                 for (var i = 0; i < moviesdata.length; i++) {
                     console.log(ui.item.value + "===" + moviesdata[i].Title);
                     if (moviesdata[i].Title == $("#inputMovies").val()) {
                         var str = "<div class='item+'><h3 class='title'><span>" + moviesdata[i].Title + "</h3><img class='poster' alt='poster' src=" + moviesdata[i].Poster + "><h5 class='year'><span>Year :</span>" + moviesdata[i].Year + "</h5><h5 class='genere'><span>Genre :</span>" + moviesdata[i].Genre + "</h5><h5 class='director'><span>Director: </span>" + moviesdata[i].Director + "</h5><h5 class='actors'><span>Actors :</span>" + moviesdata[i].Actors + "</h5><h5 class='plot'><span>Plot :</span>"
                         moviesdata[i].Plot + "</h5></div>";
                         $(".results").append(str);
                         $(".item").show();
                     } else {
                         getData();
                     }
                 }
             } else {
                 getData();
             }

         }
     });

     var getData = function () {
         $.ajax({
             url: "http://www.omdbapi.com/?t=" + $("#inputMovies").val() + "&y=&plot=short&r=json",
             success: function (result) {
                 localStorage.setItem('MovieData', result);
                 var data1 = localStorage.getItem('MovieData');
                 console.log(data1[0].Title);
                 if (localStorage.getItem("movies")) {
                     serverData = JSON.parse(localStorage.getItem('movies'));
                     for (var i = 0; i < serverData.length; i++) {
                         if (serverData[i].Title !== $("#inputMovies").val()) {
                             serverData.push(result);
                             localStorage.setItem('movies', JSON.stringify(serverData));
                         }
                     }
                 } else {
                     serverData.push(result);
                     localStorage.setItem('movies', JSON.stringify(serverData));
                 }
             }
         });
     }

     var showData = function () {
         if (localStorage.getItem("movies")) {
             moviesdata = JSON.parse(localStorage.getItem('movies'));
             for (var i = 0; i < moviesdata.length; i++) {
                 var str = "<div class='item'><h3 class='title'><span>" + moviesdata[i].Title + "</h3><img class='poster' alt='poster' src=" + moviesdata[i].Poster + "><h5 class='year'><span>Year :</span>" + moviesdata[i].Year + "</h5><h5 class='genere'><span>Genre :</span>" + moviesdata[i].Genre + "</h5><h5 class='director'><span>Director: </span>" + moviesdata[i].Director + "</h5><h5 class='actors'><span>Actors :</span>" + moviesdata[i].Actors + "</h5><h5 class='plot'><span>Plot :</span>"
                 moviesdata[i].Plot + "</h5></div>";
                 $(".results").append(str);
                 $(".item").show();
             }
         }
     };
     showData();
 });