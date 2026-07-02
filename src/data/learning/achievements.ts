// -----------------------------------------------------------------------
// Learning & Discovery — Academic achievements
// -----------------------------------------------------------------------
// Placeholder. Distinct from awards/recognition; this is for
// scholastic outcomes such as scholarships, top-of-cohort standings,
// dean's-list-style markers, teaching contributions, etc.
// -----------------------------------------------------------------------

export interface Achievement {
	title: string;
	context?: string;              // institution or programme
	year?: number | string;
	summary?: string;
}

export const achievements: Achievement[] = [
	{
		title: 'Research supervision context',
		context: 'University of Malaya — Faculty of Computer Science & IT',
		year: '2018 — Present',
		summary:
			'Long-standing collaboration with the Advanced Robotics Lab team on quantum machine learning research spanning MSc through PhD candidature.',
	},
	{
		title: 'Undergraduate research fellow',
		context: 'Sharif University of Technology — Physics Department',
		year: 2007,
		summary:
			'Selected for undergraduate research collaboration on analytical solutions to one-dimensional quantum spin systems (Heisenberg model).',
	},
	{
		title: 'Placeholder achievement',
		context: 'To be filled',
		year: '—',
		summary:
			'Slot reserved for a future academic milestone. Detailed content will be added later.',
	},
];

