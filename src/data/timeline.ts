import type { iconPaths } from '../components/IconPaths';

export type TimelineEntry = {
	id: string;
	year: string;
	chapter: string;
	kind: 'education' | 'experience';
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
		year: '2021–Present',
		chapter: 'CURRENT: Decision Intelligence',
		kind: 'experience',
		title: 'Senior Data Scientist & Quantitative Engineer',
		organization: 'KINESSO, Kuala Lumpur, Malaysia',
		icon: 'cpu',
		description:
			'Architecting AI-driven optimization platforms for global media planning and decision support, combining mathematical optimization, machine learning, and generative AI in production systems.',
		tags: ['Pyomo', 'GAMS', 'CPLEX', 'IPOPT', 'LangChain', 'LangGraph', 'Gemini', 'Python'],
		href: '/experience/senior-data-scientist-quantitative-engineer-kinesso/',
		current: true,
	},
	{
		id: 'y2024',
		year: '2024–Present',
		chapter: 'Quantum Computing',
		kind: 'education',
		title: 'PhD Candidate (Research), Computer Science (Quantum Computing)',
		organization: 'University of Malaya',
		icon: 'rocket-launch',
		description:
			'Research field: Quantum Machine Learning. Supervisors: Prof. Dr. Loo Chu Kiong and Dr. Liew Wei Shiung.',
		tags: ['Quantum Computing', 'Quantum Hybrid Language Processing'],
		href: '/learning/phd-candidate-university-of-malaya/',
	},
	{
		id: 'y2021',
		year: '2021',
		chapter: 'Optimization',
		kind: 'experience',
		title: 'Quantitative Engineer',
		organization: 'KINESSO, Kuala Lumpur, Malaysia',
		icon: 'chart-line-up',
		description:
			'Enhanced cross-channel planning and optimization models, improved TV and OOH audience workflows, and delivered solver-backed analytics services integrated with cloud data platforms.',
		tags: ['Cross-channel Optimization', 'TV/OOH', 'Python', 'Analytics Services'],
		href: '/experience/quantitative-engineer-kinesso/',
	},
	{
		id: 'y2018a',
		year: '2018–2021',
		chapter: 'Marketing Science',
		kind: 'experience',
		title: 'Quantitative Modelling Analyst',
		organization: 'KINESSO Malaysia (formerly IPG Mediabrands Technologies), Kuala Lumpur, Malaysia',
		icon: 'strategy',
		description:
			'Developed audience and media-response models, contributed to marketing mix and omnichannel optimization initiatives, and built large-scale analytical pipelines for planning tools.',
		tags: ['Audience Models', 'Marketing Mix', 'Omnichannel Optimization', 'Data Pipelines'],
		href: '/experience/quantitative-modelling-analyst-kinesso/',
	},
	{
		id: 'y2018',
		year: '2018',
		chapter: 'Media Analytics',
		kind: 'experience',
		title: 'Quantitative Modelling Analyst',
		organization: 'EXPERIS (contract for IPG Mediabrands Technologies), Kuala Lumpur, Malaysia',
		icon: 'strategy',
		description:
			'Delivered contract quantitative modelling for a media technology team on a fast turnaround — the eight-month engagement that seeded the analytics later scaled into production and led directly to the full-time role at Kinesso.',
		tags: ['Quantitative Modelling', 'Media Planning', 'Contract'],
		href: '/experience/quantitative-modelling-analyst-experis/',
	},
	{
		id: 'y2016',
		year: '2016–2018',
		chapter: 'Trading Systems',
		kind: 'experience',
		title: 'Quantitative Analyst',
		organization: 'DERIV (formerly Binary Group Services), Cyberjaya, Malaysia',
		icon: 'chart-line-up',
		description:
			'Built and maintained quantitative models and analytics workflows for trading-related decision support.',
		tags: ['Quantitative Analysis', 'Modelling', 'Python'],
		href: '/experience/quantitative-analyst-deriv/',
	},
	{
		id: 'y2014a',
		year: '2014–2020',
		chapter: 'Computer Science',
		kind: 'education',
		title: 'MSc, Computer Science (Computing & Machine Learning)',
		organization: 'University of Malaya',
		icon: 'calculator',
		description:
			'Thesis: Enhanced Dynamic Quantum Clustering based on Von Neumann Entropy. Supervisor: Prof. Loo Chu Kiong.',
		tags: ['Machine Learning', 'Quantum Clustering', 'Von Neumann Entropy'],
		href: '/learning/msc-computer-science-university-of-malaya/',
	},
	{
		id: 'y2014',
		year: '2014–2016',
		chapter: 'Infrastructure',
		kind: 'experience',
		title: 'Linux Administration & DevOps Engineer',
		organization: 'DERIV (formerly Binary Group Services), Cyberjaya, Malaysia',
		icon: 'code',
		description:
			'Delivered Linux administration and DevOps engineering for production systems and deployment workflows.',
		tags: ['Linux', 'DevOps', 'Infrastructure'],
		href: '/experience/linux-admin-devops-deriv/',
	},
	{
		id: 'y2011',
		year: '2011–2014',
		chapter: 'Systems',
		kind: 'experience',
		title: 'Linux System Administrator & DBA',
		organization: 'BEHESTAN RAYAN COMPANY, Tehran, Iran',
		icon: 'terminal-window',
		description:
			'Managed Linux infrastructure and database systems while supporting core business platforms.',
		tags: ['Linux Administration', 'Database Administration', 'Infrastructure', 'Oracle DBA'],
		href: '/experience/linux-admin-dba-behestan-rayan/',
	},
	{
		id: 'y2008',
		year: '2008–2010',
		chapter: 'Foundations',
		kind: 'experience',
		title: 'IT Manager',
		organization: 'MATERIALS AND ENERGY RESEARCH CENTER, Karaj, Iran',
		icon: 'terminal-window',
		description:
			'Led IT operations, systems administration, and service support across research and administrative teams — where the systems thinking journey began.',
		tags: ['IT Management', 'Linux', 'Networks', 'Infrastructure'],
		href: '/experience/it-manager-merc/',
	},
	{
		id: 'y2001',
		year: '2001–2007',
		chapter: 'Physics',
		kind: 'education',
		title: 'BSc, Physics',
		organization: 'Sharif University of Technology',
		icon: 'atom',
		description:
			'Project: Analytical Solution of Heisenberg Model for one-dimensional quantum spin system. Supervisor: Prof. Abdollah Langari.',
		tags: ['Physics', 'Heisenberg Model', 'Quantum Spin Systems'],
		href: '/learning/bsc-physics-sharif-university/',
	},
];

