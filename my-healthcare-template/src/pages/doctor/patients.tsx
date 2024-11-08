import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function Patients() {
  const [patients, setPatients] = useState<any[]>([])

  useEffect(() => {
    const fetchPatients = async () => {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
      if (error) console.error('Error fetching patients:', error.message)
      else setPatients(data)
    }
    fetchPatients()
  }, [])

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Správa pacientů</h1>
      <ul>
        {patients.map((patient) => (
          <li key={patient.id} className="mb-2 p-2 border">
            <p>Jméno: {patient.name}</p>
            <p>Email: {patient.email}</p>
            <p>Telefon: {patient.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
