// -----------------------------------------------------------------------
// Learning & Discovery — Publications
// -----------------------------------------------------------------------
// Placeholder data sourced from CV. Will later merge with the
// `publications` content collection for full detail pages.
// -----------------------------------------------------------------------

export interface Publication {
	title: string;
	authors: string[];
	venue: string;                 // conference, journal, or preprint venue
	year: number;
	status: 'published' | 'accepted' | 'submitted' | 'presented' | 'preprint';
	type?: 'journal' | 'conference' | 'workshop' | 'preprint';
	pageOrId?: string;             // page number, article id, DOI, etc.
	url?: string;
}

export const publications: Publication[] = [
	{
		title:
			'Enhanced Dynamic Quantum Clustering based on Von Neumann Entropy',
		authors: ['S. M. M. Sadrnezhaad', 'Chu Kiong Loo'],
		venue: 'Quantum Machine Intelligence',
		year: 2023,
		status: 'submitted',
		type: 'journal',
	},
	{
		title: 'Quantum Machine Learning: Study of Clustering Methods',
		authors: ['S. M. M. Sadrnezhaad', 'Chu Kiong Loo'],
		venue: 'QNO 2019 — International Conference on Quantum & Nonlinear Optics, Kuala Lumpur',
		year: 2019,
		status: 'presented',
		type: 'conference',
	},
	{
		title:
			'Enhanced Dynamic Quantum Clustering based on Von Neumann Entropy',
		authors: ['S. M. M. Sadrnezhaad', 'Chu Kiong Loo'],
		venue: 'QNO 2018 — International Conference on Quantum & Nonlinear Optics, Kuala Lumpur',
		year: 2018,
		status: 'published',
		type: 'conference',
		pageOrId: 'p. 78',
	},
	{
		title:
			'Analytical Results in Coherent Quantum Transport for Quantum Dot with Periodic Time-variable Potential',
		authors: ['S. M. M. Sadrnezhaad', 'H. Cheraghchi'],
		venue: '42nd International School & Conference on the Physics of Semiconductors, Jaszowiec 2013',
		year: 2013,
		status: 'published',
		type: 'conference',
		pageOrId: 'TuP61 · p. 177',
	},
];

