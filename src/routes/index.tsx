import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import Hero from '@/components/home/hero/hero'
import About from '@/components/home/about/about'

export default component$(() => {
	return (
		<>
			<Hero />
			<About />
		</>
	)
})

export const head: DocumentHead = {
	title: 'Zaira Portfolio - Home',
	meta: [
		{
			name: 'description',
			content: 'Qwik site description',
		},
	],
}
