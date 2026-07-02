// -----------------------------------------------------------------------
// Learning & Discovery — Formal education entries
// -----------------------------------------------------------------------
// Placeholder data. Individual degree detail pages live under the
// `education` content collection so URLs like /learning/<slug>/ still
// resolve to their existing markdown content.
// -----------------------------------------------------------------------

export interface Education {
	slug: string;                 // matches src/content/education/<slug>.md
	degree: string;               // e.g. "PhD Candidate — Computer Science"
	field?: string;               // e.g. "Quantum Computing"
	institution: string;
	location?: string;
	period: string;               // e.g. "2024 — Present" or "2023"
	status?: string;              // e.g. "In progress", "Completed"
	summary: string;              // 1–2 sentence description
	href?: string;                // internal detail URL (auto-derived if slug set)
}

export const education: Education[] = [
	{
		slug: 'phd-candidate-university-of-malaya',
		degree: 'PhD Candidate — Computer Science',
		field: 'Quantum Computing / Quantum Machine Learning',
		institution: 'University of Malaya',
		location: 'Kuala Lumpur, Malaysia',
		period: '2024 — Present',
		status: 'In progress',
		summary:
			'Research on Quantum Hybrid Language Processing under Prof. Dr. Loo Chu Kiong and Dr. Liew Wei Shiung — connecting quantum computation to modern language modelling.',
		href: '/learning/phd-candidate-university-of-malaya/',
	},
	{
		slug: 'msc-computer-science-university-of-malaya',
		degree: 'MSc — Computer Science',
		field: 'Computing & Machine Learning',
		institution: 'University of Malaya',
		location: 'Kuala Lumpur, Malaysia',
		period: '2014 — 2023',
		status: 'Completed',
		summary:
			'Thesis: "Enhanced Dynamic Quantum Clustering based on Von Neumann Entropy" under Prof. Loo Chu Kiong. Bridged classical clustering with quantum-inspired representations.',
		href: '/learning/msc-computer-science-university-of-malaya/',
	},
	{
		slug: 'bsc-physics-sharif-university',
		degree: 'BSc — Physics',
		institution: 'Sharif University of Technology',
		location: 'Tehran, Iran',
		period: '2001 — 2007',
		status: 'Completed',
		summary:
			'Undergraduate project: "Analytical Solution of the Heisenberg Model for a one-dimensional quantum spin system" under Prof. Abdollah Langari.',
		href: '/learning/bsc-physics-sharif-university/',
	},
];

