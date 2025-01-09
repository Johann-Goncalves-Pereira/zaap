import Noise from '@/components/global/noise'
import {
	component$,
	Slot,
	useContextProvider,
	useSignal,
	useVisibleTask$,
} from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import Footer from '@components/layout/footer/footer'
import Header from '@components/layout/header/header'
import { AuthContext } from '@context/auth.context'
import { createClient } from '@supabase/supabase-js'
import { getSupabaseServerClient } from '@utils/supabase.server'

export const useAuthCheck = routeLoader$(async requestEv => {
	const supabase = getSupabaseServerClient(requestEv)

	requestEv.cacheControl({
		staleWhileRevalidate: 60 * 60 * 24 * 7,
		maxAge: 5,
	})

	const {
		data: { session },
	} = await supabase.auth.getSession()
	return session?.user || null
})

export default component$(() => {
	const currentUser = useSignal(useAuthCheck().value)
	useContextProvider(AuthContext, currentUser)

	// eslint-disable-next-line qwik/no-use-visible-task
	useVisibleTask$(({ cleanup }) => {
		const supabase = createClient(
			import.meta.env.PUBLIC_SUPABASE_URL,
			import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
		)

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, session) => {
			console.log('Auth event:', event)
			currentUser.value = session?.user || null
		})

		// Clean up subscription when component unmounts
		cleanup(() => subscription.unsubscribe())
	})

	return (
		<>
			<Header />
			<main>
				<Slot />
			</main>
			<Footer />
			<Noise />
		</>
	)
})
