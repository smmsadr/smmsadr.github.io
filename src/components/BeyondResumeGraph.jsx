import { motion, useReducedMotion } from 'framer-motion';
import { useMemo, useState } from 'react';
import './beyond-resume-graph.css';

const nodes = [
	{
		id: 'curiosity',
		title: 'Curiosity',
		short: 'Every answer opens another interesting question.',
		influence:
			'Curiosity is the common thread connecting every stage of my scientific and engineering journey.',
		tier: 'primary',
		x: 48,
		y: 51,
		fx: 1.5,
		fy: -1.2,
		core: true,
	},
	{
		id: 'science',
		title: 'Science',
		short:
			'Seeking elegant explanations through observation, experimentation, and mathematical reasoning.',
		influence:
			'Science teaches me to test assumptions, validate evidence, and build models that explain complexity.',
		tier: 'major',
		x: 72,
		y: 22,
		fx: 1.6,
		fy: -0.9,
	},
	{
		id: 'systems',
		title: 'Systems Thinking',
		short: 'Looking beyond individual components to understand the whole system.',
		influence:
			'It helps me design architectures where interactions are as intentional as the components themselves.',
		tier: 'major',
		x: 82,
		y: 48,
		fx: 2,
		fy: 0.6,
	},
	{
		id: 'philosophy',
		title: 'Philosophy',
		short: 'Learning to ask better questions before searching for better answers.',
		influence:
			'Philosophy strengthens my reasoning so decisions are framed carefully before they are optimized.',
		tier: 'major',
		x: 66,
		y: 76,
		fx: -0.8,
		fy: 1.7,
	},
	{
		id: 'history',
		title: 'History',
		short: 'Understanding how civilizations, technology, and societies evolve.',
		influence:
			'History reminds me that many modern engineering challenges are variations of timeless patterns.',
		tier: 'supporting',
		x: 38,
		y: 82,
		fx: -0.5,
		fy: 1.9,
	},
	{
		id: 'diving',
		title: 'Technical Diving',
		short: 'Preparation, discipline, and calm under pressure.',
		influence:
			'Every dive reinforces planning, redundancy, and systematic decision making under uncertainty.',
		tier: 'supporting',
		x: 12,
		y: 58,
		fx: -1.9,
		fy: 0.8,
	},
	{
		id: 'traveller',
		title: 'World Traveller',
		short: 'Experiencing cultures, people, and ideas from around the world.',
		influence:
			'Travel broadens perspective and helps me design for context, not just technical assumptions.',
		tier: 'supporting',
		x: 22,
		y: 26,
		fx: -1.6,
		fy: -1.1,
	},
	{
		id: 'learning',
		title: 'Lifelong Learning',
		short: 'Always studying. Always improving. Always curious.',
		influence:
			'Continuous learning keeps my methods adaptable as tools, domains, and constraints evolve.',
		tier: 'supporting',
		x: 36,
		y: 12,
		fx: 0.7,
		fy: -2,
	},
	{
		id: 'engineering',
		title: 'Engineering',
		short: 'Turning ideas into dependable systems that can be trusted in practice.',
		influence:
			'Engineering grounds curiosity in delivery, where rigor, constraints, and craftsmanship meet.',
		tier: 'supporting',
		x: 60,
		y: 30,
		fx: 1.4,
		fy: 1.3,
	},
];

const edges = [
	// Strong: Curiosity → Major concepts
	{ id: 'cur-science', source: 'curiosity', target: 'science', strength: 'strong' },
	{ id: 'cur-systems', source: 'curiosity', target: 'systems', strength: 'strong' },
	{ id: 'cur-philosophy', source: 'curiosity', target: 'philosophy', strength: 'strong' },
	// Medium: Curiosity → Supporting concepts
	{ id: 'cur-history', source: 'curiosity', target: 'history', strength: 'medium' },
	{ id: 'cur-diving', source: 'curiosity', target: 'diving', strength: 'medium' },
	{ id: 'cur-traveller', source: 'curiosity', target: 'traveller', strength: 'medium' },
	{ id: 'cur-learning', source: 'curiosity', target: 'learning', strength: 'medium' },
	{ id: 'cur-engineering', source: 'curiosity', target: 'engineering', strength: 'medium' },
	// Subtle: cross-cluster secondary connections (dashed)
	{ id: 'science-engineering', source: 'science', target: 'engineering', strength: 'subtle' },
	{ id: 'science-systems', source: 'science', target: 'systems', strength: 'subtle' },
	{ id: 'history-philosophy', source: 'history', target: 'philosophy', strength: 'subtle' },
	{ id: 'traveller-history', source: 'traveller', target: 'history', strength: 'subtle' },
	{ id: 'engineering-systems', source: 'engineering', target: 'systems', strength: 'subtle' },
];

