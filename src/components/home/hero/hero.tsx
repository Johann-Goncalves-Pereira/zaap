import {
	$,
	component$,
	useContextProvider,
	useOnWindow,
	useStore,
} from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

import {
	ImageContextId,
	FileUploadButton,
	ImagePreview,
} from '@/components/home/hero/heroImage'
import Stars from '@/components/home/hero/stars'

export default component$(() => {
	// Use useStore instead of a plain object for reactivity
	const store = useStore({
		imageData: null,
	})

	useContextProvider(ImageContextId, store)

	const handleFileSelect$ = $((file: File) => {
		console.log('File selected:', file.name)
	})

	return (
		<>
			<article
				class='relative z-10 grid h-dvh place-items-center'
				style={{
					maskImage:
						'linear-gradient(to bottom, transparent -5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 75%, transparent 100%)',
				}}
			>
				<div class='mr-auto grid gap-4 pb-24 opacity-90 portrait:mx-4 landscape:ml-12'>
					<h1 class='text-4xl'>Zaira Gonçalves Pereira</h1>
					<h3 class='max-w-[clamp(36.25rem,33.2065rem+15.2174vw,45rem)] text-xs opacity-80'>
						I am Zaira, an artist passionate about creating beautiful and
						inspiring art. My journey is driven by creativity and a desire to
						bring beauty into others' lives. Join me and explore the wonders of
						imagination and expression.
					</h3>

					<FileUploadButton onFileSelect$={handleFileSelect$} />
				</div>
				<div class='pointer-events-none absolute inset-0 isolate -z-10'>
					<Stars />
					<ImagePreview />
					<div class='absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-gray-100 dark:to-gray-950' />
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
