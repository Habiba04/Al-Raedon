import React from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './Services.css';

const icons = [
  // Warehouse
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 16L20 6L36 16V36H4V16Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <rect x="14" y="24" width="12" height="12" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M4 16H36" stroke="currentColor" strokeWidth="1.5"/>
  </svg>,
  // Transport
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="14" width="26" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M28 20H36L38 30H28V20Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <circle cx="10" cy="32" r="4" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="30" cy="32" r="4" stroke="currentColor" strokeWidth="1.5"/>
  </svg>,
  // Consulting
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M14 36H26M20 28V36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 14H28M12 20H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
  // Trading
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 34L14 24L20 28L28 16L34 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="14" cy="24" r="2.5" fill="currentColor"/>
    <circle cx="20" cy="28" r="2.5" fill="currentColor"/>
    <circle cx="28" cy="16" r="2.5" fill="currentColor"/>
    <path d="M6 6H10M6 6V10M34 34H30M34 34V30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,
  // 5. Agricultural Production — wheat stalk + leaf + sun rays
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main stalk */}
    <path d="M20 34V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    {/* Left grain pods */}
    <path d="M20 28C20 28 14 26 12 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 22C20 22 14 20 13 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Right grain pods */}
    <path d="M20 28C20 28 26 26 28 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 22C20 22 26 20 27 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Top grain head */}
    <ellipse cx="20" cy="8" rx="3" ry="4" stroke="currentColor" strokeWidth="1.5"/>
    {/* Ground line */}
    <path d="M10 36H30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    {/* Small leaf on stalk */}
    <path d="M20 18C20 18 16 16 15 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>,
  // 6. Import & Export — globe with bidirectional arrows
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Globe circle */}
    <circle cx="18" cy="20" r="13" stroke="currentColor" strokeWidth="1.5"/>
    {/* Latitude lines */}
    <path d="M5 20H31" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M7 14H29" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M7 26H29" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    {/* Longitude curve */}
    <path d="M18 7C18 7 13 13 13 20C13 27 18 33 18 33" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M18 7C18 7 23 13 23 20C23 27 18 33 18 33" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    {/* Export arrow — out top-right */}
    <path d="M28 8L34 4M34 4H30M34 4V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Import arrow — in bottom-right */}
    <path d="M30 34L34 36M34 36H30M34 36V32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
];

const Services: React.FC = () => {
  const { t } = useTranslation();
  const ref = useScrollAnimation();

  const services = [
    { titleKey: 'services.s1_title', itemsKey: 'services.s1_items' },
    { titleKey: 'services.s2_title', itemsKey: 'services.s2_items' },
    { titleKey: 'services.s3_title', itemsKey: 'services.s3_items' },
    { titleKey: 'services.s4_title', itemsKey: 'services.s4_items' },
    { titleKey: 'services.s5_title', itemsKey: 'services.s5_items' },
    { titleKey: 'services.s6_title', itemsKey: 'services.s6_items' },
  ];

  return (
    <section className="services" id="services" ref={ref}>
      <div className="container">
        <div className="services__header">
          <span className="section-label light fade-up">{t('services.label')}</span>
          <h2 className="section-title light fade-up delay-1">{t('services.title')}</h2>
          <div className="gold-line fade-up delay-2" />
          <p className="section-desc light fade-up delay-2">{t('services.subtitle')}</p>
        </div>

        <div className="services__grid">
          {services.map((svc, i) => {
            const items = t(svc.itemsKey, { returnObjects: true }) as string[];
            return (
              <div
                key={i}
                className={`services__card fade-up delay-${i + 1}`}
              >
                <div className="services__card-icon">{icons[i]}</div>
                <h3 className="services__card-title">{t(svc.titleKey)}</h3>
                <ul className="services__card-list">
                  {items.map((item, j) => (
                    <li key={j} className="services__card-item">
                      <span className="services__bullet" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="services__card-glow" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Diagonal top edge */}
      <div className="services__diagonal-top" />
    </section>
  );
};

export default Services;