const nodeMap = Object.fromEntries(nodes.map((node) => [node.id, node]));

function clamp(value, min, max) {
	return Math.min(max, Math.max(min, value));
}

function relatedNodeIds(id) {
	const related = new Set([id]);
	for (const edge of edges) {
		if (edge.source === id) related.add(edge.target);
		if (edge.target === id) related.add(edge.source);
	}
	return related;
}

function iconFor(id) {
	switch (id) {
		case 'curiosity':
			return (
				<>
					<circle cx="11" cy="11" r="7" />
					<path d="m20 20-3.6-3.6" />
				</>
			);
		case 'science':
			return (
				<>
					<path d="M4 19h16" />
					<path d="m7 19 5-12 5 12" />
					<circle cx="12" cy="6" r="1.7" />
				</>
			);
		case 'systems':
			return (
				<>
					<circle cx="12" cy="5" r="1.7" />
					<circle cx="5" cy="19" r="1.7" />
					<circle cx="19" cy="19" r="1.7" />
					<path d="M12 7v5m0 0-7 6m7-6 7 6" />
				</>
			);
		case 'philosophy':
			return (
				<>
					<path d="M9 18h6M10 21h4" />
					<path d="M15.2 14c.2-1 .7-1.8 1.5-2.6A4.8 4.8 0 0 0 18.2 8a6.2 6.2 0 0 0-12.4 0c0 1.1.3 2.4 1.6 3.6A4.8 4.8 0 0 1 8.9 14" />
				</>
			);
		case 'history':
			return (
				<>
					<path d="M3 21h18" />
					<path d="M5 21V8l7-4 7 4v13" />
					<path d="M9 21v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4" />
				</>
			);
		case 'diving':
			return (
				<>
					<path d="M2 7c1.5 0 2.5 1 4 1s2.5-1 4-1 2.5 1 4 1 2.5-1 4-1" />
					<path d="M2 12c1.5 0 2.5 1 4 1s2.5-1 4-1 2.5 1 4 1 2.5-1 4-1" />
					<path d="M2 17c1.5 0 2.5 1 4 1s2.5-1 4-1 2.5 1 4 1 2.5-1 4-1" />
				</>
			);
		case 'traveller':
			return (
				<>
					<circle cx="12" cy="12" r="9" />
					<path d="M3 12h18" />
					<path d="M12 3a14 14 0 0 1 3.4 9A14 14 0 0 1 12 21a14 14 0 0 1-3.4-9A14 14 0 0 1 12 3z" />
				</>
			);
		case 'learning':
			return (
				<>
					<path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z" />
					<path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z" />
				</>
			);
		case 'engineering':
			return (
				<>
					<path d="m14 4 6 6-6 6" />
					<path d="m10 20-6-6 6-6" />
				</>
			);
	}
}

