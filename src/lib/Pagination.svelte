<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let pages: {
        current: number
        total: number
    };
	const dispatch = createEventDispatcher();

	$: {
		pages.current;
		dispatch('turnPage', pages.current);
	}
</script>
<div class="m-4 flex">
    <div class="btn-group variant-filled bg-surface-700 mx-auto">
        {#if pages.current > 3}
            <button on:click={() => (pages.current = 1)} >1...</button>
        {/if}
        {#if pages.current > 1}
            <button on:click={() => (pages.current = pages.current - 1)} >&lt;</button>
        {/if}
        {#if pages.current - 2 >= 1}
            <button on:click={() => (pages.current = pages.current - 2)} >{pages.current - 2}</button>
        {/if}
        {#if pages.current - 1 >= 1}
            <button on:click={() => (pages.current = pages.current - 1)} >{pages.current - 1}</button>
        {/if}
            <button class="!bg-primary-500 !hover:bg-primary-500" disabled>{pages.current}</button>
        {#if pages.current + 1 <= pages.total}
            <button on:click={() => (pages.current = pages.current + 1)} >{pages.current + 1}</button>
        {/if}
        {#if pages.current + 2 <= pages.total}
            <button on:click={() => (pages.current = pages.current + 2)} >{pages.current + 2}</button>
        {/if}
        {#if pages.current < pages.total}
            <button on:click={() => (pages.current = pages.current + 1)} >&gt;</button>
        {/if}
        {#if pages.current + 2 < pages.total}
            <button on:click={() => (pages.current = pages.total)} >...{pages.total}</button>
        {/if}
    </div>
</div>