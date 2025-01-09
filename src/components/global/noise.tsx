import { component$ } from '@builder.io/qwik'

export default component$(() => {
	const id = `noise_${Math.random().toString(36).substring(2, 9)}`

	return (
		<svg
			class='pointer-events-none fixed inset-0 h-full w-full'
			id={`${id}_filter`}
			aria-hidden='true'
		>
			<filter id={`${id}-filter`}>
				<feTurbulence
					type='fractalNoise'
					baseFrequency='2'
					numOctaves='10'
					stitchTiles='stitch'
				></feTurbulence>
				<feColorMatrix type='saturate' values='0'></feColorMatrix>
				<feComponentTransfer>
					<feFuncR type='linear' slope='0.4'></feFuncR>
					<feFuncG type='linear' slope='0.4'></feFuncG>
					<feFuncB type='linear' slope='0.4'></feFuncB>
					<feFuncA type='linear' slope='0.3'></feFuncA>
				</feComponentTransfer>
				<feComponentTransfer>
					<feFuncR type='linear' slope='1.5' intercept='-0.25' />
					<feFuncG type='linear' slope='1.5' intercept='-0.25' />
					<feFuncB type='linear' slope='1.5' intercept='-0.25' />
				</feComponentTransfer>
			</filter>
			<rect width='100%' height='100%' filter={`url(#${id}-filter)`}></rect>
		</svg>
	)
})

{
	/* <svg id="noice">
    <filter id="noise-filter">
        <feTurbulence type="fractalNoise" baseFrequency="2" numOctaves="10" stitchTiles="stitch"></feTurbulence>
        <feColorMatrix type="saturate" values="0"></feColorMatrix>
        <feComponentTransfer>
            <feFuncR type="linear" slope="0.4"></feFuncR>
            <feFuncG type="linear" slope="0.4"></feFuncG>
            <feFuncB type="linear" slope="0.4"></feFuncB>
            <feFuncA type="linear" slope="0.5"></feFuncA>
        </feComponentTransfer>
        <feComponentTransfer>
            <feFuncR type="linear" slope="1.5" intercept="-0.25"/>
            <feFuncG type="linear" slope="1.5" intercept="-0.25"/>
            <feFuncB type="linear" slope="1.5" intercept="-0.25"/>
        </feComponentTransfer>
    </filter>
    <rect width="100%" height="100%" filter="url(#noise-filter)"></rect>
</svg> */
}

{
	/* <svg className='w-full h-dvh fixed inset-0 z-10' id={id}>
<filter id={`${id}_filter`}>
  <feTurbulence
    type='fractalNoise'
    baseFrequency={frequency}
    numOctaves={octaves}
    stitchTiles='stitch'
  ></feTurbulence>
  <feColorMatrix type='saturate' values='0'></feColorMatrix>
  <feComponentTransfer>
    <feFuncR type='linear' slope={brightness}></feFuncR>
    <feFuncG type='linear' slope={brightness}></feFuncG>
    <feFuncB type='linear' slope={brightness}></feFuncB>
    <feFuncA type='linear' slope={opacity}></feFuncA>
  </feComponentTransfer>
  <feComponentTransfer>
    <feFuncR type='linear' slope={contrast} intercept='-0.25' />
    <feFuncG type='linear' slope={contrast} intercept='-0.25' />
    <feFuncB type='linear' slope={contrast} intercept='-0.25' />
  </feComponentTransfer>
</filter>
<rect width='100%' height='100%' filter={`url(#${id}-filter)`}></rect>
</svg> */
}
