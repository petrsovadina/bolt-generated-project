import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../lib/auth'

export default function SystemManagement() {
  useAuth()
  const [systemLogs, setSystemLogs] = useState<any[]>([])

  useEffect(() => {
    const fetchSystemLogs = async () => {
      const { data, error } = await supabase
        .from('system_logs')
        .select('*')
      if (error) console.error('Error fetching system logs:', error.message)
      else setSystemLogs(data)
    }
    fetchSystemLogs()
  }, [])

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Správa systému</h1>
      <ul>
        {systemLogs.map((log) => (
          <li key={log.id} className="mb-4 p-4 border">
            <p>Čas: {log.timestamp}</p>
            <p>Událost: {log.event}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
