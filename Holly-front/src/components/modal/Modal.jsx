import { Icon } from "../../components/icon/Icon";
import { Button } from "../../components/button/Button";
import { deleteProduct } from "../../bff/api/delete-product";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const ModalContainer = ({className, children , setOpenModal , productId}) => {

    const closeModal = ({target}) => {
        const container = document.querySelector('.container')
        const isClickInside = container.contains(target);
        if (!isClickInside) {
            setOpenModal(false);
        }
    }
       const dispatch = useDispatch();

       console.log(productId);
       
       const productDelete = () => {
        dispatch(deleteProduct(productId))
        setOpenModal(false)
       }

    return (
        <div className={className} onClick={closeModal}>
        <div className="container">
            <Icon id={"times"} onClick={() => setOpenModal(false)}/>
            <h3>{children}</h3>
            <Button onClick={productDelete}>Да</Button>
            <Button  onClick={() => setOpenModal(false)} >Нет</Button>
        </div>
        </div>
    )
}

export const Modal = styled(ModalContainer)`
width: 100vw;
height: 100vh;
position: fixed;
top: 0;
left: 0;
background-color: rgba(0, 0, 0, 0.13);
z-index: 1;
& .container{
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
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px;
}
`