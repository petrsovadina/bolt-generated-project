import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../lib/auth'

export default function UserManagement() {
  useAuth()
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
      if (error) console.error('Error fetching users:', error.message)
      else setUsers(data)
    }
    fetchUsers()
  }, [])

  const handleDeleteUser = async (id: number) => {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)
    if (error) console.error('Error deleting user:', error.message)
    else fetchUsers()
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Správa uživatelských účtů</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="mb-4 p-4 border">
            <p>Jméno: {user.name}</p>
            <p>Email: {user.email}</p>
            <button onClick={() => handleDeleteUser(user.id)} className="mt-2 bg-red-500 text-white p-2">Smazat</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
