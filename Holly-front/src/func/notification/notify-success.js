import { toast } from "react-toastify";


export const notifySuccess = (text,onClick) =>
  toast.success(text, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    style: { marginTop: "10px", backgroundColor: "rgba(23, 21, 15, 0.96)", color: "#f6f3ec", backdropFilter: "blur(10px)", borderRadius: "0px", border: "1px solid rgba(246, 243, 236, 0.18)", boxShadow: "0 18px 40px rgba(23, 21, 15, 0.24)", width: "min(400px, 90vw)", fontSize: "13px" },
    progress: undefined,
    onClick: () => onClick(),
    
  });


