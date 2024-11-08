import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../lib/auth'

export default function PatientPrescriptions() {
  useAuth()
  const [prescriptions, setPrescriptions] = useState<any[]>([])

  useEffect(() => {
    const fetchPrescriptions = async () => {
      const user = supabase.auth.user()
      if (user) {
        const { data, error } = await supabase
          .from('prescriptions')
          .select('*')
          .eq('patient_id', user.id)
        if (error) console.error('Error fetching prescriptions:', error.message)
        else setPrescriptions(data)
      }
    }
    fetchPrescriptions()
  }, [])

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Moje lékařské předpisy</h1>
      <ul>
        {prescriptions.map((prescription) => (
          <li key={prescription.id} className="mb-2 p-2 border">
            <p>Datum: {prescription.date}</p>
            <p>Lék: {prescription.medication}</p>
            <p>Dávkování: {prescription.dosage}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
