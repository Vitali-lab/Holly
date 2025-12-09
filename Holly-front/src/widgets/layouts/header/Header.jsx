import { useState } from 'react';
import { Auth, Registration } from '../../../shared/ui';
import { ControlPanel } from './components/ControlPanel';
import { NavigateBar } from './components/NavigateBar';
import styled from 'styled-components';

const HeaderContainer = ({ className }) => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  return (
    <>
      {isAuthOpen && (
        <Auth setIsAuthOpen={setIsAuthOpen} setIsRegistrationOpen={setIsRegistrationOpen} />
      )}
      {isRegistrationOpen && (
        <Registration setIsRegistrationOpen={setIsRegistrationOpen} setIsAuthOpen={setIsAuthOpen} />
      )}
      <div className={className}>
        <ControlPanel setIsAuthOpen={setIsAuthOpen} />
        <NavigateBar />
      </div>
    </>
  );
};

export const Header = styled(HeaderContainer)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffffff;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
  padding: 12px 0;
  gap: 12px;

  & .control-panel {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: min(1280px, 100%);
    min-height: 64px;
    gap: 16px;
  }

  @media (max-width: 1200px) {
    width: min(1200px, 100%);
    position: fixed;
    top: -5px;
    box-shadow: var(--box-shadow);
    height: 90px;
    & .control-panel {
      flex-wrap: wrap;
    }
  }

  @media (max-width: 768px) {
    padding: 12px 20px;

    & .control-panel {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
  }

  @media (max-width: 576px) {
    width: min(490px, 100%);
    padding: 12px 0px;
  }
`;
