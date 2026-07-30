import { useState , useEffect, use, useRef, useMemo} from 'react'
import './App.css'
import { type User , SortBy} from './types'
import { UserList } from './components/UserList'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'

const fetchUsers = async ({ pageParam }: { pageParam: number }) => {
  return await fetch(`https://randomuser.me/api/?results=10&seed=react-practice&page=${pageParam}`)
  .then(async res => {
    if(!res.ok) throw new Error('Error fetching users')
    return await res.json()
  })

  .then(res => {
    const currentPage = Number(res.info.page)
    const nextCursor = currentPage > 10 ? undefined : currentPage + 1
    return{
      users: res.results,
      nextCursor
    }
  })
}

function App() {
  const { isLoading, isError, data , refetch , fetchNextPage , hasNextPage} = useInfiniteQuery<{ nextCursor?: number,   users: User[] }>({
    queryKey: ['users'],
    queryFn: fetchUsers,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor
  })
  const queryClient = useQueryClient()

  const users: User[] = data?.pages?.flatMap(page => page.users) ?? []

  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  //const [loading, setLoading] = useState(false)
  //const [error, setError] = useState(false)
  //onst [currentPage, setCurrentPage] = useState(1)

  //const originalUsers = useRef<User[]>([])

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting == SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleReset = () => {
    void refetch()
  }

  const handleDelete = (email: string) => {
    queryClient.setQueryData(['users'], (oldData: any) => {
      if (!oldData) return oldData

      const newPages = oldData.pages.map((page: any) => ({
        ...page,
        users: page.users.filter((user: User) => user.email !== email)
      }))

      return { ...oldData, pages: newPages }
    })
  }

  const handleChangeSort = (sort : SortBy) => {
    setSorting(sort);
  }
  
  //Remplazado por React Query
  /*useEffect(() => {
    setLoading(true)
    setError(false)
    fetch(`https://randomuser.me/api/?results=10&seed=tiagoorivero&page=${currentPage}`)
      .then((res) => res.json())
      .then((res) =>{
        setUsers(prevUsers => {
          const newUsers = prevUsers.concat(res.results)
          originalUsers.current = newUsers
          return newUsers
        })
      })
      .catch((err)=>{
        setError(true)
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [currentPage])*/

  const filteredUsers = useMemo(() => {
    return filterCountry != null && filterCountry.length > 0
      ? users.filter((user) => {
          return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
        })
      : users
  }, [users, filterCountry])

const sortedUsers = useMemo(() => {
    if(sorting == SortBy.NONE) return filteredUsers

    let sortedFn = (a: User, b: User) => a.location.country.localeCompare(b.location.country)

    if(sorting == SortBy.NAME){
      sortedFn = (a, b) => a.name.first.localeCompare(b.name.first)
    }
    if(sorting == SortBy.LAST){
      sortedFn = (a, b) => a.name.last.localeCompare(b.name.last)
    }

    return filteredUsers.toSorted(sortedFn)
  }, [filteredUsers, sorting])

  return (
    <div className='App'>
      <h1>React Query Users</h1>
      <header>
        <button onClick={toggleColors}>
          Colorear filas
        </button>

        <button onClick={toggleSortByCountry}>
          {sorting == SortBy.COUNTRY ? 'Ordenar por defecto' : 'Ordenar por país'}
        </button>

        <button onClick={handleReset}>
          Reiniciar
        </button>

        <input 
          type="text" 
          placeholder="Filtrar por país..."
          onChange={(e) => {
            setFilterCountry(e.target.value)
          }}
        />
      </header>
      <main>
        {sortedUsers.length > 0 && (
          <UserList changeSorting={handleChangeSort} deleteUser={handleDelete} showColors={showColors} users={sortedUsers} />
        )}

        {isLoading && <p>Cargando...</p>}

        {!isLoading && isError && <p>Error al cargar los usuarios</p>}

        {!isLoading && !isError && sortedUsers.length == 0 && <p>No se encontraron usuarios</p>}

        {!isLoading && !isError && hasNextPage && (
          <button onClick={ () => { void fetchNextPage()}}>Cargar más resultados</button>
        )}

        {!isLoading && !isError && !hasNextPage && <p>No hay más usuarios para cargar</p>}
      </main>
    </div>
  )
}

export default App
