import '../styles/TechnicalSkills.css';

const skillData = [
	['JavaScript', 95],
	['TypeScript', 95],
	['React.js', 95],
	['Node.js', 90],
	['Python', 85],
	['Express.js', 85],
	['MongoDB', 85],
	['Java', 80],
	['MySQL', 80],
	['DevOps & Cloud (Docker, CI/CD, AWS, Azure)', 90],
] as const;

const skillTags = ['React.js', 'Node.js', 'Python', 'Java', 'MySQL', 'MongoDB', 'Docker', 'AWS', 'Azure', 'Git'];

export default function TechnicalSkills() {
	return (
		<section id="skills" className="detail-section alt">
			<div className="section-shell">
				<div className="split image-first">
					<div className="split-media skills-media">
						<img src="/assets/chehan_profile1.jpg" alt="Presenting tools and technologies" />
						<div className="skills-overlay">
							<span>TECH STACK</span>
							<strong>Build · Learn · Create</strong>
						</div>
					</div>

					<div className="split-body">
						
						<h2 className="section-heading">Technical <span className="gradient-text">Skills</span></h2>
						<p className="section-intro">
							A practical technology stack covering frontend development, backend services,
							databases, programming and cloud-oriented development.
						</p>

						<div className="info-card">
							<div className="skills-list">
								{skillData.map(([name, level]) => (
									<div className="skill-row" key={name}>
										<div className="skill-row-top"><span>{name}</span><span>{level}%</span></div>
										<div className="skill-track"><div className="skill-fill" style={{ width: `${level}%` }} /></div>
									</div>
								))}
							</div>
						</div>

						<div className="skill-tags">
							{skillTags.map((tag) => <span key={tag}>{tag}</span>)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
