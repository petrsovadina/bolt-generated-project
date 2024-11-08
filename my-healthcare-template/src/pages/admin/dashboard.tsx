import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../lib/auth'
import Link from 'next/link'

export default function AdminDashboard() {
  useAuth()
  const [users, setUsers] = useState<any[]>([])
  const [appointments, setAppointments] = useState<any[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
      if (error) console.error('Error fetching users:', error.message)
      else setUsers(data)
    }

    const fetchAppointments = async () => {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
      if (error) console.error('Error fetching appointments:', error.message)
      else setAppointments(data)
    }

    fetchUsers()
    fetchAppointments()
  }, [])

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Administrativní rozhraní</h1>
      <nav className="mb-8">
        <Link href="/admin/blog-management">
          <a className="text-blue-500 underline">Správa blogových příspěvků</a>
        </Link>
        <Link href="/admin/user-management">
          <a className="ml-4 text-blue-500 underline">Správa uživatelských účtů</a>
        </Link>
        <Link href="/admin/appointment-management">
          <a className="ml-4 text-blue-500 underline">Správa rezervací</a>
        </Link>
        <Link href="/admin/notifications">
          <a className="ml-4 text-blue-500 underline">Zasílání oznámení</a>
        </Link>
        <Link href="/admin/system-management">
          <a className="ml-4 text-blue-500 underline">Správa systému</a>
        </Link>
        <Link href="/admin/billing">
          <a className="ml-4 text-blue-500 underline">Správa fakturace</a>
        </Link>
      </nav>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Uživatelé</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id} className="mb-2 p-2 border">
              <p>Jméno: {user.name}</p>
              <p>Email: {user.email}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Rezervace</h2>
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id} className="mb-2 p-2 border">
              <p>Datum: {appointment.date}</p>
              <p>Čas: {appointment.time}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
