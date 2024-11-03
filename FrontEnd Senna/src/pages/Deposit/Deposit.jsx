import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Taskbar } from '../../components/Taskbar/Taskbar';
import { useDeposit } from '../../hooks/useDeposit';
import './Deposit.css';
import { CardDeposit } from '../../components/Card/CardDeposit';

export const Deposit = () => {
    const { deposit, isLoading } = useDeposit();
    const [formData, setFormData] = useState({
        amount: {
            value: "",
            isValid: false,
            showError: false
        },
        receiver: {
            value: "",
            isValid: false,
            showError: false
        }
    });

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: {
                ...prevData[e.target.name],
                value: e.target.value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await deposit(formData.amount.value, formData.receiver.value);

        if (result.success) {
            toast.success('Se hizo el depósito correctamente');
            setTimeout(() => {
                // Realiza cualquier otra acción necesaria después del depósito
            }, 1000);
        } else if (result.error) {
            toast.error(result.error);
        }
    };
    return (
        <>
            <div className='con'>
                <div className="backgrounds">
                    <div className="shapes"></div>
                    <div className="shapes"></div>
                    <div className="shapes"></div>
                    <div className="shapes"></div>
                    <div className="shapes"></div>
                    <div className="shapes"></div>
                </div>
                <form id='Depo' onSubmit={handleSubmit}>
                    <h3 id='depo'>DEPOSITAR</h3>


                    <input
                        value={formData.amount.value}
                        onChange={handleChange}
                        name='amount'
                        type="text"
                        placeholder="Cantidad a depositar"
                        id="account"
                    />


                    <input
                        value={formData.receiver.value}
                        onChange={handleChange}
                        name='receiver'
                        type="text"
                        placeholder="No. de Cuenta"
                        id="accountd"
                    />


                    <button className='deposs' disabled={isLoading}>
                        {isLoading ? 'Procesando...' : 'Depositar'}
                    </button>
                </form>
            </div>
            <CardDeposit />
            <Toaster />
        </>
    );
};
