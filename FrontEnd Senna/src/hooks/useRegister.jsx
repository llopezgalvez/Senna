import { useState } from "react";
import { registerReq } from "../services/api.js";
import toast from "react-hot-toast";

export const useRegister = () => {
    const [isLoading, setIsloading] = useState(false);

    const register = async (name, username, dpi, address, phone, email, password, workingName, monthlyIncome, balance) => {
        setIsloading(true);
        const user = {
            name,
            username,
            dpi,
            address,
            phone,
            email,
            password,
            workingName,
            monthlyIncome,
            balance
        };

        try {
            const response = await registerReq(user);

            // Debugging output
            console.log('Server Response:', response);

            setIsloading(false);

            // Check for status 200 or 201
            if (response.status !== 200 && response.status !== 201) {
                throw new Error('Error en la respuesta del servidor');
            }

            console.log(response.data.msg); // Mensaje de éxito del servidor
            return true; // Indica que el registro fue exitoso

        } catch (err) {
            setIsloading(false);

            // Debugging output
            console.error('Error:', err);

            if (err.response?.data?.errors) {
                let errors = err.response.data.errors;
                errors.forEach(error => toast.error(error.msg))
            } else {
                toast.error(
                    err.response?.data?.msg ||
                    'Rellene todos los campos'
                );
            }

            return false // Indica que el registro falló
        }
    }

    return {
        isLoading,
        register
    };
}
