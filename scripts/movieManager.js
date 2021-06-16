//Get movie data from api

URL_SERVER = "http://localhost:8000/api/v1/titles/"
URL_FORMAT = "?format=json"

function precise(x) {
    return Number.parseFloat(x).toPrecision(2);
  }

function getMovieData(id){
    var req = new XMLHttpRequest()
    var url = URL_SERVER + id + URL_FORMAT
    req.open('GET', url)
    req.responseType = 'json'
    req.addEventListener('load', function() {
        res = this.responses
    })
    req.addEventListener('error' , function() {
        console.log("Erreur")
    })
    req.send()
}

function getMostRatedMovie(rate = 10){
    var req = new XMLHttpRequest()
    var url = URL_SERVER + URL_FORMAT + "&imdb_score=" + rate.toString()

    req.open('Get', url)
    req.responseType = 'json'
    req.addEventListener('load', function() {
        res = this.response
        count = res['count']
        if(count == 0){
            getMostRatedMovie(rate-0.1)
        }
        else{
            movie_id = res['results'][0]['id']
            movie_id_manager.setMostRatedMovieId(movie_id)
            setMostRatedMovie(movie_id)
        }
        
    })
    req.send()
}

function getMostRatedMovies(rate = 10, list = [], deleted = false){
    var req = new XMLHttpRequest()
    var url = URL_SERVER + URL_FORMAT + "&imdb_score=" + rate.toString()

    req.open('Get', url)
    req.responseType = 'json'
    req.addEventListener('load', function() {
        response = this.response
        count = response['count']
        if(count == 0){
            getMostRatedMovies(precise(rate-0.1),list,deleted)
        }
        else{
            results = response['results']
            if(deleted == false){
                results.shift()
                deleted=true
            }
            for(var index = 0; index < results.length; index++){
                if(list.length < 14){
                    list.push(results[index]['image_url'])
                    list.push(results[index]['id'])
                }
                else
                    break
            }
            if(list.length < 14)
                getMostRatedMovies(precise(rate-0.1),list,deleted)
            else{
                setMostRatedMovies(list)
            }
        }
    })
    req.send()
}

function getMostRatedMoviesFromAction(rate = 10, list = []){
    CATEGORIE = "&genre=Action"
    var req = new XMLHttpRequest()
    var url = URL_SERVER + URL_FORMAT + CATEGORIE + "&imdb_score=" + rate.toString()

    req.open('Get', url)
    req.responseType = 'json'
    req.addEventListener('load', function(){
        response = this.response
        count = response['count']
        if(count == 0){
            getMostRatedMoviesFromAction(precise(rate-0.1),list)
        }
        else{
            results = response['results']
            for(index = 0;index < results.length; index++){
                if(list.length < 14){
                    list.push(results[index]['image_url'])
                    list.push(results[index]['id'])
                }
                else
                    break
            }
            if(list.length < 14)
                getMostRatedMoviesFromAction(precise(rate-0.1),list)
            else{
                setMostRatedAction(list)
            }
        }
    })
    req.send()
}

function getMostRatedMoviesFromDrama(rate = 10, list = []){
    CATEGORIE = "&genre=Drama"
    var req = new XMLHttpRequest()
    var url = URL_SERVER + URL_FORMAT + CATEGORIE + "&imdb_score=" + rate.toString()

    req.open('Get', url)
    req.responseType = 'json'
    req.addEventListener('load', function() {
        response = this.response
        count = response['count']
        if(count == 0){
            getMostRatedMoviesFromDrama(precise(rate-0.1),list)
        }
        else{
            results = response['results']
            for(index = 0;index < results.length; index++){
                if(list.length < 14){
                    list.push(results[index]['image_url'])
                    list.push(results[index]['id'])
                }
                else
                    break
            }
            if(list.length < 14)
                getMostRatedMoviesFromDrama(precise(rate-0.1),list)
            else{
                setMostRatedDrama(list)
            }
        }
    })
    req.send()
}

function getMostRatedMoviesFromMusic(rate = 10, list = []){
    CATEGORIE = "&genre=Music"
    var req = new XMLHttpRequest()
    var url = URL_SERVER + URL_FORMAT + CATEGORIE + "&imdb_score=" + rate.toString()

    req.open('Get', url)
    req.responseType = 'json'
    req.addEventListener('load', function() {
        response = this.response
        count = response['count']
        if(count == 0){
            getMostRatedMoviesFromMusic(precise(rate-0.1),list)
        }
        else{
            results = response['results']
            for(index = 0;index < results.length; index++){
                if(list.length < 14){
                    list.push(results[index]['image_url'])
                    list.push(results[index]['id'])
                }
                else
                    break
            }
            if(list.length < 14)
                getMostRatedMoviesFromMusic(precise(rate-0.1),list)
            else{
                setMostRatedMusic(list)
            }
        }
    })
    req.send()
}
// SET element of slider

function setMostRatedMovie(movie_id){
    var req = new XMLHttpRequest()
    var url = URL_SERVER + movie_id + URL_FORMAT

    req.open('Get', url)
    req.responseType = 'json'
    req.addEventListener('load', function() {
        response = this.response
        title_node = body.querySelector("#most_rated_title")
        title_node.textContent = response['title']
        img_node = body.querySelector("#most_rated_img")
        img_node.setAttribute("src",response['image_url'])
        desc_node = body.querySelector("#most_rated_description")
        desc_node.textContent = response['description']
        most_rated_movie_id = response['id']
    })
    req.send()
}

function setMostRatedMovies(list){
    img_node_list = document.querySelectorAll('img.slide_0_img')
    for(index = 0; index < 7; index++){
        img_node_list[index].setAttribute("src",list[index*2])
        movie_id_manager.appendMostRatedMoviesId(list[index * 2 + 1])
    }
}

function setMostRatedMusic(list){
    img_node_list = document.querySelectorAll('img.slide_1_img')
    for(index = 0; index < 7; index++){
        img_node_list[index].setAttribute("src",list[index*2])
        movie_id_manager.appendMostRatedMusicId(list[index * 2 + 1])
    }
}

function setMostRatedAction(list){
    img_node_list = document.querySelectorAll('img.slide_2_img')
    for(index = 0; index < 7; index++){
        img_node_list[index].setAttribute("src",list[index*2])
        movie_id_manager.appendMostRatedActionId(list[index * 2 + 1])
    }
}

function setMostRatedDrama(list){
    img_node_list = document.querySelectorAll('img.slide_3_img')
    for(index = 0; index < 7; index++){
        img_node_list[index].setAttribute("src",list[index*2])
        movie_id_manager.appendMostRatedDramaId(list[index * 2 + 1])
    }
}

function shiftSlider(slider, n){
    if(slider == 0) slider_most_rated.shift(n)
    else if(slider == 1) slider_most_rated_music.shift(n)
    else if(slider == 2) slider_most_rated_action.shift(n)
    else if(slider == 3) slider_most_rated_drama.shift(n)
    else console.log("Erreure index slider")
}