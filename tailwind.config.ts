import { join } from 'path'
import type { Config } from 'tailwindcss';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { Demo200_Theme } from './src/Demo200_Theme';
import forms from '@tailwindcss/forms';

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {},
	},
	plugins: [
		forms,
		skeleton({
			themes: {
				custom: [
					Demo200_Theme,
				],
			},
		}),
	],
} satisfies Config;
