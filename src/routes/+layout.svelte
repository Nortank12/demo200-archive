<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-1" background="bg-black" class="place-items-center">
			<strong class="text-xl uppercase text-white">Demo200 Archívum</strong>
		</AppBar>
	</svelte:fragment>

	<div class="max-w-7xl mx-auto">
		<slot />
	</div>
</AppShell>
