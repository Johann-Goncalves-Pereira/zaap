import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik'

import ProfileImage from '@media/imgs/profile.png?jsx'

const getAverageColor = (imgElement: HTMLImageElement) => {
	const canvas = document.createElement('canvas')
	const context = canvas.getContext('2d')
	if (!context) return 'rgb(0, 0, 0)'

	canvas.width = imgElement.width
	canvas.height = imgElement.height
	context.drawImage(imgElement, 0, 0)

	const data = context.getImageData(0, 0, canvas.width, canvas.height).data
	let r = 0,
		g = 0,
		b = 0,
		count = 0

	for (let i = 0; i < data.length; i += 4) {
		r += data[i]
		g += data[i + 1]
		b += data[i + 2]
		count++
	}

	return `rgb(${Math.round(r / count)}, ${Math.round(g / count)}, ${Math.round(b / count)})`
}

export default component$(() => {
	const imageColor = useSignal('rgb(0, 0, 0)')

	// eslint-disable-next-line qwik/no-use-visible-task
	useVisibleTask$(() => {
		const img = document.querySelector('img')
		if (img && img.complete) {
			imageColor.value = getAverageColor(img)
			document.documentElement.style.setProperty(
				'--hero--color',
				imageColor.value,
			)
		} else if (img) {
			img.onload = () => {
				imageColor.value = getAverageColor(img)
				document.documentElement.style.setProperty(
					'--hero--color',
					imageColor.value,
				)
			}
		}
	})

	return (
		<article class='grid h-dvh lg:grid-cols-[1fr_auto] lg:grid-rows-[auto_1fr]'>
			<header class='flex flex-wrap items-center gap-8 px-16 pt-32 text-2xl lg:col-start-1 lg:col-end-1 lg:row-start-1'>
				<button>Test</button>
				<span class='hidden h-2 w-2 rounded-full bg-gray-300 sm:block' />
				<button>About me</button>
				<span class='hidden h-2 w-2 rounded-full bg-gray-300 sm:block' />
				<button>Check</button>
			</header>
			<section class='pb-16 text-2xl lg:col-start-1 lg:col-end-1 lg:row-start-2'>
				<div></div>
			</section>
			<footer class='relative flex w-min flex-col gap-8 p-16 text-2xl lg:col-start-2 lg:col-end-2 lg:row-span-2'>
				<div class='my-autos absolute top-32 bottom-32 left-0 w-px bg-gray-800' />
				<div class='h-72 w-72 overflow-hidden rounded-full bg-[var(--hero--color)] outline-gray-700 outline-solid'>
					<ProfileImage class='aspect-square object-cover object-top' />
				</div>
				<p class='text-center text-xs text-pretty'>
					Quis vitae obcaecati, iure reiciendis repellendus inventore velit
					totam?
					<br />
					<br />
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis
					tempora maiores iusto aspernatur corrupti, adipisci pariatur sapiente
					placeat molestiae, repellat, porro quos tempore quidem suscipit enim
					ex modi soluta est.
				</p>
			</footer>
		</article>
	)
})
