import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../lib/auth'

export default function MedicalRecords() {
  useAuth()
  const [patients, setPatients] = useState<any[]>([])
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [records, setRecords] = useState<any[]>([])

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

  const fetchRecords = async (patientId: number) => {
    const { data, error } = await supabase
      .from('medical_records')
      .select('*')
      .eq('patient_id', patientId)
    if (error) console.error('Error fetching records:', error.message)
    else setRecords(data)
  }

  const handlePatientSelect = (patient: any) => {
    setSelectedPatient(patient)
    fetchRecords(patient.id)
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Zdravotní záznamy</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Pacienti</h2>
        <ul>
          {patients.map((patient) => (
            <li key={patient.id} className="mb-2 p-2 border cursor-pointer" onClick={() => handlePatientSelect(patient)}>
              <p>Jméno: {patient.name}</p>
              <p>Email: {patient.email}</p>
            </li>
          ))}
        </ul>
      </section>
      {selectedPatient && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Záznamy pro {selectedPatient.name}</h2>
          <ul>
            {records.map((record) => (
              <li key={record.id} className="mb-2 p-2 border">
                <p>Datum: {record.date}</p>
                <p>Popis: {record.description}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
