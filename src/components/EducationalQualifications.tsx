import { useState } from 'react';
import Icon from './Icon';
import '../styles/EducationalQualifications.css';

type YearKey = 'year1' | 'year2' | 'year3' | 'year4';

const yearData: Record<YearKey, { label: string; gpa: string; semester1: [string, string][]; semester2: [string, string][] }> = {
	year1: {
		label: 'Year 1',
		gpa: '2.453',
		semester1: [
			['Mechanics and Properties of Matter', 'D'], ['Intro to Electricity and Magnetism', 'C+'],
			['Physics Laboratory 1-I', 'A'], ['General Chemistry', 'C'],
			['Fundamentals of Organic Chemistry', 'D'], ['Inorganic Chemistry Laboratory 1-I', 'C'],
			['Structured Programming', 'B'], ['Computer Hardware and Software', 'A'],
			['Computer Laboratory 1-I', 'B-'], ['Calculus and Differential Equations', 'C+'], ['General English I', 'C+'],
		],
		semester2: [
			['Physics of Heat and Waves', 'C-'], ['Semi-Conductor Physics', 'C'], ['AC Theory & Circuits', 'C-'],
			['Physics Laboratory 1-II', 'B-'], ['Physical Chemistry', 'A-'], ['Fundamentals of Analytical Chemistry', 'D+'],
			['Organic Chemistry Laboratory 1-II', 'B-'], ['Object Oriented Programming', 'A-'],
			['Fundamentals of Statistics', 'B+'], ['Database Management Systems', 'B-'],
			['Computer Laboratory 1-II', 'A'], ['General English II', 'C-'],
		],
	},
	year2: {
		label: 'Year 2',
		gpa: '2.808',
		semester1: [
			['Electronics', 'C+'], ['Geometrical and Physical Optics', 'D'], ['Physics Laboratory 2-I', 'B'],
			['Organic Chemistry', 'D'], ['Industrial Chemistry and Technology', 'B'],
			['Organic Chemistry Laboratory 2-I', 'B'], ['Data Structures & Algorithms', 'B-'],
			['Computer Architecture & Assembly Lang.', 'A'], ['Statistics for Experimental Analysis', 'A'],
			['Computer Laboratory 2-I', 'A-'], ['Academic English I', 'D+'],
		],
		semester2: [
			['Physics of EM Radiation & Laser Intro', 'B-'], ['Quantum Physics, Atomic & Nuclear Physics', 'D'],
			['Physics Laboratory 2-II', 'A-'], ['Chemistry of Elements', 'D'], ['Physical Chemistry', 'A-'],
			['Inorganic Chemistry Laboratory 2-II', 'B-'], ['Software Engineering', 'A'],
			['Statistical Methodology', 'A-'], ['Computer Laboratory 2-II', 'A'], ['Operating System', 'A'],
			['Leadership & Communication', 'B'], ['Management Information System', 'C+'], ['Academic English II', 'B'],
		],
	},
	year3: {
		label: 'Year 3',
		gpa: '2.950',
		semester1: [
			['Multimedia & Hypermedia Systems Dev.', 'A'], ['Artificial Intelligence & Expert System', 'C'],
			['Software Project Management', 'A-'], ['Software Quality Assurance', 'C-'],
			['Object Oriented Analysis and Design', 'B'], ['Advanced Database Management System', 'B+'],
			['Computer Laboratory 3-1', 'B+'], ['Agile Software Development', 'B+'],
		],
		semester2: [
			['Statistics in Quality Control', 'A'], ['Artificial Neural Network', 'B+'], ['Digital Image Processing', 'B'],
			['Data Mining Application', 'B-'], ['Data Communication and Computer Network', 'C'],
			['Computer Graphics & Visualization', 'C+'], ['Mini Project', 'B+'], ['Computer Laboratory 3-2', 'C'],
		],
	},
	year4: {
		label: 'Year 4',
		gpa: '3.233*',
		semester1: [
			['Web Services', 'B'], ['Computer System Security', 'B-'], ['Advanced Computer Networks', 'A'],
			['Internet of Things (IoT)', 'A'], ['Natural Language Processing', 'B'], ['Mobile Computing', 'B-'],
			['Cloud Computing', 'X'], ['Research Methodology', 'X'],
		],
		semester2: [],
	},
};

const ordinaryLevelResults = [
	['Buddhism', 'A'], ['Sinhala Language & Literature', 'A'], ['Science', 'A'],
	['Mathematics', 'A'], ['History', 'A'], ['ICT', 'A'], ['Art', 'A'], ['Tamil', 'B'], ['English', 'C'],
];

const gpaTrend = [
	['2.45', 'Year 1', '61%'], ['2.81', 'Year 2', '70%'],
	['2.95', 'Year 3', '74%'], ['3.23', 'Year 4*', '81%'],
];

