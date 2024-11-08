import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../lib/auth'
import Link from 'next/link'

export default function DoctorDashboard() {
  useAuth()
  const [patients, setPatients] = useState<any[]>([])
  const [notifications, setNotifications] = useState<any[]>([])

  useEffect(() => {
    const fetchPatients = async () => {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
      if (error) console.error('Error fetching patients:', error.message)
      else setPatients(data)
    }

    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
      if (error) console.error('Error fetching notifications:', error.message)
      else setNotifications(data)
    }

    fetchPatients()
    fetchNotifications()
  }, [])

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Dashboard lékaře</h1>
      <nav className="mb-8">
        <Link href="/doctor/medical-records">
          <a className="text-blue-500 underline">Zdravotní záznamy</a>
        </Link>
        <Link href="/doctor/consultations">
          <a className="ml-4 text-blue-500 underline">Lékařské konzultace</a>
        </Link>
        <Link href="/doctor/medical-reports">
          <a className="ml-4 text-blue-500 underline">Lékařské zprávy</a>
        </Link>
        <Link href="/doctor/prescriptions">
          <a className="ml-4 text-blue-500 underline">Lékařské předpisy</a>
        </Link>
        <Link href="/doctor/treatment-plans">
          <a className="ml-4 text-blue-500 underline">Plány léčby</a>
        </Link>
      </nav>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Pacienti</h2>
        <ul>
          {patients.map((patient) => (
            <li key={patient.id} className="mb-2 p-2 border">
              <p>Jméno: {patient.name}</p>
              <p>Email: {patient.email}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Oznámení</h2>
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id} className="mb-2 p-2 border">
              <p>{notification.message}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
