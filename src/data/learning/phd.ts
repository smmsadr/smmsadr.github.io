// -----------------------------------------------------------------------
// Learning & Discovery — Current PhD
// -----------------------------------------------------------------------
// Placeholder — will become one of the main story-carrying sections.
// -----------------------------------------------------------------------

export interface Supervisor {
	name: string;
	title?: string;                // e.g. "Professor", "Dr."
	affiliation?: string;
}

export interface PhD {
	program: string;               // e.g. "PhD Candidate, Computer Science"
	field: string;                 // e.g. "Quantum Computing"
	institution: string;
	location?: string;
	period: string;                // e.g. "2024 — Present"
	status: string;                // e.g. "In progress"
	researchTopic: string;
	summary: string;               // paragraph-length narrative
	supervisors: Supervisor[];
	focusAreas: string[];          // e.g. ["Quantum Machine Learning", "NLP"]
	milestones?: PhDMilestone[];   // roadmap-style checkpoints
}

export interface PhDMilestone {
	label: string;                 // e.g. "Proposal defense"
	period?: string;               // e.g. "2025"
	status: 'planned' | 'in-progress' | 'done';
}

export const phd: PhD = {
	program: 'PhD Candidate (Research), Computer Science',
	field: 'Quantum Computing',
	institution: 'University of Malaya',
	location: 'Kuala Lumpur, Malaysia',
	period: '2024 — Present',
	status: 'In progress',
	researchTopic: 'Quantum Hybrid Language Processing',
	summary:
		'Investigating how quantum representations and hybrid classical–quantum architectures can meaningfully advance language processing tasks — with a bias toward approaches that are engineering-ready on near-term hardware.',
	supervisors: [
		{ name: 'Loo Chu Kiong', title: 'Prof. Dr.', affiliation: 'Faculty of CS & IT, University of Malaya' },
		{ name: 'Liew Wei Shiung', title: 'Dr.', affiliation: 'Faculty of CS & IT, University of Malaya' },
	],
	focusAreas: [
		'Quantum Machine Learning',
		'Quantum-Hybrid NLP',
		'Variational Quantum Circuits',
		'Kernel & Similarity Methods',
	],
	milestones: [
		{ label: 'Enrolment', period: '2024', status: 'done' },
		{ label: 'Proposal defense', period: '2025', status: 'in-progress' },
		{ label: 'Candidature defense', period: '2026', status: 'planned' },
		{ label: 'Thesis submission', period: '—', status: 'planned' },
	],
};

