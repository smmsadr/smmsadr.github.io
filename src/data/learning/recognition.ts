// -----------------------------------------------------------------------
// Learning & Discovery — Awards & Recognition
// -----------------------------------------------------------------------
// Placeholder. Community, professional, and industry-level recognition
// distinct from academic outcomes. Will later replace the standalone
// Awards page section.
// -----------------------------------------------------------------------

export interface Recognition {
	title: string;
	issuer?: string;
	year?: number | string;
	category?: 'award' | 'talk' | 'feature' | 'endorsement' | 'community';
	summary?: string;
	url?: string;
}

export const recognition: Recognition[] = [
	{
		title: 'Placeholder — Conference presentation',
		issuer: 'International Conference on Quantum & Nonlinear Optics (QNO)',
		year: 2019,
		category: 'talk',
		summary:
			'Invited to present on quantum machine-learning clustering methods to a research audience in Kuala Lumpur.',
	},
	{
		title: 'Placeholder — Professional reference',
		issuer: 'Kinesso Australia · Quantitative Engineering',
		year: 'ongoing',
		category: 'endorsement',
		summary:
			'Standing collaboration and technical endorsement across markets — a reflection of cross-team trust rather than a single moment.',
	},
	{
		title: 'Placeholder recognition',
		issuer: 'To be filled',
		year: '—',
		category: 'community',
		summary:
			'Slot reserved for future recognition — talks, guest lectures, community contributions, or industry acknowledgments.',
	},
];

