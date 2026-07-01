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
	blog: defineCollection({
		// Load Markdown files in the src/content/blog directory.
		loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
		schema: baseSchema.extend({
			// Optional canonical URL for posts hosted externally (e.g. Medium).
			externalUrl: z.string().url().optional(),
			// Optional reading time in minutes for the editorial list.
			readingMinutes: z.number().int().positive().optional(),
		}),
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
