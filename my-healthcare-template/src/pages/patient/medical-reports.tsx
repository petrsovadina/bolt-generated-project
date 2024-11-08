import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../lib/auth'

export default function PatientMedicalReports() {
  useAuth()
  const [reports, setReports] = useState<any[]>([])

  useEffect(() => {
    const fetchReports = async () => {
      const user = supabase.auth.user()
      if (user) {
        const { data, error } = await supabase
          .from('medical_reports')
          .select('*')
          .eq('patient_id', user.id)
        if (error) console.error('Error fetching reports:', error.message)
        else setReports(data)
      }
    }
    fetchReports()
  }, [])

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Moje lékařské zprávy</h1>
      <ul>
        {reports.map((report) => (
          <li key={report.id} className="mb-2 p-2 border">
            <p>Datum: {report.date}</p>
            <p>Obsah: {report.content}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
