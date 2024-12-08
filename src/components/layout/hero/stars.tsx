import {
	component$,
	useVisibleTask$,
	useSignal,
	$,
	useStylesScoped$,
} from '@builder.io/qwik'

/**
 * Configuration interface for gradient colors
 */
interface GradientConfig {
	bottomLeft: string
	middleLeft: string
	middleRight: string
	topRight: string
}

interface SizeConfig {
	/** Minimum star size in pixels */
	min: number
	/** Maximum star size in pixels */
	max: number
}

/**
 * Configuration interface for star movement speed
 */
interface SpeedConfig {
	/** Minimum movement speed */
	min: number
	/** Maximum movement speed */
	max: number
}

/**
 * Configuration interface for star opacity
 */
interface OpacityConfig {
	/** Minimum opacity value (0-1) */
	min: number
	/** Maximum opacity value (0-1) */
	max: number
}

/**
 * Configuration interface for star movement angle
 */
interface AngleConfig {
	/** Base X direction (-1 to 1) */
	baseX: number
	/** Base Y direction (-1 to 1) */
	baseY: number
	/** How much individual stars can vary from the base angle */
	variation: number
	/** Configuration for angle oscillation over time */
	oscillation: {
		/** Speed of the oscillation */
		speed: number
		/** Maximum angle change during oscillation */
		magnitude: number
	}
}

/**
 * Main configuration interface for the starry sky effect
 */
interface StarConfig {
	/** Number of pixels per star (higher = fewer stars) */
	density: number
	/** Star size configuration */
	size: SizeConfig
	/** Star speed configuration */
	speed: SpeedConfig
	/** Star opacity configuration */
	opacity: OpacityConfig
	/** Star movement angle configuration */
	angle: AngleConfig
	/** Background gradient configuration */
	gradient: GradientConfig
	/** Duration of the fade-in animation in milliseconds */
	fadeInDuration: number
}

/**
 * Interface representing a single star
 */
interface Star {
	/** X position on the canvas */
	x: number
	/** Y position on the canvas */
	y: number
	/** Size of the star in pixels */
	size: number
	/** Movement speed of the star */
	speed: number
	/** Individual angle variation for this star */
	angleOffset: number
}

/**
 * Default configuration for the starry sky effect
 */
const STAR_CONFIG: StarConfig = {
	density: 2000, // One star per this many pixels
	size: {
		min: 0.3,
		max: 0.9,
	},
	speed: {
		min: 0.01,
		max: 0.2,
	},
	opacity: {
		min: 0.6,
		max: 1,
	},
	angle: {
		baseX: -1, // Base movement direction X
		baseY: -0.5, // Base movement direction Y
		variation: 2, // How much each star's angle can vary
		oscillation: {
			speed: 0.001, // How fast the angle changes
			magnitude: 4, // How much the angle can change
		},
	},
	gradient: {
		bottomLeft: '#0C0C1C',
		middleLeft: '#19152F',
		middleRight: '#342A5D',
		topRight: '#3C233E',
	},
	fadeInDuration: 1000, // in milliseconds
}

/**
 * Initializes the star array based on canvas dimensions
 */
const createStars = $(
	async (
		width: number,
		height: number,
		config: StarConfig = STAR_CONFIG,
	): Promise<Star[]> => {
		const starCount = Math.floor((width * height) / config.density)
		const stars: Star[] = []

		for (let i = 0; i < starCount; i++) {
			stars.push({
				x: Math.random() * width,
				y: Math.random() * height,
				size:
					Math.random() * (config.size.max - config.size.min) + config.size.min,
				speed:
					Math.random() * (config.speed.max - config.speed.min) +
					config.speed.min,
				angleOffset: (Math.random() - 0.5) * config.angle.variation,
			})
		}

		return stars
	},
)

/**
 * Creates a gradient on the given context
 */
