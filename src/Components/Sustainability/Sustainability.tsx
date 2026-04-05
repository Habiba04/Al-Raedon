import React from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './Sustainability.css';

const Sustainability: React.FC = () => {
  const { t } = useTranslation();
  const ref = useScrollAnimation();
  const pillars = t('sustainability.pillars', { returnObjects: true }) as { title: string; desc: string }[];

  return (
    <section className="sustain" id="sustainability" ref={ref}>
      <div className="container sustain__inner">

        {/* Left: text */}
        <div className="sustain__text">
          <span className="section-label fade-up">{t('sustainability.label')}</span>
          <h2 className="section-title light fade-up delay-1">
            {t('sustainability.title').split('\n').map((l, i) => (
              <span key={i}>{l}{i < 2 && <br />}</span>
            ))}
          </h2>
          <div className="gold-line fade-up delay-2" />
          <p className="section-desc light fade-up delay-2">{t('sustainability.text')}</p>
        </div>

        {/* Right: pillar cards */}
        <div className="sustain__pillars">
          {pillars.map((p, i) => (
            <div className={`sustain__pillar fade-up delay-${i + 2}`} key={i}>
              <div className="sustain__pillar-dot" />
              <div>
                <h4 className="sustain__pillar-title">{p.title}</h4>
                <p className="sustain__pillar-desc">{p.desc}</p>
              </div>
            </div>
          ))}

          {/* Decorative ring */}
          <div className="sustain__ring">
            <svg viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="90" stroke="rgba(201,168,76,0.15)" strokeWidth="1" strokeDasharray="6 6"/>
              <circle cx="100" cy="100" r="60" stroke="rgba(201,168,76,0.1)" strokeWidth="1"/>
              <circle cx="100" cy="100" r="30" stroke="rgba(201,168,76,0.2)" strokeWidth="1.5"/>
              <path d="M100 40C100 40 130 70 130 100C130 130 100 160 100 160C100 160 70 130 70 100C70 70 100 40 100 40Z"
                stroke="rgba(201,168,76,0.25)" strokeWidth="1" fill="none"/>
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Sustainability;