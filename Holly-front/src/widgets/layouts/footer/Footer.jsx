import { Link } from 'react-router-dom';
import { Logo, SocialNetworks } from '../../../shared/ui';
import { FOOTER_CONTACTS, FOOTER_LINKS, COPYRIGHT } from '../../../shared/config/appInfo';
import styled from 'styled-components';

const FooterContainer = ({ className }) => {
  return (
    <div className={className}>
      <footer>
        <div className="footer-logo">
          <Logo width="250px" height="100px" />
        </div>
        <div className="footer-links">
          {FOOTER_LINKS.map((link, index) => (
            <Link key={index} to={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="footer-info">
          <div className="footer-contacts">
            {FOOTER_CONTACTS.map((contact, index) => (
              <p key={index}>{contact}</p>
            ))}
          </div>
          <div className="footer-social-networks">
            <SocialNetworks />
          </div>
        </div>

        <div className="footer-copyright">
          <p>{COPYRIGHT}</p>
        </div>
      </footer>
    </div>
  );
};

export const Footer = styled(FooterContainer)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: var(--white-color);
  z-index: 1;
  width: 100%;
  height: 300px;
  position: relative;
  box-shadow: var(--box-shadow);

  & footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  & .footer-logo {
    position: absolute;
    top: 80px;
    left: 350px;
  }

  & .footer-links {
    display: flex;
    gap: 120px;
    margin-bottom: 30px;
    & a {
      text-decoration: none;
      color: var(--black-color);
      cursor: pointer;
      font-size: 20px;
      transition: color 0.3s ease-in-out;
      &:hover {
        color: var(--main-color);
      }
    }
  }

  & .footer-info {
    display: flex;
  }
  & .footer-contacts {
    width: 300px;

    display: flex;
    align-items: flex-start;

    margin: 0 30px 0 0;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
    & p {
      margin: 0;
      text-align: left;
    }
  }

  & .footer-copyright {
    left: calc(50% - 500px);
    display: flex;
    flex-direction: row;
    color: var(--grey-color);
    justify-content: center;
    align-items: end;
    gap: 100px;
    width: 1000px;
    height: 40px;
    margin: 0 auto;
  }

  @media (max-width: 1700px) {
    & .footer-logo {
      position: absolute;
      top: 80px;
      left: 190px;
    }
  }

  @media (max-width: 992px) {
    & .footer-logo {
      position: absolute;
      top: 80px;
      left: 100px;
    }
  }

  @media (max-width: 768px) {
    & .footer-logo {
      position: absolute;
      top: 80px;
      left: 100px;
    }
  }

  @media (max-width: 576px) {
    display: none;
    }
  }
`;
