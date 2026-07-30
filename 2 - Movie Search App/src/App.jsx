import './App.css'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Movies } from './components/Movies'
import { useMovies} from './hooks/useMovies'
import debounced from 'just-debounce-it'

function useSearch() {
  //useState sirve para manejar el estado de un componente
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  //useRef sirve para mantener una referencia a un valor que no causa una re-renderización cuando cambia
  const isFirstInput = useRef(true)

  useEffect(() => {
    if(isFirstInput.current){
      isFirstInput.current = search === ''
      return
    }

    if(search === ''){
      setError('No se puede realizar la búsqueda vacia')
      return
    }

    if(search.match(/^\d+$/)){
      setError('No se puede realizar la búsqueda con un número')
      return
    }

    if(search.length < 3){
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }
    setError(null)
  }, [search])

  return {search, updateSearch, error};
}

function App() {
  const [sort,setSort] = useState(false)
  const {search, updateSearch, error} = useSearch()
  const {movies, loading , getMovies} = useMovies({search , sort})

  const debouncedGetMovies = useCallback( debounced(search => {
    getMovies(search);
  }, 300), [getMovies]);

  const handleSumbit = (event) => {
    event.preventDefault();
    getMovies(search);
  }

  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);
    debouncedGetMovies(newSearch);
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de Peliculas</h1>
          <form className="form" onSubmit={handleSumbit}>
            <input onChange={handleChange} value={search} name='query' placeholder="Avengers , Star Wars, The Matrix..." />
            <input type="checkbox" onChange={handleSort} checked={sort} />
            <button type='submit'>Buscar</button>
          </form>
          {error && <p style={{color: 'red'}}>{error}</p>}
      </header>

      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={movies} />
        }
      </main>
    </div>
  )
}

export default App
