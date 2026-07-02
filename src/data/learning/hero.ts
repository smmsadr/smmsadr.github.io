// -----------------------------------------------------------------------
// Learning & Discovery — Hero content
// -----------------------------------------------------------------------
// Kept as data (not hardcoded in the component) so the copy can evolve
// without touching layout code, and stays consistent with the rest of
// the src/data/learning/* modules.
// -----------------------------------------------------------------------

export interface HeroBadge {
	icon: string;      // emoji or single glyph
	label: string;
}

export interface HeroStat {
	value: string;     // e.g. "3", "20+", "Current"
	label: string;     // e.g. "Degrees", "Years learning"
}

export interface HeroQuote {
	text: string;      // multi-line supported (\n)
	attribution?: string;
}

export interface HeroContent {
	eyebrow: string;
	headline: string;
	// Three poetic lines forming the subheading manifesto.
	subheading: string[];
	lede: string;
	badges: HeroBadge[];
	quote: HeroQuote;
	stats: HeroStat[];
}

export const heroContent: HeroContent = {
	eyebrow: 'Learning & Discovery',
	headline: 'Every System Begins with Learning',
	subheading: [
		'Physics taught me how systems behave.',
		'Computer science taught me how to build them.',
		'Research continues to challenge what I believe is possible.',
	],
	lede:
		'My career has never followed separate paths between engineering, research, and continuous learning. Each new challenge reshapes how I think, how I build, and how I approach complex systems.',
	badges: [
		{ icon: '🎓', label: 'Formal Education' },
		{ icon: '🔬', label: 'Research' },
		{ icon: '📚', label: 'Lifelong Learning' },
	],
	quote: {
		text: 'Education is not preparation for Life;\nEducation is Life itself.',
		attribution: 'John Dewey',
	},
	stats: [
		{ value: '3',    label: 'Degrees' },
		{ value: '20+',  label: 'Years learning' },
		{ value: 'Current', label: 'PhD candidate' },
		{ value: 'Multi', label: 'Research areas' },
	],
};

