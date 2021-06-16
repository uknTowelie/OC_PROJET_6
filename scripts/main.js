var movie_id_manager = new MoviesIDManager()
var slider_most_rated = new SlideShowHelper(0)
var slider_most_rated_music = new SlideShowHelper(1)
var slider_most_rated_action = new SlideShowHelper(2)
var slider_most_rated_drama = new SlideShowHelper(3)
init()

function init(){
    slider_most_rated.show()
    slider_most_rated_music.show()
    slider_most_rated_action.show()
    slider_most_rated_drama.show()

    getMostRatedMovie()
    getMostRatedMovies()
    getMostRatedMoviesFromMusic()
    getMostRatedMoviesFromAction()
    getMostRatedMoviesFromDrama()
}