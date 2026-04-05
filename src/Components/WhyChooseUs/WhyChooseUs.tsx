import React from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './WhyChooseUs.css';

const whyIcons = [
  <svg viewBox="0 0 32 32" fill="none"><path d="M4 12L16 4L28 12V28H4V12Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><rect x="11" y="18" width="10" height="10" stroke="currentColor" strokeWidth="1.4"/></svg>,
  <svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="12" r="6" stroke="currentColor" strokeWidth="1.4"/><path d="M4 28C4 22.477 9.373 18 16 18C22.627 18 28 22.477 28 28" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  <svg viewBox="0 0 32 32" fill="none"><path d="M6 26L26 6M6 6L26 26" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.3"/><rect x="10" y="10" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.4"/></svg>,
  <svg viewBox="0 0 32 32" fill="none"><path d="M16 4L20 12H28L22 18L24 28L16 22L8 28L10 18L4 12H12L16 4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>,
  <svg viewBox="0 0 32 32" fill="none"><rect x="4" y="4" width="24" height="18" rx="2" stroke="currentColor" strokeWidth="1.4"/><circle cx="16" cy="13" r="4" stroke="currentColor" strokeWidth="1.4"/><path d="M8 28H24" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  <svg viewBox="0 0 32 32" fill="none"><path d="M16 4C16 4 8 10 8 18C8 22.418 11.582 26 16 26C20.418 26 24 22.418 24 18C24 10 16 4 16 4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M16 18V12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
];

const WhyUs: React.FC = () => {
  const { t } = useTranslation();
  const ref = useScrollAnimation();
  const items = t('why.items', { returnObjects: true }) as { title: string; desc: string }[];

  return (
    <section className="why" id="why" ref={ref}>
      <div className="container">
        <div className="why__header">
          <span className="section-label fade-up">{t('why.label')}</span>
          <h2 className="section-title fade-up delay-1">
            {t('why.title').split('\n').map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}
          </h2>
          <div className="gold-line fade-up delay-2" />
        </div>

        <div className="why__grid">
          {items.map((item, i) => (
            <div className={`why__card fade-up delay-${(i % 3) + 1}`} key={i}>
              <div className="why__card-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="why__card-icon">{whyIcons[i]}</div>
              <h3 className="why__card-title">{item.title}</h3>
              <p className="why__card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;