import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Navbar.css';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleLang = () => {
    const next = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(next);
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
    document.body.dir = next === 'ar' ? 'rtl' : 'ltr';
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const navLinks = [
    { key: 'nav.about',          id: 'about'          },
    { key: 'nav.services',       id: 'services'       },
    { key: 'nav.vision',         id: 'vision'         },
    { key: 'nav.why',            id: 'why'            },
    { key: 'nav.sustainability', id: 'sustainability' },
    { key: 'nav.contact',        id: 'contact'        },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${isRTL ? 'rtl' : ''}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <button className="navbar__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="../../../public/assets/Logo/logo-h.png" alt="Al Raedon" className="navbar__logo-img" />
        </button>

        {/* Desktop Links */}
        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button onClick={() => scrollTo(link.id)} className="navbar__link">
                {t(link.key)}
              </button>
            </li>
          ))}
        </ul>

        {/* Lang Toggle + Mobile Hamburger */}
        <div className="navbar__actions">
          <button className="navbar__lang" onClick={toggleLang}>
            {i18n.language === 'en' ? 'عربي' : 'EN'}
          </button>
          <button
            className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
        {navLinks.map((link) => (
          <button key={link.id} onClick={() => scrollTo(link.id)} className="navbar__mobile-link">
            {t(link.key)}
          </button>
        ))}
        <button className="navbar__lang navbar__lang--mobile" onClick={toggleLang}>
          {i18n.language === 'en' ? 'عربي' : 'EN'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;