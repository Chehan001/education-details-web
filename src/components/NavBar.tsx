import { useState } from 'react';
import Icon from './Icon';
import '../styles/NavBar.css';

const navItems = [
    { id: 'work', label: 'Work Experience' },
    { id: 'education', label: 'Educational Qualifications' },
    { id: 'research', label: 'Research Experience' },
    { id: 'skills', label: 'Technical Skills' },
];

export type ResumeSection = 'work' | 'education' | 'research' | 'skills';

type NavBarProps = {
    selectedSection: ResumeSection;
    onSelectSection: (section: ResumeSection) => void;
    onToggleGlow: () => void;
    onSelectWork: () => void;
};

export default function NavBar({ selectedSection, onSelectSection, onToggleGlow: _onToggleGlow, onSelectWork }: NavBarProps) {
    const [menuOpen, setMenuOpen] = useState(false);

    const selectSection = (id: ResumeSection) => {
        setMenuOpen(false);
        onSelectSection(id);
        if (id === 'work') onSelectWork();
    };

    return (
        <nav className="detail-nav">
            <div className="detail-nav-inner">

                {/* Navigation */}
                <div className={`detail-links ${menuOpen ? 'open' : ''}`}>
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            className={selectedSection === item.id ? 'active' : ''}
                            aria-current={selectedSection === item.id ? 'page' : undefined}
                            onClick={() => selectSection(item.id as ResumeSection)}
                        >
                        
                            <span className="nav-label">
                                {item.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Mobile menu */}
                <button
                    type="button"
                    className={`hamburger ${menuOpen ? 'open' : ''}`}
                    onClick={() => setMenuOpen((value) => !value)}
                    aria-label="Toggle navigation"
                    aria-expanded={menuOpen}
                >
                    <Icon name={menuOpen ? 'close' : 'menu'} />
                </button>

            </div>
        </nav>
    );
}
