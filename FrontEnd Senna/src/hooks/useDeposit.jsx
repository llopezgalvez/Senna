import { useState } from "react";
import { newDepositReq } from "../services/api";
import toast from "react-hot-toast";

export const useDeposit = () => {
    const [isLoading, setIsLoading] = useState(false);

    const deposit = async (amount, receiver) => {
        setIsLoading(true);
        const depo = {
            amount,
            receiver
        };

        try {
            const response = await newDepositReq(depo);
            console.log(response); // Mensaje de éxito del servidor
            console.log(response.data.msg); // Mensaje de éxito del servidor
            toast.success(response.data.msg); // Mostrar mensaje de éxito
            setIsLoading(false);
            return true; // Indica que el registro fue exitoso
        } catch (err) {
            setIsLoading(false);
            toast.error('Saldo insuficiente')
            return false; // Indica que el registro falló
        }
    };

    return {
        isLoading,
        deposit
    };
};
