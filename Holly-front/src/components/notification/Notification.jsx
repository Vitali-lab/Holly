
import { useEffect, useState } from "react"; 
import styled,{keyframes} from "styled-components";

const openAnimation = keyframes`
from{
    
    transform: translateY(-130px);
}
to{
    opacity: 1;
    transform: translateY(0px);
}
`
const closeAnimation = keyframes`
from{
    opacity: 1;
    
    transform: translateY(0px);
}
to{
    opacity: 0;
    display: none;
    transform: translateY(-130px);
}
`


const NotificationContainer = ({className , children, onClose }) => {

 useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000);

    return () => clearTimeout(timer)
  }, [onClose]);


    return(
        <div className={className}>
            
                 {children}
          
        </div>
    )
}


export const Notification = styled(NotificationContainer)`
position: fixed;
bottom: 20px;
right: 20px;
z-index: 9999;
background-color: #333;
color: #fff;
padding: 12px 20px;
border-radius: 8px;
box-shadow: 0 2px 8px rgba(0,0,0,0.3);
animation: ${openAnimation} 0.3s ease-in-out;


   
`