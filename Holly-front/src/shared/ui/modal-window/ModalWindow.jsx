import { createPortal } from 'react-dom';
import { Icon } from '../../ui';
import styled from 'styled-components';

const ModalWindowContainer = ({ className, children, setOpenModal }) => {
  const portalRoot = document.getElementById('portal');
  if (!portalRoot) return null;

  return createPortal(
    <div className={className}>
      <div className="modal">
        <Icon id={'times'} onClick={() => setOpenModal(false)} />
        {children}
      </div>
    </div>,
    portalRoot
  );
};

export const ModalWindow = styled(ModalWindowContainer)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20000;
  & .modal {
    width: 900px;
    height: 700px;
    background-color: #ffffff;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
  & i {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    padding: 5px;
  }

  & .order-modal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    & h2 {
      text-align: center;
      font-size: 70px;
      margin: 0px;
    }
    & p {
      text-align: center;
      font-size: 24px;
      margin: 0px;
      color: var(--grey-color);
    }
  }
`;
