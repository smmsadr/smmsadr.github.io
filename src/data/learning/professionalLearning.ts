// -----------------------------------------------------------------------
// Learning & Discovery — Professional learning
// -----------------------------------------------------------------------
// Replaces the old "Certifications" concept. Umbrella container for
// certifications, courses, workshops, and any ongoing continuous
// learning. Placeholder — seeded from CV.
// -----------------------------------------------------------------------

export type ProfessionalLearningKind =
	| 'certification'
	| 'course'
	| 'workshop'
	| 'continuous';

export interface ProfessionalLearningItem {
	title: string;
	provider: string;
	kind: ProfessionalLearningKind;
	year: number | string;
	summary?: string;              // optional 1-line description
	credentialUrl?: string;
}

export const professionalLearning: ProfessionalLearningItem[] = [
	{
		title: 'AWS Certified AI Practitioner',
		provider: 'Amazon Web Services',
		kind: 'certification',
		year: 2026,
	},
	{
		title: 'Agentic AI',
		provider: 'DeepLearning.AI',
		kind: 'course',
		year: 2026,
	},
	{
		title: 'Introduction to Quantum Information',
		provider: 'KAIST via Coursera',
		kind: 'course',
		year: 2025,
	},
	{
		title: 'Data Science and Machine Learning: Making Data-Driven Decisions',
		provider: 'MIT IDSS · Great Learning',
		kind: 'course',
		year: 2022,
	},
	{
		title: 'Artificial Intelligence and Machine Learning',
		provider: 'The University of Texas at Austin · Great Learning',
		kind: 'course',
		year: 2020,
	},
	{
		title: 'Quantum Machine Learning',
		provider: 'University of Toronto via edX',
		kind: 'course',
		year: 2019,
	},
	{
		title: 'Quantum Computing & Quantum Internet — Professional Certification',
		provider: 'TU Delft via edX',
		kind: 'certification',
		year: 2018,
	},
	{
		title: 'Joint AIS–ICTP School on Quantum Information Processing',
		provider: 'ICTP · NUS',
		kind: 'workshop',
		year: 2016,
	},
	{
		title: 'Continuous exploration',
		provider: 'Self-directed',
		kind: 'continuous',
		year: 'ongoing',
		summary:
			'Reading, replicating papers, and building small research prototypes in quantum ML, agentic AI, and mathematical optimization.',
	},
];

