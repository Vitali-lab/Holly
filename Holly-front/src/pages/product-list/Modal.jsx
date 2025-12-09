import { Icon, Button } from '../../shared/ui';
import { deleteProduct } from '../../features/products/products';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const ModalContainer = ({ className, children, setOpenModal, productId }) => {
  const closeModal = ({ target }) => {
    const container = document.querySelector('.container');
    const isClickInside = container.contains(target);
    if (!isClickInside) {
      setOpenModal(false);
    }
  };
  const dispatch = useDispatch();

  const productDelete = () => {
    dispatch(deleteProduct(productId));
    setOpenModal(false);
  };

  return (
    <div className={className} onClick={closeModal}>
      <div className="modal-container">
        <Icon id={'times'} onClick={() => setOpenModal(false)} />
        <h3>{children}</h3>
        <div className="modal-buttons">
          <Button onClick={productDelete}>Да</Button>
          <Button onClick={() => setOpenModal(false)}>Нет</Button>
        </div>
      </div>
    </div>
  );
};

export const Modal = styled(ModalContainer)`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--modal-background);
  z-index: 1000;
  & .modal-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    gap: 20px;
    width: 400px;
    height: 200px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px;
  }
  & .modal-buttons {
    display: flex;
    gap: 20px;
  }
  & i {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    padding: 5px;
  }
  & h3 {
    text-align: center;
  }
`;
