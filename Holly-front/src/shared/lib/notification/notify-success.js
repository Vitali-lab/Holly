import { toast } from 'react-toastify';

export const notifySuccess = (text, onClick) =>
  toast.success(text, {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    style: {
      marginTop: '10px',
      backgroundColor: '#ffffff90',
      backdropFilter: 'blur(10px)',
      borderRadius: '15px',
      color: '#0f0f0fff',
      boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2)',
      width: '300px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    progress: undefined,
    onClick: () => onClick(),
  });
