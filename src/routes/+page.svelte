
<!-- SvelteKit text highlighting -->

<script lang="ts">
	import { invalidate } from '$app/navigation';
    import Pagination from '$lib/Pagination.svelte';
	import type { queryType } from '$lib/types';
    import { SlideToggle } from '@skeletonlabs/skeleton';

	export let data;
	
	let query: queryType;
	data.query.subscribe((value: any) => {
		query = value;
	});

	let pageChange = false;
	$: {
		query;
		if (!pageChange) {
			query.page = 0;
		} else {
			pageChange = false;
		}
		invalidate('index:query');
	};

	$: queryDefault = {
		author_keywords: '',
		content_keywords: '',
		hide_duplicates: false,
		date_from: "2011-12-18",
		date_to: "2023-08-28",
		sort: query.sort,
		per_page: query.per_page,
		page: query.page
	}

	$: pages = {
		current: query.page + 1,
		total: Math.ceil(data.response.comments_count / query.per_page)
	}

	const resetQuery = () => {
		query.author_keywords = queryDefault.author_keywords;
		query.content_keywords = queryDefault.content_keywords;
		query.hide_duplicates = queryDefault.hide_duplicates;
		query.date_from = queryDefault.date_from;
		query.date_to = queryDefault.date_to;
		query.sort = query.sort;
		query.per_page = queryDefault.per_page;
		query.page = queryDefault.page;
	};

	const timestamp = (input: Date) => {
		let dt = new Date(new Date(input).getTime() + 7200000).toISOString().split('T');
		let t = dt[1].split(':');
		return `[ ${dt[0]} ${t[0]}:${t[1]} ]`
	};

	const highlight = (text: string, query: string) => {
		const regex = new RegExp(query.trim(), "gi");
	  	return text.replace(regex, (match) => `<span class="bg-primary-100">${match}</span>`);
	}

	function turnPage(e: CustomEvent): void {
		const new_page = e.detail - 1;
		if (query.page != new_page) {
			pageChange = true;
			query.page = new_page;
		}
	}
</script>

<div class="card m-4">
	<header class="card-header p-3 bg-surface-500">
		<h4 class="h4 uppercase font-bold text-center text-primary-500">Információ</h4>
	</header>
	<section class="p-4">
		<h4 class="h4 text-left sm:text-justify">Ez a weboldal egy lapozható és szűrhető archívuma a <a class="anchor" href="https://demo200.5mp.eu/web.php?a=demo200&o=yDaKba7PGL">demo200.5mp.eu</a> adatbázisának.</h4>

		<div class="py-4 max-w-md grid grid-cols-2 gap-1 mx-auto">
			<div class="col-span-2 text-center uppercase font-medium">Néhány információ az adatbázisról</div>
			<div>Első hirdetés:</div>
			<div class="text-primary-500 text-right">2011-12-18</div>
			<div>Utolsó (nem botolt) hirdetés:</div>
			<div class="text-primary-500 text-right">2023-08-28</div>
			<div>Utolsó mentett állapot:</div>
			<div class="text-primary-500 text-right">2023-08-31 09:39</div>
			<div>Összes hirdetés:</div>
			<div class="text-primary-500 text-right">419 841</div>
			<div>Böngészhető hirdetés:</div>
			<div class="text-primary-500 text-right">33 926</div>
		</div>
		
		<p class="text-left sm:text-justify">Ez az utolsó biztonsági mentés, ami az összeomlás napján történt. A kimentett adatbázisból kitöröltem a legutóbbi botolásból létrejött hirdetéseket. Vannak egyéb botolások is (pl.: ElixirCraft), de az ehhez hasonló ismétlődő hirdetéseket ki lehet szűrni a "Duplikáltak elrejtése" kapcsolóval.</p>
	</section>
</div>

<div class="card m-4">
	<header class="card-header p-3 bg-surface-500">
		<h4 class="h4 uppercase font-bold text-center text-primary-500">Kereső</h4>
	</header>
	<section class="p-4">
		<div class="py-4 grid grid-cols-1 md:grid-cols-2 gap-2">
			<label class="label">
				<span>Szűrés névre</span>
				<div class="input-group input-group-divider grid-cols-[1fr_auto]">
					<input bind:value={query.author_keywords} class="input" type="text" placeholder="Keresés..." />
					{#if query.author_keywords != ""}
					<button class="btn" on:click={() => {query.author_keywords = ""}}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
						<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
					  </svg></button>
					{/if}
				</div>
			</label>
			<label class="label">
				<span>Szűrés tartalomra</span>
				<div class="input-group input-group-divider grid-cols-[1fr_auto]">
					<input bind:value={query.content_keywords} class="input" type="text" placeholder="Keresés..." />
					{#if query.content_keywords != ""}
					<button class="btn" on:click={() => {query.content_keywords = ""}}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
						<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
					  </svg></button>
					{/if}
				</div>
			</label>
			<div>
			<div class="mb-1">Duplikáltak elrejtése</div>
				<SlideToggle bind:checked={query.hide_duplicates} name="slide" active="bg-primary-500" rounded="none" />
			</div>
			
			<label class="label">
				<span>Dátum (tól - ig)</span>
				<div class="flex">
					<input bind:value={query.date_from} class="input" type="date" min="2011-12-18" max={query.date_to} />
					<div class="mx-2 my-auto">-</div>
					<input bind:value={query.date_to} class="input" type="date" min={query.date_from} max="2023-08-28" />
				</div>
			</label>
		</div>
		<button on:click={resetQuery} type="button" class="btn variant-filled bg-primary-500" disabled={JSON.stringify(query) === JSON.stringify(queryDefault)}>
			<span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
				<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
				<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
			  </svg></span>
			<span>Szűrők visszaállítása</span>
		</button>
	</section>
</div>
<div class="card m-4 mb-8">
	<div class="p-3 bg-surface-500 flex flex-wrap items-end justify-between">
		<div class="grid grid-cols-1 sm:grid-cols-2">
			<div class="my-auto">Találat: {new Intl.NumberFormat('hu-HU').format(data.response.comments_count)}</div>
			<div>
				<select bind:value={query.per_page} class="select">
					<option value={25}>25 / Oldal</option>
					<option value={50}>50 / Oldal</option>
					<option value={100}>100 / Oldal</option>
				</select>
			</div>
		</div>
		<div>
			<select bind:value={query.sort} class="select">
				<option value="asc">Dátum ⬆️</option>
				<option value="desc">Dátum ⬇️</option>
			</select>
		</div>
	</div>
</div>

{#if data.response.comments_count > 0}
	<Pagination on:turnPage={turnPage} {pages} />

	{#each data.response.comments as comment}
		<article class="card m-4">
			<header class="card-header p-3 flex justify-between">
				<h5 class="h5 text-black font-medium">{@html query.author_keywords ? highlight(comment.author, query.author_keywords) : comment.author}</h5>
				<h5 class="h5 text-black font-medium">{timestamp(comment.created)}</h5>
			</header>
			<hr class="!border-t-1" />
			<section class="p-4">
				<p class="comment">{@html query.content_keywords ? highlight(comment.content, query.content_keywords) : comment.content}</p>
			</section>
			<footer class="card-footer p-3">
				<p class="text-right text-primary-500 font-medium italic">#{comment.id}</p>
			</footer>
		</article>
	{/each}

	<Pagination on:turnPage={turnPage} {pages} />
{:else}
<div class="m-4 flex">
    <h4 class="h4 mx-auto">Nincs találat!</h4>
</div>
{/if}

<style>
	.comment {
		white-space: pre-wrap;
		word-break: break-word;
	}
</style>