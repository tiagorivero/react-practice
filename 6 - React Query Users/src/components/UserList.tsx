import { type User , SortBy} from '../types'

interface Props{
    changeSorting: (sort: SortBy) => void
    showColors: boolean
    users: User[]
    deleteUser: (email: string) => void
}

export function UserList ({ changeSorting, showColors, users, deleteUser }: Props) {
    return(
        <table width='100%'>
            <thead>
                <tr>
                    <th>Foto</th>
                    <th className='pointer' onClick={()=> changeSorting(SortBy.NAME)}>Nombre</th>
                    <th className='pointer' onClick={()=> changeSorting(SortBy.LAST)}>Apellido</th>
                    <th className='pointer' onClick={()=> changeSorting(SortBy.COUNTRY)}>Pais</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                    {
                        users.map((user , index) => {
                            const backgroundColor = index % 2 === 0 ? '#333' : '#555'
                            const color = showColors ? backgroundColor : 'transparent'
                            return(
                                <tr key={user.email} style={{ backgroundColor: color }}>
                                    <td>
                                        <img src={user.picture.thumbnail}/>
                                    </td>
                                    <td>
                                        {user.name.first}
                                    </td>
                                    <td>
                                        {user.name.last}
                                    </td>
                                    <td>
                                        {user.location.country}
                                    </td>
                                    <td>
                                        <button onClick={() => deleteUser(user.email)}>Borrar</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
        </table>
    )
}