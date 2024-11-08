import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../lib/auth'

export default function Notifications() {
  useAuth()
  const [message, setMessage] = useState('')
  const [notifications, setNotifications] = useState<any[]>([])

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
      if (error) console.error('Error fetching notifications:', error.message)
      else setNotifications(data)
    }
    fetchNotifications()
  }, [])

  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase
      .from('notifications')
      .insert([{ message }])
    if (error) console.error('Error sending notification:', error.message)
    else {
      setMessage('')
      fetchNotifications()
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Zasílání oznámení</h1>
      <form onSubmit={handleSendNotification} className="mb-8">
        <textarea
          placeholder="Zpráva"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 mb-4 border"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2">Odeslat oznámení</button>
      </form>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id} className="mb-4 p-4 border">
            <p>{notification.message}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
