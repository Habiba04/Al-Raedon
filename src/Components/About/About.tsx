import React from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './About.css';

const About: React.FC = () => {
  const { t } = useTranslation();
  const ref = useScrollAnimation();

  return (
    <section className="about" id="about" ref={ref}>
      <div className="container about__inner">
        {/* Left: text */}
        <div className="about__text">
          <span className="section-label fade-up">{t('about.label')}</span>
          <h2 className="section-title fade-up delay-1">
            {t('about.title').split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </h2>
          <div className="gold-line fade-up delay-2" />
          <p className="section-desc fade-up delay-2">{t('about.p1')}</p>
          <p className="section-desc about__p fade-up delay-3">{t('about.p2')}</p>
          <p className="section-desc about__p fade-up delay-4">{t('about.p3')}</p>
        </div>

        {/* Right: stat cards */}
        <div className="about__stats">
          {[
            { num: t('about.stat1'), sub: t('about.stat1sub'), delay: 'delay-2' },
            { num: t('about.stat2'), sub: t('about.stat2sub'), delay: 'delay-3' },
            { num: t('about.stat3'), sub: t('about.stat3sub'), delay: 'delay-4' },
          ].map((s) => (
            <div className={`about__stat-card fade-up ${s.delay}`} key={s.num}>
              <span className="about__stat-num">{s.num}</span>
              <span className="about__stat-sub">{s.sub}</span>
            </div>
          ))}

          {/* Decorative image block */}
          <div className="about__img-block fade-up delay-5">
            <div className="about__img-overlay" />
            <div className="about__img-text">
              <span>{t('about.about_trust1')}</span>
              <span>{t('about.about_trust2')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background accent */}
      <div className="about__bg-accent" />
    </section>
  );
};

export default About;