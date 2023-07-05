import { toast } from "react-toastify";

type ToastType = 'warn' | 'info' | 'default' | 'success' | 'error';

export const openToast = (message: string, toastType: ToastType = 'info', options: any = {}) => {
    const toastOptions = {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        ...options,
    };
    switch(toastType) {
        case 'info':
            toast.info(message, toastOptions);
            break;
        case 'success':
            toast.success(message, toastOptions);
            break;
        case 'warn':
            toast.warn(message, toastOptions);
            break;
        case 'error':
            toast.error(message, toastOptions);
            break;
        default:
            toast(message, toastOptions);
    }
}