export default function BeyondResumeGraph() {
	const prefersReducedMotion = useReducedMotion();
	const [activeNodeId, setActiveNodeId] = useState('curiosity');
	const [hoveredNodeId, setHoveredNodeId] = useState(null);

	const currentNodeId = hoveredNodeId ?? activeNodeId;
	const currentNode = nodeMap[currentNodeId];
	const related = useMemo(() => relatedNodeIds(currentNodeId), [currentNodeId]);
	const dimUnrelated = currentNodeId !== 'curiosity';

	const panelX = clamp(currentNode.x + (currentNode.x < 52 ? 9 : -43), 3, 62);
	const panelY = clamp(currentNode.y - 8, 6, 70);

	return (
		<section className="person-behind pbg" aria-labelledby="person-behind-title">
			<header className="pbg-header">
				<p className="pbg-eyebrow">Beyond the Work</p>
				<h2 id="person-behind-title" className="pbg-title">
					The Person Behind the Systems
				</h2>
				<p className="pbg-intro">
					"Exploring Deep Systems" is more than a theme for this website—it reflects how I
					approach learning itself. Whether beneath the surface of the ocean, within the
					history of civilizations, through philosophical ideas, or inside mathematical
					models, I'm motivated by the same curiosity: understanding how complex systems
					behave and how deeper understanding leads to better decisions.
				</p>
			</header>

			<div className="pbg-scene-wrap">
				<div className="pbg-scene" aria-label="Interactive constellation of ideas">
					<svg className="pbg-edges" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
						{edges.map((edge, index) => {
							const source = nodeMap[edge.source];
							const target = nodeMap[edge.target];
							const isActiveEdge = edge.source === currentNodeId || edge.target === currentNodeId;
							const isDim = dimUnrelated && !isActiveEdge;
							return (
								<line
									key={edge.id}
									x1={source.x}
									y1={source.y}
									x2={target.x}
									y2={target.y}
									className={`pbg-edge pbg-edge--${edge.strength} ${isActiveEdge ? 'is-active' : ''} ${isDim ? 'is-dim' : ''}`}
									style={{ animationDelay: `${index * 220}ms` }}
								/>
							);
						})}
					</svg>

					{nodes.map((node, index) => {
						const isCurrent = node.id === currentNodeId;
						const isActive = node.id === activeNodeId;
						const isDim = dimUnrelated && !related.has(node.id);
						return (
							<button
								key={node.id}
								type="button"
								className={`pbg-node pbg-node--${node.tier} ${node.core ? 'is-core' : ''} ${isCurrent ? 'is-current' : ''} ${isActive ? 'is-selected' : ''} ${isDim ? 'is-dim' : ''}`}
								style={{ left: `${node.x}%`, top: `${node.y}%` }}
								onMouseEnter={() => setHoveredNodeId(node.id)}
								onMouseLeave={() => setHoveredNodeId(null)}
								onFocus={() => setHoveredNodeId(node.id)}
								onBlur={() => setHoveredNodeId(null)}
								onClick={() => setActiveNodeId((prev) => (prev === node.id ? 'curiosity' : node.id))}
								onKeyDown={(event) => {
									if (event.key === 'Enter' || event.key === ' ') {
										event.preventDefault();
										setActiveNodeId((prev) => (prev === node.id ? 'curiosity' : node.id));
									}
								}}
								aria-label={`${node.title}. ${node.short}`}
								aria-pressed={isActive}
							>
								<motion.span
									className="pbg-node-inner"
									aria-hidden="true"
									animate={
										prefersReducedMotion
											? undefined
											: {
												x: node.fx,
												y: node.fy,
											}
									}
									transition={
										prefersReducedMotion
											? undefined
											: {
												type: 'spring',
												stiffness: 24,
												damping: 18,
												mass: 1.1,
												repeat: Infinity,
												repeatType: 'mirror',
												delay: index * 0.16,
											}
									}
								>
									<span className="pbg-node-ring" aria-hidden="true" />
									<span className="pbg-node-icon" aria-hidden="true">
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
											{iconFor(node.id)}
										</svg>
									</span>
								</motion.span>
								<span className="pbg-node-label">{node.title}</span>
							</button>
						);
					})}

					<aside
						className="pbg-panel is-desktop"
						style={{ left: `${panelX}%`, top: `${panelY}%` }}
						data-panel-key={currentNodeId}
					>
						<div className="pbg-panel-head">
							<span className="pbg-panel-icon" aria-hidden="true">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
									{iconFor(currentNode.id)}
								</svg>
							</span>
							<h3>{currentNode.title}</h3>
						</div>
						<p className="pbg-panel-lead">{currentNode.short}</p>
						<p className="pbg-panel-support">{currentNode.influence}</p>
					</aside>
				</div>

				<aside className="pbg-panel is-mobile" data-panel-key={currentNodeId}>
					<div className="pbg-panel-head">
						<span className="pbg-panel-icon" aria-hidden="true">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
								{iconFor(currentNode.id)}
							</svg>
						</span>
						<h3>{currentNode.title}</h3>
					</div>
					<p className="pbg-panel-lead">{currentNode.short}</p>
					<p className="pbg-panel-support">{currentNode.influence}</p>
				</aside>
			</div>

			<figure className="pbg-quote">
				<blockquote>
					<p className="pbg-quote-text">"Different domains.<br />The same curiosity."</p>
				</blockquote>
				<figcaption className="pbg-quote-caption">Exploring Deep Systems.</figcaption>
			</figure>
		</section>
	);
}


