import type { LoadEvent } from '@sveltejs/kit';
import type { queryType, returnType } from '$lib/types';
// import { queryDefault } from '$lib/types';
import { writable } from 'svelte/store';

let query = writable({
    author_keywords: '',
    content_keywords: '',
    hide_duplicates: false,
    date_from: "2011-12-18",
    date_to: "2023-08-28",
    sort: "desc",
    per_page: 25,
    page: 0
});

export async function load({ fetch, depends }: LoadEvent) {
    depends('index:query');
	
    let queryData: queryType | undefined;
	query.subscribe((value) => {
		queryData = value;
	});
    const response: any = (
        await fetch('/', {
            method: 'POST',
            body: JSON.stringify({ ...queryData })
        })
    );
    console.log(response);
    return {
        query,
        response: await response.json()
    };
};

export const ssr = false;