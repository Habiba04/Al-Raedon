import React, { useState, useEffect } from 'react';
import './NavDots.css';

const NavDots: React.FC = () => {
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setAtBottom(scrolled > total * 0.5);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const goBottom = () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });

  return (
    <div className="nav-dots">
      <button
        className={`nav-dots__btn ${!atBottom ? 'nav-dots__btn--active' : ''}`}
        onClick={goTop}
        aria-label="Scroll to top"
        title="Back to top"
      >
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 13L10 7L15 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div className="nav-dots__track">
        <div className={`nav-dots__indicator ${atBottom ? 'nav-dots__indicator--bottom' : ''}`} />
      </div>

      <button
        className={`nav-dots__btn ${atBottom ? 'nav-dots__btn--active' : ''}`}
        onClick={goBottom}
        aria-label="Scroll to bottom"
        title="Go to bottom"
      >
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 7L10 13L15 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};

export default NavDots;