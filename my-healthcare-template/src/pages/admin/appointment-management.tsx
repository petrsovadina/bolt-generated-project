import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../lib/auth'

export default function AppointmentManagement() {
  useAuth()
  const [appointments, setAppointments] = useState<any[]>([])

  useEffect(() => {
    const fetchAppointments = async () => {
      const { data, error } = await supabase
        .from('appointments')
        .select('*, users(name, email)')
      if (error) console.error('Error fetching appointments:', error.message)
      else setAppointments(data)
    }
    fetchAppointments()
  }, [])

  const handleDeleteAppointment = async (id: number) => {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id)
    if (error) console.error('Error deleting appointment:', error.message)
    else fetchAppointments()
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Správa rezervací</h1>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id} className="mb-4 p-4 border">
            <p>Pacient: {appointment.users.name}</p>
            <p>Email: {appointment.users.email}</p>
            <p>Datum: {appointment.date}</p>
            <p>Čas: {appointment.time}</p>
            <button onClick={() => handleDeleteAppointment(appointment.id)} className="mt-2 bg-red-500 text-white p-2">Smazat</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
