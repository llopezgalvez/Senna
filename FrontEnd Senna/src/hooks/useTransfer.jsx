import { useState } from "react";
import { transferReq } from "../services/api.js";
import toast from 'react-hot-toast'

export const useTransfer = () => {
    const [isLoading, setIsLoading] = useState(false);

    const transfer = async (transferAccount, amount, description) => {
        setIsLoading(true);
        const transfer = {
            transferAccount,
            amount,
            description
        };
        try {
            const response = await transferReq(transfer);
            if (response.status !== 200) {
                throw new Error(response.message || 'Error during transfer');
            }
            console.log(response.data.message)
            toast.error(response.data.message)
            setIsLoading(false);
            return response;  // Retorna la respuesta para manejarla en el componente
        } catch (error) {
            setIsLoading(false);
            console.error('Error during transfer:', error);
            throw error;  // Re-lanza el error para que pueda ser manejado en el componente
        }
    };

    return {
        isLoading,
        transfer
    };
};
