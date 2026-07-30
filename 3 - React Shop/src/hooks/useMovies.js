import { useState , useRef , useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies.js'

export function useMovies({search , sort}){
    const [movies, setMovies] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const previousSearch = useRef(search);

    const getMovies = useCallback(async (search) => {
            if(search === previousSearch.current) return;
            try{
                setLoading(true)
                setError(null)
                previousSearch.current = search
                const newMovies = await searchMovies({search})
            setMovies(newMovies)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
    }, []);

    /*const getSortedMovies = () => {
        const sortedMovies = sort && movies
        ? [...movies].sort((a,b) => a.Title.localeCompare(b.Title))
        : movies;
        return sortedMovies;
    }*/
    
    const sortedMovies = useMemo(() => {
        return sort
            ? [...movies].sort((a,b) => a.Title.localeCompare(b.Title))
            : movies;
    }, [sort, movies]);

    return { movies: sortedMovies, loading, error, getMovies}
    }