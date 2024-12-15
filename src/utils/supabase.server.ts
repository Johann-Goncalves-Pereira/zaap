import { createServerClient } from 'supabase-auth-helpers-qwik'
import type { RequestEventBase } from '@builder.io/qwik-city'

export const getSupabaseServerClient = (requestEv: RequestEventBase) => {
	return createServerClient(
		requestEv.env.get('PUBLIC_SUPABASE_URL')!,
		requestEv.env.get('PUBLIC_SUPABASE_ANON_KEY')!,
		requestEv,
	)
}
