import { useEffect, useState } from 'react';
import { scrollTop } from '../../utils/scrollTop';
import { Icon } from '../icon/Icon';
import styled from 'styled-components';

const ScrollTopButtonContainer = ({ className }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {visible && (
        <div className={className} onClick={() => scrollTop()}>
          <Icon id="angle-up" size="60"></Icon>
        </div>
      )}
    </>
  );
};

export const ScrollTopButton = styled(ScrollTopButtonContainer)`
  position: fixed;
  bottom: 50px;
  right: 50px;
  z-index: 100;
  width: 80px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff4b;
  border-radius: 12px;
  box-shadow: var(--box-shadow);
  cursor: pointer;
  &:active {
    transition: all ease 0.5s;
    transform: scale(0.8);
  }
  & i {
    color: var(--grey-color);
  }

  @media (max-width: 600px) {
    bottom: 90px;
    right: 10px;
    width: 50px;
    height: 50px;
    background-color: #ffffff4b;
  }
`;
