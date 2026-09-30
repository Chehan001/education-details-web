import Icon from './Icon';
import '../styles/ResearchExperience.css';

export default function ResearchExperience() {
	return (
		<section id="research" className="detail-section">
			<div className="section-shell">
				<div className="split">
					<div className="split-body">
							<h2 className="section-heading">Research <span className="gradient-text">Experience</span></h2>
						<p className="section-intro">
							Research work combining smartphone imaging, controlled experimentation,
							image processing and machine learning.
						</p>

						<div className="info-card research-card">
							<div className="card-icon"><Icon name="research" /></div>
							<div className="card-content">
								<div className="card-title">Development of a Smartphone-Based Intelligent Water Quality Prediction System</div>
								<div className="card-sub">Using Colorimetric Imaging and Machine Learning in a Controlled Light Environment</div>
								<div className="card-meta"><span><Icon name="home" /> Sabaragamuwa University of Sri Lanka</span></div>

								<div className="pill-row">
									<span className="pill">Supervisor: Mr. U.B.P. Shamika</span>
									<span className="pill">Co-Supervisor: Dr. M.G.A.N. PeC.</span>
								</div>

								<p className="card-desc">
									An end-to-end pipeline that predicts water quality parameters from smartphone images
									captured in a controlled, light-isolated environment — combining image processing,
									colorimetric calibration, and a machine learning decision model.
								</p>

								<div className="sem-title">Proposed Methodology</div>
								<ol className="method-list">
									<li>Sample collection — water samples gathered from multiple sources</li>
									<li>Image acquisition — captured in a light-cut black box</li>
									<li>ROI selection, noise filtering, and color normalization</li>
									<li>Feature extraction — color, intensity, and texture features</li>
									<li>Calibration — mapping features to parameter values</li>
									<li>Feature fusion — combined into a normalized feature vector</li>
									<li>Decision model — rule-based / machine learning classification</li>
									<li>Output — turbidity, contaminants, and overall quality score</li>
								</ol>
							</div>
						</div>
					</div>

					<div className="research-images">
						<img src="/assets/chehan_profile2.jpeg" alt="Presenting research proposal" className="research-wide" />
						<img src="/assets/chehan_profile3.png" alt="Explaining methodology" />
						<img src="/assets/chehan_profile4.png" alt="Lab testing" />
					</div>
				</div>
			</div>
		</section>
	);
}
