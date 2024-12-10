import {
	component$,
	useSignal,
	$,
	createContextId,
	useContext,
	type QRL,
	noSerialize,
} from '@builder.io/qwik'
import type { NoSerialize } from '@builder.io/qwik'

import DefaultBackgroundHero from '@media/imgs/hero-background.webp?jsx'

interface ImageContext {
	imageData: string | null
}

export const ImageContextId = createContextId<ImageContext>('image-context')

interface FileUploadButtonProps {
	onFileSelect$?: QRL<(file: File) => void>
	accept?: string
}

export const FileUploadButton = component$<FileUploadButtonProps>(
	({ onFileSelect$, accept = 'image/png,image/webp' }) => {
		const selectedFile = useSignal<NoSerialize<File> | null>(null)
		const fileInputRef = useSignal<HTMLInputElement>()
		const imageContext = useContext(ImageContextId)

		const handleFileChange$ = $((event: Event) => {
			const input = event.target as HTMLInputElement
			if (input.files && input.files.length > 0) {
				const file = input.files[0]

				if (file.type === 'image/png' || file.type === 'image/webp') {
					selectedFile.value = noSerialize(file)
					onFileSelect$?.(file)

					// Read and store image in context
					const reader = new FileReader()
					reader.onload = e => {
						const result = e.target?.result
						if (typeof result === 'string') {
							// Make imageData reactive
							imageContext.imageData = result
							// console.log('Image loaded into context:', result.substring(0, 50)) // Log first 50 chars to verify data
						}
					}
					reader.readAsDataURL(file)
				} else {
					console.error('Invalid file type. Please select a PNG or WebP image.')
					if (fileInputRef.value) {
						fileInputRef.value.value = ''
					}
				}
			}
		})

		return (
			<div class='file-upload opacity-0 transition-opacity hover:opacity-100'>
				<input
					type='file'
					accept={accept}
					onChange$={handleFileChange$}
					ref={fileInputRef}
					style='display: none'
				/>
				<button
					onClick$={() => fileInputRef.value?.click()}
					class='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
				>
					{selectedFile.value ? 'Change Image' : 'Select Image'}
				</button>
				{selectedFile.value && (
					<span class='ml-2'>Selected: {selectedFile.value.name}</span>
				)}
			</div>
		)
	},
)

export const ImagePreview = component$(() => {
	const imageContext = useContext(ImageContextId)
	if (!!imageContext.imageData)
		console.log('ImagePreview rendering, imageData exists:') // Debug log

	return (
		<>
			{imageContext.imageData ? (
				<img
					src={imageContext.imageData}
					alt='Background'
					class='absolute inset-0 mt-auto aspect-auto max-h-[calc(100dvh-4rem)] w-full object-cover object-top transition-opacity duration-300'
					width={1920}
					height={1080}
					onError$={e => console.error('Image failed to load:', e)} // Debug log
				/>
			) : (
				<DefaultBackgroundHero class='absolute inset-0 mt-auto aspect-auto max-h-[calc(100dvh-4rem)] w-full object-cover object-top transition-opacity duration-300' />
			)}
		</>
	)
})
