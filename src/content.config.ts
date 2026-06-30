import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const baseSchema = z.object({
	title: z.string(),
	description: z.string(),
	publishDate: z.coerce.date(),
	tags: z.array(z.string()),
	img: z.string(),
	img_alt: z.string().optional(),
});

export const collections = {
	work: defineCollection({
		// Load Markdown files in the src/content/work directory.
		loader: glob({ base: './src/content/work', pattern: '**/*.md' }),
		schema: baseSchema,
	}),
	experience: defineCollection({
		loader: glob({ base: './src/content/experience', pattern: '**/*.md' }),
		schema: baseSchema,
	}),
	education: defineCollection({
		loader: glob({ base: './src/content/education', pattern: '**/*.md' }),
		schema: baseSchema,
	}),
	publications: defineCollection({
		loader: glob({ base: './src/content/publications', pattern: '**/*.md' }),
		schema: baseSchema,
	}),
	certifications: defineCollection({
		loader: glob({ base: './src/content/certifications', pattern: '**/*.md' }),
		schema: baseSchema,
	}),
};
