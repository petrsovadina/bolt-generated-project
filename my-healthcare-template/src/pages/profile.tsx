import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Profile() {
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      const user = supabase.auth.user()
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        if (error) console.error('Error fetching profile:', error.message)
        else setProfile(data)
      }
    }
    fetchProfile()
  }, [])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    const user = supabase.auth.user()
    if (user) {
      const { error } = await supabase
        .from('profiles')
        .update({ ...profile })
        .eq('id', user.id)
      if (error) console.error('Error updating profile:', error.message)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Můj profil</h1>
      {profile && (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="Jméno"
            value={profile.name || ''}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="w-full p-2 mb-4 border"
          />
          <input
            type="text"
            placeholder="Telefon"
            value={profile.phone || ''}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            className="w-full p-2 mb-4 border"
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2">Uložit změny</button>
        </form>
      )}
    </div>
  )
}
