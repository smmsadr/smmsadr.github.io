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

// Extra fields for Engineering Journey milestones — each experience
// markdown file describes a role that appears on the timeline AND
// gets a detail page. All new fields are optional so existing
// content still validates.
const experienceExtras = z.object({
	position: z.string().optional(),
	company: z.string().optional(),
	location: z.string().optional(),
	era: z.string().optional(),
	shortLabel: z.string().optional(),
	mission: z.string().optional(),
	achievements: z.array(z.string()).optional(),
	tech: z
		.array(
			z.object({
				label: z.string(),
				items: z.array(z.string()),
			}),
		)
		.optional(),
	metrics: z.array(z.string()).optional(),
	emphasis: z.enum(['primary', 'secondary', 'tertiary']).optional(),
	accent: z.enum(['cyan', 'violet', 'blue', 'teal']).optional(),
	current: z.boolean().optional(),
	// Explicit ordinal for the timeline (1 = newest). If missing we
	// fall back to publishDate desc.
	order: z.number().int().positive().optional(),
	// Set to true to hide a role from the timeline (still generates
	// a detail page).
	hidden: z.boolean().optional(),
});

export const collections = {
	writing: defineCollection({
		// Load Markdown files in the src/content/writing directory.
		loader: glob({ base: './src/content/writing', pattern: '**/*.md' }),
		schema: baseSchema.extend({
			// Optional canonical URL for posts hosted externally (e.g. Medium).
			externalUrl: z.string().url().optional(),
			// Optional reading time in minutes for the editorial list.
			readingMinutes: z.number().int().positive().optional(),
		}),
	}),
	experience: defineCollection({
		loader: glob({ base: './src/content/experience', pattern: '**/*.md' }),
		schema: baseSchema.merge(experienceExtras),
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
