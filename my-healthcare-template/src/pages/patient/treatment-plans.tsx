import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../lib/auth'

export default function PatientTreatmentPlans() {
  useAuth()
  const [plans, setPlans] = useState<any[]>([])

  useEffect(() => {
    const fetchPlans = async () => {
      const user = supabase.auth.user()
      if (user) {
        const { data, error } = await supabase
          .from('treatment_plans')
          .select('*')
          .eq('patient_id', user.id)
        if (error) console.error('Error fetching plans:', error.message)
        else setPlans(data)
      }
    }
    fetchPlans()
  }, [])

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Moje plány léčby</h1>
      <ul>
        {plans.map((plan) => (
          <li key={plan.id} className="mb-2 p-2 border">
            <p>Datum: {plan.date}</p>
            <p>Popis: {plan.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
