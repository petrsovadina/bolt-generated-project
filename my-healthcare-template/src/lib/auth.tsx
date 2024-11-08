import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { supabase } from './supabaseClient'

export function useAuth() {
  const router = useRouter()

  useEffect(() => {
    const session = supabase.auth.session()
    if (!session) {
      router.push('/auth/login')
    }
  }, [router])
}
