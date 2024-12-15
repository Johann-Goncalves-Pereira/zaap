import {
	component$,
	createContextId,
	useContextProvider,
	useSignal,
	type Signal,
} from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'
import {
	LuHome,
	LuKeyRound,
	LuLibraryBig,
	LuLogIn,
} from '@qwikest/icons/lucide'

type Languages = 'en' | 'es' | 'pt-br'

export const LanguageContext = createContextId<Signal<Languages>>(
	'global.language-context',
)

export default component$(() => {
	const languages: Languages[] = ['en', 'es', 'pt-br']
	const language = useSignal<Languages>('pt-br')
	const langEmoji = languages.map(lang => {
		switch (lang) {
			case 'en':
				return '🇺🇸'
			case 'es':
				return '🇪🇸'
			case 'pt-br':
				return '🇧🇷'
		}
	})

	useContextProvider(LanguageContext, language)

	return (
		<header class='fixed inset-0 z-20 mx-auto mt-4 mb-auto flex h-max w-max'>
			<div
				class='hover:[&~div]:ease-pop-out absolute inset-0 m-auto h-2 w-2 cursor-pointer rounded-full bg-amber-400 dark:bg-amber-600 hover:[&~div]:scale-100'
				aria-hidden='true'
			/>
			<div class='focus-within:ease-pop-out flex origin-center scale-0 transform-gpu items-center rounded-full border border-amber-300 bg-indigo-200/50 px-2 text-sm backdrop-blur-2xl transition-transform will-change-transform focus-within:scale-100 hover:scale-100 portrait:scale-100 dark:border-amber-700 dark:bg-amber-900/50'>
				<nav class='flex items-center'>
					<Link class='rounded-full p-2' href='/'>
						<span class='sr-only'>Inicio</span>
						<LuHome font-size={16} />
					</Link>
					<Link class='rounded-full p-2' href='/gallery'>
						<span class='sr-only'>Galeria</span>
						<LuLibraryBig font-size={16} />
					</Link>
					<div class='flex items-center overflow-hidden transition-all hover:w-16 landscape:w-8'>
						<Link class='rounded-full p-2' href='/log-in'>
							<span class='sr-only'>Log In</span>
							<LuKeyRound font-size={16} />
						</Link>
						<Link class='rounded-full p-2' href='/sign-in'>
							<span class='sr-only'>Sign In</span>
							<LuLogIn font-size={16} />
						</Link>
					</div>
				</nav>
				<hr class='mx-2 h-4 w-px border-0 bg-amber-500' />
				<label for='layout__header__select--lang' class='sr-only'>
					Language
				</label>
				<select
					class='cursor-pointer appearance-none rounded-full p-2'
					name='layout__header__select--lang'
					id='layout__header__select--lang'
					onSelect$={(event: Event) => {
						const select = event.target as HTMLSelectElement
						language.value = select.value as Languages
					}}
				>
					{languages.map((lang, index) => (
						<option value={lang} key={lang}>
							{langEmoji[index]}
						</option>
					))}
				</select>
			</div>
		</header>
	)
})
