import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Services() {
  const [services, setServices] = useState<any[]>([])

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
      if (error) console.error('Error fetching services:', error.message)
      else setServices(data)
    }
    fetchServices()
  }, [])

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Naše služby</h1>
      <ul>
        {services.map((service) => (
          <li key={service.id} className="mb-4 p-4 border">
            <h2 className="text-xl font-semibold">{service.name}</h2>
            <p>{service.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
