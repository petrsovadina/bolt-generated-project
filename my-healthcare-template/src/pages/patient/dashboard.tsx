import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../lib/auth'

export default function PatientDashboard() {
  useAuth()
  const [appointments, setAppointments] = useState<any[]>([])

  useEffect(() => {
    const fetchAppointments = async () => {
      const user = supabase.auth.user()
      if (user) {
        const { data, error } = await supabase
          .from('appointments')
          .select('*')
          .eq('user_id', user.id)
        if (error) console.error('Error fetching appointments:', error.message)
        else setAppointments(data)
      }
    }
    fetchAppointments()
  }, [])

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Můj dashboard</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Moje rezervace</h2>
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
