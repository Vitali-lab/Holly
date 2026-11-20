import styled from "styled-components";
import { Link } from "react-router-dom";

const FooterContainer = ({ className, links = [], contacts = [], copy }) => {
  return (
    <div className={className}>
      <footer>
        <div className="footer-top">
          <div className="brand">
            <Link to="/" className="wordmark" aria-label="Holly — на главную">
              Holly
              <span>Garment</span>
            </Link>
            <p>
              Одежда и аксессуары для тех, кто выбирает спокойную элегантность.
              Минск, с 2019 года.
            </p>
          </div>

          <nav className="links" aria-label="Навигация в подвале">
            <p className="footer-title">Магазин</p>
            {links.map((link, index) =>
              link.href.startsWith("/") ? (
                <Link key={index} to={link.href}>
                  {link.label}
                </Link>
              ) : (
                <a key={index} href={link.href}>
                  {link.label}
                </a>
              ),
            )}
          </nav>

          <div className="contacts">
            <p className="footer-title">Контакты</p>
            {contacts.map((contact, index) => (
              <p key={index}>{contact}</p>
            ))}
          </div>

          <div className="newsletter">
            <p className="footer-title">Оставайтесь на связи</p>
            <p>
              Новые коллекции и закрытые распродажи — раз в месяц, без лишних
              писем.
            </p>
            <a href="mailto:info@holly.by">info@holly.by</a>
          </div>
        </div>

        <div className="info-footer">
          <p>{copy}</p>
          <div className="info-links">
            <span>Оплата</span>
            <span>Доставка</span>
            <span>Возврат</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const Footer = styled(FooterContainer)`
  width: 100%;
  margin-top: auto;
  background-color: var(--ink);
  color: var(--paper);

  & footer {
    width: var(--page-width);
    margin: 0 auto;
    padding: clamp(44px, 6vw, 80px) 0 32px;
  }

  & .footer-top {
    display: grid;
    grid-template-columns: 1.4fr 0.8fr 1fr 1.2fr;
    gap: clamp(28px, 4vw, 64px);
    padding-bottom: clamp(36px, 4vw, 56px);
    border-bottom: 1px solid rgba(246, 243, 236, 0.16);
  }

  & .brand {
    display: flex;
    flex-direction: column;
    gap: 18px;

    & p {
      margin: 0;
      max-width: 280px;
      color: rgba(246, 243, 236, 0.62);
      font-size: 13px;
      line-height: 1.7;
    }
  }

  & .wordmark {
    display: flex;
    flex-direction: column;
    width: fit-content;
    color: var(--paper);
    font-family: var(--font-display);
    font-size: 40px;
    line-height: 1;
    text-decoration: none;

    & span {
      margin-top: 6px;
      font-family: var(--font-body);
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.4em;
      text-transform: uppercase;
      color: rgba(246, 243, 236, 0.5);
    }
  }

  & .footer-title {
    margin: 0 0 18px;
    color: rgba(246, 243, 236, 0.42);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }

  & .links {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    & a {
      margin-bottom: 10px;
      color: var(--paper);
      font-size: 14px;
      text-decoration: none;
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 0.6;
      }
    }
  }

  & .contacts {
    display: flex;
    flex-direction: column;

    & p:not(.footer-title) {
      margin: 0 0 10px;
      color: rgba(246, 243, 236, 0.78);
      font-size: 13px;
      line-height: 1.6;
    }
  }

  & .newsletter {
    & p:not(.footer-title) {
      margin: 0 0 16px;
      color: rgba(246, 243, 236, 0.62);
      font-size: 13px;
      line-height: 1.7;
    }

    & a {
      display: inline-block;
      padding-bottom: 4px;
      border-bottom: 1px solid rgba(246, 243, 236, 0.5);
      color: var(--paper);
      font-size: 13px;
      letter-spacing: 0.06em;
      text-decoration: none;
    }
  }

  & .info-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    padding-top: 24px;

    & p {
      margin: 0;
      color: rgba(246, 243, 236, 0.42);
      font-size: 11px;
      letter-spacing: 0.06em;
    }
  }

  & .info-links {
    display: flex;
    gap: 22px;
    color: rgba(246, 243, 236, 0.42);
    font-size: 11px;
    letter-spacing: 0.06em;
  }

  @media (max-width: 992px) {
    & .footer-top {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 576px) {
    & .footer-top {
      grid-template-columns: 1fr;
      gap: 32px;
    }

    & .info-footer {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;
