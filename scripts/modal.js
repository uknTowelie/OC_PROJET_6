function getMovieFromSlider(slider,id_index){
    var id = 9
    
    if(slider == 0) id = movie_id_manager.getMostRatedMovieId()
    else if(slider == 1) id = movie_id_manager.getMostRatedMoviesId()[id_index]
    else if(slider == 2) id = movie_id_manager.getMostRatedMusicId()[id_index]
    else if(slider == 3) id = movie_id_manager.getMostRatedActionId()[id_index]
    else if(slider == 4) id = movie_id_manager.getMostRatedDramaId()[id_index]
    else id = 9

    var url = URL_SERVER + id + URL_FORMAT
    var req = new XMLHttpRequest()

    req.open('Get', url)
    req.responseType = 'json'
    req.addEventListener('load', function(){
        openModal(this.response)
    })
    req.send()
}

function openModal(movie_json){
    document.getElementById("modal_title").innerHTML = movie_json["title"]
    document.getElementById("modal_description").innerHTML = movie_json["long_description"]
    document.getElementById("modal_img").setAttribute("src",movie_json["image_url"])

    var str = ""
    for(var index = 0; index < movie_json["genres"].length; index++){
        if (index != 0)
            str += ", "
        str += movie_json["genres"][index]
    }
    document.getElementById("modal_genres").innerHTML = "Genres: " + str
    document.getElementById("modal_release").innerHTML = "Realease date: " + movie_json["date_published"]

    str = ""
    for(var index = 0; index < movie_json["directors"].length; index++){
        if(index != 0)
            str += ", "
        str += movie_json["directors"][index]
    }
    document.getElementById("modal_directors").innerHTML = "Directors: " + str

    str = ""
    for(var index = 0; index < movie_json["actors"].length; index++){
        if(index != 0)
            str += ", "
        str += movie_json["actors"][index]
    }
    document.getElementById("modal_actors").innerHTML = "Actors: " + str
    document.getElementById("modal_duration").innerHTML = "Duration: " + movie_json["duration"].toString() + " min"
    document.getElementById("modal_box_office").innerHTML = "Box Office: " + movie_json["metascore"]
    document.getElementById("modal_rated").innerHTML = "Rated: " + movie_json["rated"]
    document.getElementById("modal_imdb_score").innerHTML = "Imdb score: " + movie_json["imdb_score"]

    str=""
    for(var index = 0; index < movie_json["countries"].length; index++){
        if(index != 0)
            str += ", "
        str += movie_json["countries"][index]
    }
    document.getElementById("modal_countries").innerHTML = "Countries: " + str
    document.getElementById("modal_container").style.display = "block"
}

var modal = document.getElementById("modal_container")

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

var modal_close = document.getElementById("modal_close")
modal_close.addEventListener("click", function (){
    modal.style.display = "none";
})


