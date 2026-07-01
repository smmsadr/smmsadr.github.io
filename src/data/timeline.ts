import type { iconPaths } from '../components/IconPaths';

export type TimelineEntry = {
	id: string;
	year: string;
	title: string;
	organization?: string;
	icon: keyof typeof iconPaths;
	description: string;
	tags?: string[];
	href?: string;
	current?: boolean;
};

/**
 * Roadmap order: Today (left) → back in time (right).
 * Rendered horizontally on desktop and vertically on smaller screens.
 */
export const timelineData: TimelineEntry[] = [
	{
		id: 'today',
		year: 'Today',
		title: 'Senior Quantitative Engineer',
		organization: 'Kinesso',
		icon: 'cpu',
		description:
			'Building optimization platforms, Hybrid AI systems, the Planning Agent, and quantum computing research.',
		tags: ['Hybrid AI', 'Optimization', 'Planning Agent', 'Quantum'],
		current: true,
	},
	{
		id: 'y2024',
		year: '2024',
		title: 'PhD Research',
		organization: 'University of Malaya',
		icon: 'rocket-launch',
		description:
			'Research in Hybrid Quantum Machine Learning, quantum classification, and optimization.',
		tags: ['QML', 'Quantum Classification', 'Optimization'],
	},
	{
		id: 'y2021',
		year: '2021',
		title: 'Senior Quantitative Engineer',
		organization: 'Kinesso',
		icon: 'chart-line-up',
		description:
			'Optimization engines, media planning, and decision systems built for production.',
		tags: ['Optimization Engines', 'Media Planning', 'Decision Systems', 'Python', 'Pyomo', 'AWS'],
	},
	{
		id: 'y2020',
		year: '2020',
		title: 'Master of Computer Science',
		organization: 'University of Malaya',
		icon: 'calculator',
		description: 'Machine Learning specialization.',
		tags: ['Machine Learning'],
	},
	{
		id: 'y2018',
		year: '2018',
		title: 'Quantitative Modelling Analyst',
		icon: 'strategy',
		description: 'Media and optimization modelling for marketing intelligence.',
		tags: ['Media', 'Optimization'],
	},
	{
		id: 'y2014',
		year: '2014',
		title: 'Research and Software Engineering',
		icon: 'code',
		description: 'Database systems, Linux, and scientific computing at production scale.',
		tags: ['Database Systems', 'Linux', 'Scientific Computing'],
	},
	{
		id: 'y2011',
		year: '2011',
		title: 'Master of Physics',
		icon: 'atom',
		description: 'Theoretical condensed matter physics.',
		tags: ['Condensed Matter', 'Theory'],
	},
	{
		id: 'y2008',
		year: '2008',
		title: 'Systems Engineer',
		icon: 'terminal-window',
		description: 'Linux, networks, and infrastructure engineering.',
		tags: ['Linux', 'Networks', 'Infrastructure'],
	},
	{
		id: 'y2001',
		year: '2001',
		title: 'Bachelor of Applied Physics',
		organization: 'Sharif University of Technology',
		icon: 'atom',
		description:
			'Foundations in mathematics, physics, and scientific computing.',
		tags: ['Physics', 'Mathematics'],
	},
];

