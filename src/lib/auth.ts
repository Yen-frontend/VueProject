import { ref } from 'vue'
import { supabase } from './supabase'
import type { User } from '@supabase/supabase-js'

export const currentUser = ref<User | null>(null)

supabase.auth.getSession().then(({ data }) => {
  currentUser.value = data.session?.user ?? null
})

supabase.auth.onAuthStateChange((_event, session) => {
  currentUser.value = session?.user ?? null
})

export async function logout() {
  await supabase.auth.signOut()
}