export default function EducationalQualifications() {
	const [universityRecordsOpen, setUniversityRecordsOpen] = useState(false);
	const [openYears, setOpenYears] = useState<YearKey[]>([]);

	const toggleYear = (yearKey: YearKey) => {
		setOpenYears((currentYears) => currentYears.includes(yearKey)
			? currentYears.filter((currentYear) => currentYear !== yearKey)
			: [...currentYears, yearKey]);
	};

	return (
		<section id="education" className="detail-section alt">
			<div className="section-shell">
				<div className="split image-first">
					<div className="split-media education-media">
						<img src="/assets/chehan_profile4.png" alt="Academic and laboratory work" />
					</div>

					<div className="split-body">
		
						<h2 className="section-heading">Educational <span className="gradient-text">Qualifications</span></h2>
						<p className="section-intro">Academic journey spanning university, advanced level and ordinary level examinations.</p>

						<div className="info-card">
							<div className="card-icon"><Icon name="education" /></div>
							<div className="card-content">
								<div className="card-title">University Qualification</div>
								<div className="card-sub">BSc (Hons) in Computer Science and Technology</div>

								<div className="pill-row">
									<span className="pill"><Icon name="home" /> Sabaragamuwa University of Sri Lanka</span>
									<span className="pill"><Icon name="calendar" /> 2022 – 2026</span>
									<span className="pill">Major field: Computer Science</span>
								</div>

								<button className="btn-outline" onClick={() => setUniversityRecordsOpen((value) => !value)} aria-expanded={universityRecordsOpen} aria-controls="university-records">
									<span>{universityRecordsOpen ? 'Hide University Academic Record' : 'View University Academic Record'}</span>
									<Icon name={universityRecordsOpen ? 'chevron' : 'arrow'} />
								</button>

								{universityRecordsOpen && (
									<div className="reveal-panel" id="university-records">
										<div className="sem-title">University Academic Record</div>
										<div className="gpa-trend">
											{gpaTrend.map(([gpa, year, height]) => (
												<div className="gpa-bar-col" key={year}>
													<div className="gpa-bar" style={{ height }} />
													<strong>{gpa}</strong>
													<span>{year}</span>
												</div>
											))}
										</div>
										<div className="exam-note">*Year 4 in progress — GPA reflects completed modules only</div>

										<div className="year-list">
											{(Object.keys(yearData) as YearKey[]).map((key) => {
												const year = yearData[key];
												const isOpen = openYears.includes(key);
												return (
													<div className={`year-block ${isOpen ? 'open' : ''}`} key={key}>
														<button className="year-toggle" onClick={() => toggleYear(key)} aria-expanded={isOpen}>
															<span>{year.label}</span>
															<span className="gpa-chip">GPA {year.gpa}</span>
															<Icon name="chevron" />
														</button>
														{isOpen && (
															<div className="year-body">
																<div className="sem-title">Semester I</div>
																<div className="subject-grid">
																	{year.semester1.map(([subject, grade]) => (
																		<div className="subject-row" key={subject}><span>{subject}</span><span className="grade">{grade}</span></div>
																	))}
																</div>
																<div className="sem-title">Semester II</div>
																{year.semester2.length ? (
																	<div className="subject-grid">
																		{year.semester2.map(([subject, grade]) => (
																			<div className="subject-row" key={subject}><span>{subject}</span><span className="grade">{grade}</span></div>
																		))}
																	</div>
																) : (
																	<div className="exam-note">Results pending — semester in progress.</div>
																)}
															</div>
														)}
													</div>
												);
											})}
										</div>
									</div>
								)}
							</div>
						</div>

						<div className="qualification-records">
							<div className="info-card">
							
								<div className="card-content">
									<div className="card-title-row">
										<div className="card-title">G.C.E. Advanced Level Examination</div>
										<span className="badge">2020</span>
									</div>
									<div className="exam-note">Physical Science Stream · Z-score 0.7369</div>
									<div className="subject-grid">
										<div className="subject-row"><span>Information &amp; Communication Technology</span><span className="grade">B</span></div>
										<div className="subject-row"><span>Combined Mathematics</span><span className="grade">C</span></div>
										<div className="subject-row"><span>Physics</span><span className="grade">S</span></div>
									</div>
								</div>
							</div>

							<div className="info-card">
								
								<div className="card-content">
									<div className="card-title-row">
										<div className="card-title">G.C.E. Ordinary Level Examination</div>
										<span className="badge">2016</span>
									</div>
									<div className="subject-grid">
										{ordinaryLevelResults.map(([subject, grade]) => (
											<div className="subject-row" key={subject}><span>{subject}</span><span className="grade">{grade}</span></div>
										))}
									</div>
								</div>
							</div>
						</div>

					
					</div>
				</div>
			</div>
		</section>
	);
}
