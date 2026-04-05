import React from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './Vision.css';

const VisionMission: React.FC = () => {
  const { t } = useTranslation();
  const ref = useScrollAnimation();
  const values = t('vision.values', { returnObjects: true }) as string[];

  return (
    <section className="vision" id="vision" ref={ref}>
      <div className="container vision__inner">

        {/* Vision */}
        <div className="vision__block fade-up">
          <div className="vision__block-icon">
            <svg viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4"/>
              <circle cx="24" cy="24" r="3" fill="currentColor"/>
            </svg>
          </div>
          <span className="vision__block-label">{t('vision.vision_title')}</span>
          <p className="vision__block-text">{t('vision.vision_text')}</p>
        </div>

        {/* Mission */}
        <div className="vision__block fade-up delay-2">
          <div className="vision__block-icon">
            <svg viewBox="0 0 48 48" fill="none">
              <path d="M8 40L16 28L24 32L32 20L40 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M34 12L40 12L40 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M40 12L30 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="vision__block-label">{t('vision.mission_title')}</span>
          <p className="vision__block-text">{t('vision.mission_text')}</p>
        </div>

        {/* Values */}
        <div className="vision__values fade-up delay-3">
          <span className="vision__block-label">{t('vision.values_title')}</span>
          <div className="vision__values-grid">
            {values.map((v, i) => (
              <div className="vision__value-item" key={i}>
                <span className="vision__value-num">0{i + 1}</span>
                <span className="vision__value-text">{v}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom diagonal */}
      <div className="vision__diagonal-bottom" />
    </section>
  );
};

export default VisionMission;