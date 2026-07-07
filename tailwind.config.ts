import { join } from 'node:path';

import { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
	content: [
		join(__dirname, 'src/**/*!(*.stories|*.spec).{ts,tsx,html}'),
	],
	darkMode: 'class',
	theme: {
		fontSize: {
			h1: ['2.5rem', '2.5rem'],
			h2: ['2rem', '2.2rem'],
			h3: ['1.75rem', '1.95rem'],
			h4: ['1.5rem', '1.5rem'],
			h5: ['1.25rem', '1.25rem'],
			large: ['1.125rem', '1.25rem'],
			normal: ['1rem', '1.25rem'],
			small: ['0.875rem', '1.18rem'],
			tiny: ['0.75rem', '0.875rem'],
		},
		colors: {
			transparent: 'transparent',
			inherit: 'inherit',
			white: '#FFF',
			black: '#000',
			test: 'var(--color-test)',
			primary: 'var(--c-primary)',
			primaryLight: 'var(--c-primary-light)',
			errorText1: 'var(--c-error-1)',
			errorBg1: 'var(--c-error-bg)',
			pageBg: 'var(--page-background)',
			cardBg: 'var(--card-background)',
			cardBg2: 'var(--card-background2)',
			text1: 'var(--c-text)',
			textLight: 'var(--c-text-light)',
			text2: 'var(--c-textP)',
			hover1: 'var(--c-primary-hover)',
			gray50: 'var(--c-gray-50)',
			gray60: 'var(--c-gray-60)',
			gray70: 'var(--c-gray-70)',
			gray80: 'var(--c-gray-80)',
			positive: 'var(--c-positive)',
			negative: 'var(--c-negative)',
			primary50: 'var(--c-primary-50)',
			primary40: 'var(--c-primary-40)',
			primary30: 'var(--c-primary-30)',
			primary20: 'var(--c-primary-20)',
			primary10: 'var(--c-primary-10)',
			primary0: 'var(--c-primary-0)',
			// primary: {
			// 	100: '#DED6EB',
			// 	200: '#C3ADD7',
			// 	300: '#A883C3',
			// 	400: '#8D59AF',
			// 	500: '#563B8B',
			// 	600: '#4D347D',
			// 	700: '#432E6F',
			// 	800: '#392560',
			// },
			state: {
				error: {
					10: '#410002',
					20: '#690005',
					25: '#7e0007',
					30: '#93000a',
					35: '#a80710',
					40: '#ba1a1a',
					50: '#de3730',
					60: '#ff5449',
					70: '#ff897d',
					80: '#ffb4ab',
					90: '#ffdad6',
					95: '#ffedea',
					98: '#fff8f7',
					99: '#fffbff',
				},
				success: {
					50: '#05d509',
				},
			},
			toast: {
				success: '#6d7c5a',
				warning: '#be8863',
			},
		},
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
         'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	plugins: [
		plugin(({ addComponents }) =>
			addComponents({
				'.body-large-bold': {
					'@apply text-large font-bold': {},
				},
				'.body-large-medium': {
					'@apply text-large font-medium': {},
				},
				'.body-large-regular': {
					'@apply text-large font-normal': {},
				},
				'.body-normal-bold': {
					'@apply text-normal font-bold': {},
				},
				'.body-normal-medium': {
					'@apply text-normal font-medium': {},
				},
				'.body-normal-regular': {
					'@apply text-normal font-normal': {},
				},
				'.body-small-bold': {
					'@apply text-small font-bold': {},
				},
				'.body-small-medium': {
					'@apply text-small font-medium': {},
				},
				'.body-small-regular': {
					'@apply text-small font-normal': {},
				},
				'.body-tiny-bold': {
					'@apply text-tiny font-bold': {},
				},
				'.body-tiny-medium': {
					'@apply text-tiny font-medium': {},
				},
				'.body-tiny-regular': {
					'@apply text-tiny font-normal': {},
				},
				'.title-h1': {
					'@apply text-h1 font-bold tracking-wide': {},
				},
				'.title-h2': {
					'@apply text-h2 font-bold tracking-wide': {},
				},
				'.title-h3': {
					'@apply text-h3 font-bold tracking-wide': {},
				},
				'.title-h4': {
					'@apply text-h4 font-bold tracking-wide': {},
				},
				'.title-h5': {
					'@apply text-h5 font-bold tracking-wide': {},
				},
				'.hide-scrollbar': {
					'-ms-overflow-style': 'none' /* IE and Edge */,
					'scrollbar-width': 'none' /* Firefox */,
					'&::-webkit-scrollbar': {
						display: 'none' /* Chrome, Safari and Opera */,
					},
				},
				'.btn-hovered': {
					boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.2), 0px 1px 5px 0px rgba(0,0,0,0.2)',
				},
				'.break-smart': {
					'word-break': 'break-word',
					'overflow-wrap': 'break-word',
				},
				'.modal-shadow': {
					boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.2), 0px 1px 5px 0px rgba(0,0,0,0.3)',
				},
				'.scope-selector-shadow': {
					boxShadow: '0px 3px 5px -1px rgb(0 0 0 / 20%), 0px -6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)',
				},
			}),
		),
	],
};
export default config;
