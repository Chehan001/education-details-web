import { useState } from 'react';
import EducationalQualifications from './components/EducationalQualifications';
import NavBar from './components/NavBar';
import ResearchExperience from './components/ResearchExperience';
import TechnicalSkills from './components/TechnicalSkills';
import WorkExperience from './components/WorkExperience';
import './App.css';
import './styles/ResumeLayout.css';

function App() {
  const [softGlowOff, setSoftGlowOff] = useState(false);

  return (
    <div className={`resume-details-container ${softGlowOff ? 'soft-glow-off' : ''}`}>
      <div className="background-orb orb-one" />
      <div className="background-orb orb-two" />
      <div className="background-grid" />
      <NavBar onToggleGlow={() => setSoftGlowOff((value) => !value)} />
      <main>
        <WorkExperience />
        <EducationalQualifications />
        <ResearchExperience />
        <TechnicalSkills />
      </main>
    </div>
  );
}

export default App;
