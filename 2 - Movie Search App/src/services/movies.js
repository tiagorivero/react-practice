const API_KEY = '45fb16ce';

export const searchMovies = async ({search}) => {
    if(search === '') return null;

    try{
        const response = await fetch(`http://www.omdbapi.com/?s=${search}&apikey=${API_KEY}`)
        const json = await response.json();

        const movies = json?.Search ?? []

        return movies.map(movie => ({
            Title: movie.Title,
            Year: movie.Year,
            imdbID: movie.imdbID,
            Poster: movie.Poster
        }))
    }catch(error){
        throw new Error('Error al buscar películas')
    }

    
}   