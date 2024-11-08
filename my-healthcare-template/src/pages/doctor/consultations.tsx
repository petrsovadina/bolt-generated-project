import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../lib/auth'

export default function Consultations() {
  useAuth()
  const [consultations, setConsultations] = useState<any[]>([])

  useEffect(() => {
    const fetchConsultations = async () => {
      const { data, error } = await supabase
        .from('consultations')
        .select('*, patients(name, email)')
      if (error) console.error('Error fetching consultations:', error.message)
      else setConsultations(data)
    }
    fetchConsultations()
  }, [])

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Lékařské konzultace</h1>
      <ul>
        {consultations.map((consultation) => (
          <li key={consultation.id} className="mb-4 p-4 border">
            <p>Pacient: {consultation.patients.name}</p>
            <p>Email: {consultation.patients.email}</p>
            <p>Datum: {consultation.date}</p>
            <p>Čas: {consultation.time}</p>
            <p>Poznámky: {consultation.notes}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
