import { useState } from 'react';
import Icon from './Icon';
import '../styles/WorkExperience.css';

export default function WorkExperience() {
	const [workModalOpen, setWorkModalOpen] = useState(false);

	return (
		<section id="work" className="detail-section hero-section">
			<div className="section-shell">
				<div className="split">
					<div className="split-body">

						<h1 className="section-heading hero-heading">Work <span className="gradient-text">Experience</span></h1>
						<p className="section-intro">
							Gain valuable industry experience, working on real-world projects
							and developing practical skills in a professional environment.
						</p>

						<div className="info-card work-card">
							<div className="card-icon"><Icon name="work" /></div>
							<div className="card-content">
								<div className="card-title-row">
									<div>
										<div className="card-title">Software Engineering Intern</div>
										<div className="card-sub">HotCat Technologies (Pvt) Ltd</div>
									</div>
									<span className="badge">06 Months</span>
								</div>

								<div className="card-meta">
									<span><Icon name="calendar" /> Feb 2026 – Aug 2026</span>
									<span><Icon name="home" /> Hybrid</span>
									<span><Icon name="location" /> Wadduwa, Sri Lanka</span>
								</div>

								<button className="btn-outline" onClick={() => setWorkModalOpen(true)}>
									<span>View More</span><Icon name="arrow" />
								</button>
							</div>
						</div>
					</div>

					<div className="split-media portrait-media">
						<div className="media-glow" />
						<img src="/assets/chehan_profile5.jpeg" alt="Chehan Lasindu" />
						<div className="floating-label label-top">Software Engineering</div>
						<div className="floating-label label-bottom">React · APIs · UI</div>
					</div>
				</div>
			</div>

			{workModalOpen && (
				<div className="modal-overlay" onClick={() => setWorkModalOpen(false)}>
					<div className="modal-box" onClick={(event) => event.stopPropagation()}>
						<button className="modal-close" onClick={() => setWorkModalOpen(false)} aria-label="Close">
							<Icon name="close" />
						</button>
						<div className="eyebrow-tag">Work Experience</div>
						<h3>Software Engineering Intern</h3>
						<div className="card-sub">HotCat Technologies (Pvt) Ltd</div>
						<div className="card-meta">
							<span><Icon name="calendar" /> Feb 2026 – Aug 2026</span>
							<span><Icon name="location" /> Wadduwa, Sri Lanka</span>
						</div>
						<ul className="modal-list">
							<li>Built responsive frontend interfaces and reusable components with React.js.</li>
							<li>Integrated REST APIs for authentication, dashboards, inventory and reporting modules.</li>
							<li>Collaborated in a hybrid team environment following real-world development workflows.</li>
						</ul>
						<div className="pill-row">
							{['React.js', 'REST APIs', 'Dashboards', 'Authentication', 'Inventory', 'Reporting'].map((tag) => (
								<span className="pill" key={tag}>{tag}</span>
							))}
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
