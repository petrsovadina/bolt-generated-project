import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Appointments() {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    const user = supabase.auth.user()
    if (user) {
      const { error } = await supabase
        .from('appointments')
        .insert([{ user_id: user.id, date, time }])
      if (error) console.error('Error booking appointment:', error.message)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Rezervace termínu</h1>
      <form onSubmit={handleBooking}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 mb-4 border"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-2 mb-4 border"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2">Rezervovat</button>
      </form>
    </div>
  )
}
