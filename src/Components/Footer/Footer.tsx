import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const navSections = [
    {
      heading: t('footer.headers.company'),
      links: [
        { label: t('nav.about'),          id: 'about'          },
        { label: t('nav.vision'),         id: 'vision'         },
        { label: t('nav.why'),            id: 'why'            },
        { label: t('nav.sustainability'), id: 'sustainability' },
      ],
    },
    {
      heading: t('footer.headers.services'),
      links: [
        { label: t('services.warehouse.title'), id: 'services' },
        { label: t('services.transport.title'),       id: 'services' },
        { label: t('services.consulting.title'),id: 'services' },
        { label: t('services.trading.title'),   id: 'services' },
      ],
    },
    {
      heading: t('footer.headers.contact'),
      links: [
        { label: 'info@alraedon-trading.com', id: 'contact', href: 'mailto:info@alraedon-trading.com' },
        { label: '+20 103 529 0808', isPhone: true, id: 'contact', href: 'tel:+201035290808'               },
        { label: t('footer.location'),  id: 'contact'                                          },
        { label: 'www.alraedon-trading.com',  id: 'contact', href: 'https://www.alraedon-trading.com', external: true },
      ],
    },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      {/* Top diagonal cut */}
      <div className="footer__diagonal" />

      <div className="footer__inner container">
        {/* Brand column */}
        <div className="footer__brand">
          <img src="../../../public/assets/Logo/logo-h.png" alt="Al Raedon" className="footer__logo" />
          <p className="footer__tagline">{t('footer.tagline')}</p>
          <p className="footer__desc">
            {t('footer.desc')}
          </p>
          <div className="footer__gold-line" />
        </div>

        {/* Nav columns */}
        {navSections.map((sec) => (
          <div className="footer__col" key={sec.heading}>
            <h4 className="footer__col-heading">{sec.heading}</h4>
            <ul className="footer__col-links">
              {sec.links.map((link) => (
                <li key={link.label}>
                  {link.href ? (
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className={`footer__link ${link.isPhone ? 'force-ltr' : ''}`}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <button className="footer__link" onClick={() => scrollTo(link.id)}>
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span className="footer__rights">{t('footer.rights')}</span>
          <span className="footer__credits">
            {t('footer.credits')}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;