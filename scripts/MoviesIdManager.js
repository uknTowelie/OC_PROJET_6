class MoviesIDManager{
    
    constructor(){
        this.most_rated_movie_id = -1
        this.most_rated_movies_id = []
        this.most_rated_music_id = []
        this.most_rated_action_id = []
        this.most_rated_drama_id = []
    }

    getMostRatedMovieId(){
        return this.most_rated_movie_id
    }

    setMostRatedMovieId(id){
        this.most_rated_movie_id = id
    }

    getMostRatedMoviesId(){
        return this.most_rated_movies_id
    }

    appendMostRatedMoviesId(id){
        this.most_rated_movies_id.push(id)
    }

    getMostRatedMusicId(){
        return this.most_rated_music_id
    }

    appendMostRatedMusicId(id){
        this.most_rated_music_id.push(id)
    }

    getMostRatedActionId(){
        return this.most_rated_action_id
    }

    appendMostRatedActionId(id){
        this.most_rated_action_id.push(id)
    }

    getMostRatedDramaId(){
        return this.most_rated_drama_id
    }

    appendMostRatedDramaId(id){
        this.most_rated_drama_id.push(id)
    }
}