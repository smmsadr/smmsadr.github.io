// -----------------------------------------------------------------------
// Learning & Discovery — Research vision & interests
// -----------------------------------------------------------------------
// Placeholder — will evolve into a richer research narrative.
// -----------------------------------------------------------------------

export interface ResearchVision {
	statement: string;            // one-sentence overall research thesis
	pillars: ResearchPillar[];
}

export interface ResearchPillar {
	title: string;
	summary: string;              // 1–2 sentence description
	keywords?: string[];
}

export const researchVision: ResearchVision = {
	statement:
		'Investigate how quantum computing, hybrid AI, and classical optimization can be combined into decision systems that are more scalable, explainable, and honest about uncertainty.',
	pillars: [
		{
			title: 'Quantum Machine Learning',
			summary:
				'Exploring quantum-native representations for clustering, similarity search, and language processing — with practical readiness on near-term hardware.',
			keywords: ['Quantum Clustering', 'Quantum Kernels', 'Variational Circuits'],
		},
		{
			title: 'Hybrid & Agentic AI',
			summary:
				'Blending symbolic optimization, probabilistic modelling, and LLM-driven agents into decision systems that remain auditable and robust in production.',
			keywords: ['Optimization + LLMs', 'Multi-agent Systems', 'Reasoning under Uncertainty'],
		},
		{
			title: 'Decision Intelligence at Scale',
			summary:
				'Turning quantitative models into reusable platforms — the engineering discipline behind reliable, explainable business decisions.',
			keywords: ['Optimization Platforms', 'MMM', 'Reach Modelling'],
		},
	],
};

