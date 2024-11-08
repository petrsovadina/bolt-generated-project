import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../lib/auth'

export default function PatientMedicalRecords() {
  useAuth()
  const [records, setRecords] = useState<any[]>([])

  useEffect(() => {
    const fetchRecords = async () => {
      const user = supabase.auth.user()
      if (user) {
        const { data, error } = await supabase
          .from('medical_records')
          .select('*')
          .eq('patient_id', user.id)
        if (error) console.error('Error fetching records:', error.message)
        else setRecords(data)
      }
    }
    fetchRecords()
  }, [])

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Moje zdravotní záznamy</h1>
      <ul>
        {records.map((record) => (
          <li key={record.id} className="mb-2 p-2 border">
            <p>Datum: {record.date}</p>
            <p>Popis: {record.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
