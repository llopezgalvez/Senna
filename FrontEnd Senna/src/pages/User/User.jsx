import React, { useState } from 'react';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';
import './User.css'
import { CardProf } from '../../components/Cards/CardProf';
import { toast, Toaster } from 'react-hot-toast';


export const UpdateProfileForm = () => {
    const { isLoading, information } = useUpdateProfile();
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [monthlyIncome, setMonthlyIncome] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const result = await information(address, phone, email, username, monthlyIncome);
        if (result.success) {
            toast.success('Los datos se actualizaron correctamente');
            // Actualizar los datos de perfil con éxito
        } else {
            toast.error('Error al actualizar los datos de perfil');
            // Mostrar error al actualizar los datos de perfil
        }
    };

    return (
        <>
            <>
                <div class="backgrounds">
                    <div class="shapes"></div>
                    <div class="shapes"></div>
                    <div class="shapes"></div>
                    <div class="shapes"></div>
                    <div class="shapes"></div>
                    <div class="shapes"></div>

                </div>
                <form  id='asdss' onSubmit={handleSubmit}>
                    <h2 id='Actu'>Actualiza tus datos</h2>
                    <label id='labol'>
                        
                        <input type="text" placeholder='Dirección' value={address} onChange={(event) => setAddress(event.target.value)} />
                    </label>
                    <br />
                    <label id='labol'>
                        <input type="tel" placeholder='Teléfono' maxLength={8} value={phone} onChange={(event) => setPhone(event.target.value)} />
                    </label>
                    <br />
                    <label id='labol'>
                        <input type="email" placeholder='Correo Electronico' value={email} onChange={(event) => setEmail(event.target.value)} />
                    </label>
                    <br />
                    <label id='labol'>
                        <input type="text" placeholder='username' value={username} onChange={(event) => setUsername(event.target.value)} />
                    </label>
                    <br />
                    <label id='labol'>
                        <input type="text" placeholder='Sueldo mensual' value={monthlyIncome} onChange={(event) => setMonthlyIncome(event.target.value)} />
                    </label>
                    <br />
                    <button type="submit" className='buton' disabled={isLoading}>
                        {isLoading ? 'Actualizando...' : 'Actualizar perfil'}
                    </button>
                </form>
                <CardProf />
                <Toaster />

            </>
        </>
    );
};

