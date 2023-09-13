import { PrismaClient } from '@prisma/client';
import type { queryType, returnType } from '$lib/types';

const prisma = new PrismaClient();

export async function POST(requestEvent) {
	const { request } = requestEvent;
	const query: queryType = await request.json();

	let filters = {
		author: {
			contains: query.author_keywords.trim()
		},
		content: {
			contains: query.content_keywords.trim()
		},
		created: {
			gte: query.date_from ? new Date(query.date_from) : undefined,
			lte: query.date_to ? new Date(query.date_to + "T23:59:59") : undefined
		},
		unique: {
			equals: query.hide_duplicates ? true : undefined
		}
	}

	const commentsCount = await prisma.comment.count({ where: filters});
	const comments = await prisma.comment.findMany({
		where: filters,
		take: query.per_page,
		skip: query.page * query.per_page,
		orderBy: {
			created: query.sort
		}
	});
	return new Response(JSON.stringify(
		<returnType>{
			comments: comments,
			comments_count: commentsCount
		}));
}