const createGradient = $(
	(
		ctx: CanvasRenderingContext2D,
		width: number,
		height: number,
		gradientConfig: GradientConfig,
	): CanvasGradient => {
		const gradient = ctx.createLinearGradient(0, height, width, 0)
		gradient.addColorStop(0, gradientConfig.bottomLeft)
		gradient.addColorStop(0.33, gradientConfig.middleLeft)
		gradient.addColorStop(0.66, gradientConfig.middleRight)
		gradient.addColorStop(1, gradientConfig.topRight)
		return gradient
	},
)

/**
 * Updates a star's position based on current animation state
 */
const updateStarPosition = $(
	(
		star: Star,
		globalAngleOffset: number,
		width: number,
		height: number,
		config: StarConfig = STAR_CONFIG,
	): Star => {
		const totalAngle = globalAngleOffset + star.angleOffset
		const dx = config.angle.baseX + Math.cos(totalAngle) * 0.2
		const dy = config.angle.baseY + Math.sin(totalAngle) * 0.2

		star.x += dx * star.speed
		star.y += dy * star.speed

		if (star.x < 0 || star.y < 0) {
			if (Math.random() > 0.5) {
				star.x = width
				star.y = Math.random() * height
			} else {
				star.x = Math.random() * width
				star.y = height
			}
		}

		return star
	},
)

/**
 * StarrySky component that creates an animated starry background with gradient
 * @returns Qwik component
 */
export default component$(() => {
	const canvasRef = useSignal<HTMLCanvasElement>()
	const stars = useSignal<Star[]>([])
	const isAnimating = useSignal(true)
	const timeOffset = useSignal(0)

	// Add scoped styles for fade-in animation
	useStylesScoped$(`
	.starry-sky {
		opacity: 0;
		transition: opacity ${STAR_CONFIG.fadeInDuration}ms ease-in;
	}
	.starry-sky.visible {
		opacity: 1;
	}
`)

	// eslint-disable-next-line qwik/no-use-visible-task
	useVisibleTask$(({ cleanup }) => {
		const canvas = canvasRef.value
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		if (!ctx) return

		// Make canvas visible with fade effect
		setTimeout(() => {
			canvas.classList.add('visible')
		}, 100)

		const updateCanvasSize = $(async () => {
			if (!canvas) return
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
			stars.value = await createStars(canvas.width, canvas.height)
		})

		// Initialize canvas size and stars
		updateCanvasSize()

		let animationFrame: number
		let lastTimestamp = 0

		const renderFrame = async (timestamp: number) => {
			if (!canvas || !ctx || !isAnimating.value) return

			const deltaTime = timestamp - lastTimestamp
			lastTimestamp = timestamp
			timeOffset.value += deltaTime * STAR_CONFIG.angle.oscillation.speed

			const globalAngleOffset =
				Math.sin(timeOffset.value) * STAR_CONFIG.angle.oscillation.magnitude

			// Create and apply gradient
			const gradient = await createGradient(
				ctx,
				canvas.width,
				canvas.height,
				STAR_CONFIG.gradient,
			)
			ctx.fillStyle = gradient
			ctx.fillRect(0, 0, canvas.width, canvas.height)

			// Update and draw stars
			stars.value = await Promise.all(
				stars.value.map(async star => {
					const updatedStar = await updateStarPosition(
						star,
						globalAngleOffset,
						canvas.width,
						canvas.height,
					)

					const opacity =
						Math.random() *
							(STAR_CONFIG.opacity.max - STAR_CONFIG.opacity.min) +
						STAR_CONFIG.opacity.min

					ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
					ctx.beginPath()
					ctx.arc(
						updatedStar.x,
						updatedStar.y,
						updatedStar.size,
						0,
						Math.PI * 2,
					)
					ctx.fill()

					return updatedStar
				}),
			)

			animationFrame = requestAnimationFrame(renderFrame)
		}

		renderFrame(0)
		window.addEventListener('resize', () => updateCanvasSize())

		cleanup(() => {
			isAnimating.value = false
			window.removeEventListener('resize', () => updateCanvasSize())
			if (animationFrame) {
				cancelAnimationFrame(animationFrame)
			}
		})
	})

	return (
		<canvas
			ref={canvasRef}
			class='starry-sky absolute top-0 left-0 -z-10 h-full w-full'
		/>
	)
})
