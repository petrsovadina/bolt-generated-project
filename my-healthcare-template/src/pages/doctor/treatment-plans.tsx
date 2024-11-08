import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../lib/auth'

export default function TreatmentPlans() {
  useAuth()
  const [patients, setPatients] = useState<any[]>([])
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [plans, setPlans] = useState<any[]>([])

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

  const fetchPlans = async (patientId: number) => {
    const { data, error } = await supabase
      .from('treatment_plans')
      .select('*')
      .eq('patient_id', patientId)
    if (error) console.error('Error fetching plans:', error.message)
    else setPlans(data)
  }

  const handlePatientSelect = (patient: any) => {
    setSelectedPatient(patient)
    fetchPlans(patient.id)
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Plány léčby</h1>
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
          <h2 className="text-xl font-semibold mb-2">Plány pro {selectedPatient.name}</h2>
          <ul>
            {plans.map((plan) => (
              <li key={plan.id} className="mb-2 p-2 border">
                <p>Datum: {plan.date}</p>
                <p>Popis: {plan.description}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
