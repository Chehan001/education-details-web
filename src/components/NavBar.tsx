import { useState } from 'react';
import Icon from './Icon';
import '../styles/NavBar.css';

const navItems = [
    { id: 'work', label: 'Work Experience' },
    { id: 'education', label: 'Educational Qualifications' },
    { id: 'research', label: 'Research Experience' },
    { id: 'skills', label: 'Technical Skills' },
];

type NavBarProps = {
    onToggleGlow: () => void;
};

export default function NavBar({ onToggleGlow }: NavBarProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('work');

    const scrollToSection = (id: string) => {
        setActiveSection(id);
        setMenuOpen(false);

        document
            .getElementById(id)
            ?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
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
                            className={activeSection === item.id ? 'active' : ''}
                            onClick={() => scrollToSection(item.id)}
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
