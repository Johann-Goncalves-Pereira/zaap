import { createContextId, type Signal } from '@builder.io/qwik'
import type { User } from '@supabase/supabase-js'

export const AuthContext = createContextId<Signal<User | null>>('auth.context')
