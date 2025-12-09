import { Icon } from '../icon/Icon';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import styled from 'styled-components';

const SocialNetworksContainer = ({ className }) => {
  return (
    <div className={className}>
      <motion.a
        href="https://www.instagram.com/holly_minsk/"
        className="social-link"
        whileHover={{ scale: 1.2, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        <Icon id="instagram" />
      </motion.a>
      <motion.a
        href="#"
        className="social-link"
        whileHover={{ scale: 1.2, rotate: -5 }}
        whileTap={{ scale: 0.9 }}
      >
        <Icon id="telegram" />
      </motion.a>
    </div>
  );
};
export const SocialNetworks = styled(SocialNetworksContainer)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  .social-link {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: all 0.3s ease;
    & :hover {
      color: var(--main-color);
    }
  }
`;
