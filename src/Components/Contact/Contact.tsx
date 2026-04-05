import React from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './Contact.css';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const ref = useScrollAnimation();

  const contactItems = [
    {
      labelKey: 'contact.address_label',
      value: t('contact.address'),
      href: 'https://maps.google.com/?q=Wadi+El+Nile+Street+Mohandessin+Giza+Egypt',
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 2C8.134 2 5 5.134 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.134 15.866 2 12 2Z" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ),
    },
    {
      labelKey: 'contact.phone_label',
      value: '+20 103 529 0808\n+20 103 528 7040',
      href: 'tel:+201035290808',
      isPhone: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ),
    },
    {
      labelKey: 'contact.email_label',
      value: 'info@alraedon-trading.com',
      href: 'mailto:info@alraedon-trading.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M3 7L12 13L21 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      labelKey: 'contact.web_label',
      value: 'www.alraedon-trading.com',
      href: 'https://www.alraedon-trading.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 3C12 3 9 7 9 12C9 17 12 21 12 21" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 3C12 3 15 7 15 12C15 17 12 21 12 21" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M3 12H21" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ),
    },
  ];

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="container contact__inner">

        {/* Header */}
        <div className="contact__header">
          <span className="section-label fade-up">{t('contact.label')}</span>
          <h2 className="section-title fade-up delay-1">
            {t('contact.title').split('\n').map((l, i) => (
              <span key={i}>{l}{i === 0 && <br />}</span>
            ))}
          </h2>
          <div className="gold-line fade-up delay-2" />
          <p className="section-desc fade-up delay-2">{t('contact.subtitle')}</p>
        </div>

        {/* Contact cards */}
        <div className="contact__cards">
          {contactItems.map((item, i) => (
            <a
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className={`contact__card fade-up delay-${i + 1}`}
              key={i}
            >
              <div className="contact__card-icon">{item.icon}</div>
              <div className="contact__card-body">
                <span className="contact__card-label">{t(item.labelKey)}</span>
                <span className="contact__card-value">
                  {item.value.split('\n').map((line, j) => (
                    <span key={j} className={item.isPhone ? 'force-ltr' : ''}>{line}{j < item.value.split('\n').length - 1 && <br />}</span>
                  ))}
                </span>
              </div>
              <div className="contact__card-arrow">→</div>
            </a>
          ))}
        </div>

      </div>

      {/* Background pattern */}
      <div className="contact__bg-pattern" />
    </section>
  );
};

export default Contact;