import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

import HeroBackground from '@media/imgs/hero-background.webp?jsx'
import Stars from '@components/layout/hero/stars'

export default component$(() => {
	return (
		<>
			<article class='relative z-10 grid h-dvh place-items-center'>
				<div class='mr-auto grid gap-4 pb-24 opacity-90 portrait:mx-4 landscape:ml-12'>
					<h1 class='text-6xl'>Zaira Gonçalves Pereira</h1>
					<h3 class='max-w-[clamp(36.25rem,33.2065rem+15.2174vw,45rem)]'>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. At iure
						excepturi vero. Odio quam nihil recusandae facere cumque asperiores
						obcaecati ex corporis, fuga facilis amet repellendus. Obcaecati
						labore atque natus?
					</h3>
				</div>
				<div class='pointer-events-none absolute inset-0 isolate -z-10'>
					<Stars />
					<HeroBackground class='absolute inset-0 mt-auto aspect-auto max-h-[calc(100dvh-4rem)] w-full object-cover object-top' />
				</div>
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
