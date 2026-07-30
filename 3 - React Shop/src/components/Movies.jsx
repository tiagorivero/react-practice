function RenderMovies({movies}) {
        return (
            <ul className='movies'>
                {
                movies.map(movie => (
                    <li className="movie" key={movie.imdbID}>
                    <h3>{movie.Title}</h3>
                    <p>{movie.Year}</p>
                    <img src={movie.Poster} alt={movie.Title} />
                    </li>
                ))
                }
            </ul>
            )
    }

function RenderNoResults() {
        return (<p>No se encontraron películas.</p>);
    }


export function Movies({movies}){
    const hasMovies = movies?.length > 0

    return (
        hasMovies 
        ? <RenderMovies movies={movies}/>
        : <RenderNoResults />
    )
}
