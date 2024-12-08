import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

import HeroBackground from '@media/imgs/hero-background.webp?jsx'
import Stars from '@components/layout/hero/stars'

export default component$(() => {
	return (
		<>
			<article class='relative z-10 grid h-dvh'>
				<Stars />
				<HeroBackground class='absolute inset-0 mt-auto aspect-auto max-h-[calc(100dvh-2rem)] w-full object-cover object-top' />
			</article>
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
