import { useState } from "react";
import { viewMyBalance } from "../services/api";
import toast from 'react-hot-toast';

export const useViewBalance = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [balanceData, setBalanceData] = useState(null); // State to store balance data

    const viewBalance = async () => {
        setIsLoading(true);
        try {
            const response = await viewMyBalance();
            setBalanceData(response.data); // Assuming response.data contains the balance information
        } catch (error) {
            toast.error('Error al cargar el balance del usuario');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        viewBalance,
        balanceData // Return balanceData to be used in components
    };
};
