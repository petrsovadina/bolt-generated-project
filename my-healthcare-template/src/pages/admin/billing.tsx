import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../lib/auth'

export default function Billing() {
  useAuth()
  const [invoices, setInvoices] = useState<any[]>([])

  useEffect(() => {
    const fetchInvoices = async () => {
      const { data, error } = await supabase
        .from('invoices')
        .select('*, patients(name, email)')
      if (error) console.error('Error fetching invoices:', error.message)
      else setInvoices(data)
    }
    fetchInvoices()
  }, [])

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Správa fakturace</h1>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id} className="mb-4 p-4 border">
            <p>Pacient: {invoice.patients.name}</p>
            <p>Email: {invoice.patients.email}</p>
            <p>Datum: {invoice.date}</p>
            <p>Částka: {invoice.amount} Kč</p>
            <p>Status: {invoice.status}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
