import { useEffect } from 'react';
import { useTransfer } from '../../hooks/useTransfer';
import { useState } from 'react';
import { Taskbar } from '../../components/Taskbar/Taskbar';
import toast, { Toaster } from 'react-hot-toast';
import './transfer.css';
import { useGetFavorite } from '../../hooks/useGetFavorite';
import { Cards } from '../../components/Cards/Cards';

export const Transfer = () => {
    const { favorites, getFavorites, isFetching } = useGetFavorite();

    const { transfer, isLoading } = useTransfer();
    const [formData, setFormData] = useState({
        transferAccount: '',
        amount: '',
        description: ''
    });

    // Obtiene los favoritos
    useEffect(() => {
        getFavorites();
    }, []);

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };

    const handleFavoriteClick = (accountNumber) => {
        setFormData((prevData) => ({
            ...prevData,
            transferAccount: accountNumber
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones
        if (!formData.transferAccount || !formData.amount || !formData.description) {
            toast.error('Por favor, completa todos los campos.', {
                position: 'top-center',
                style: {
                    background: '#D25E5E',
                    color: '#fff',
                    borderRadius: '10px',
                    padding: '20px',
                    fontSize: '18px',  // Tamaño de fuente más grande
                    maxWidth: '400px',  // Ancho máximo del toast
                    textAlign: 'center',  // Alineación del texto en el centro
                },
                icon: '❌',
                ariaProps: {
                    role: 'alert',
                    'aria-live': 'assertive',
                },
            });
            return;
        }
        if (isNaN(formData.amount) || Number(formData.amount) <= 0) {
            toast.error('El monto debe ser un número positivo.', {
                position: 'top-center',
                style: {
                    background: '#D25E5E',
                    color: '#fff',
                    borderRadius: '10px',
                    padding: '20px',
                    fontSize: '18px',  // Tamaño de fuente más grande
                    maxWidth: '400px',  // Ancho máximo del toast
                    textAlign: 'center',  // Alineación del texto en el centro
                },
                icon: '❌',
                ariaProps: {
                    role: 'alert',
                    'aria-live': 'assertive',
                },
            });
            return;
        }

        try {
            const response = await transfer(
                formData.transferAccount,
                parseFloat(formData.amount),  // Asegúrate de enviar un número flotante
                formData.description
            );
            toast.info(response.data.message, {
                position: 'top-center',
                style: {
                    background: '#4caf50',
                    color: '#fff',
                    borderRadius: '10px',
                    padding: '20px',
                    fontSize: '18px',  // Tamaño de fuente más grande
                    maxWidth: '400px',  // Ancho máximo del toast
                    textAlign: 'center',  // Alineación del texto en el centro
                },
                icon: '🎉',
                ariaProps: {
                    role: 'alert',
                    'aria-live': 'assertive',
                },
            });
        } catch (error) {
            if (error.message.includes('404')) {
                toast.error(response.data.message, {
                    position: 'top-center',
                    style: {
                        background: '#D25E5E',
                        color: '#fff',
                        borderRadius: '10px',
                        padding: '20px',
                        fontSize: '18px',  // Tamaño de fuente más grande
                        maxWidth: '400px',  // Ancho máximo del toast
                        textAlign: 'center',  // Alineación del texto en el centro
                    },
                    icon: '❌',
                    ariaProps: {
                        role: 'alert',
                        'aria-live': 'assertive',
                    },
                });
            } else {
                toast.error(response.data.message, {
                    position: 'top-center',
                    style: {
                        background: '#D25E5E',
                        color: '#fff',
                        borderRadius: '10px',
                        padding: '20px',
                        fontSize: '18px',  // Tamaño de fuente más grande
                        maxWidth: '400px',  // Ancho máximo del toast
                        textAlign: 'center',  // Alineación del texto en el centro
                    },
                    icon: '❌',
                    ariaProps: {
                        role: 'alert',
                        'aria-live': 'assertive',
                    },
                });
            }
        }
    };

    return (
        <>
            <div className="backgrounds">
                <div className="shapes"></div>
                <div className="shapes"></div>
                <div className="shapes"></div>
                <div className="shapes"></div>
                <div className="shapes"></div>
                <div className="shapes"></div>
            </div>

            <form id="forms" onSubmit={handleSubmit}>
                <h1 id='trans'>Realiza una transferencia</h1>

                <input onChange={handleChange} value={formData.transferAccount} name='transferAccount' type="text" placeholder="Número de cuenta" id='transA' />
                <input onChange={handleChange} value={formData.amount} name='amount' type="text" step='0.01' placeholder='Cantidad' id='amon' />
                <input onChange={handleChange} value={formData.description} name='description' type="text" placeholder='Descripción' id='desc' />
                <button className='buton' disabled={isLoading}>
                    {isLoading ? 'Procesando...' : 'Transferir'}
                </button>
            </form>

            <form id='formFav'>
                {isFetching ? (
                    <p>Cargando favoritos...</p>
                ) : favorites && favorites.length > 0 ? (
                    <div className="favorites">
                        <h2 id='CF'>Contactos / Favoritos</h2>
                        {favorites.map((item) => (
                            <div key={item._id} className="favorite-item" onClick={() => handleFavoriteClick(item.accountNumber)}>
                                <div>
                                    <strong>Nombre:</strong> {item.name}
                                </div>
                                <div>
                                    <strong>No. de cuenta:</strong> {item.accountNumber}
                                </div>
                                <div>
                                    <strong>Tipo de cuenta:</strong> {item.typeAccount}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No hay favoritos disponibles.</p>
                )}
            </form>
            <Cards />
            <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                    success: {
                        duration: 4000,
                        style: {
                            background: '#4caf50',
                            color: '#fff',
                            borderRadius: '10px',
                            padding: '20px',
                            fontSize: '18px',
                            maxWidth: '400px',
                            textAlign: 'center',
                            boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
                        },
                        icon: '🎉',
                        ariaProps: {
                            role: 'alert',
                            'aria-live': 'assertive',
                        },
                    },
                    error: {
                        duration: 5000,
                        style: {
                            background: '#f44336',
                            color: '#fff',
                            borderRadius: '10px',
                            padding: '20px',
                            fontSize: '18px',
                            maxWidth: '400px',
                            textAlign: 'center',
                            boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
                        },
                        icon: '❌',
                        ariaProps: {
                            role: 'alert',
                            'aria-live': 'assertive',
                        },
                    },
                    loading: {
                        duration: 0,  // Mantenlo visible hasta que llames a toast.dismiss()
                        style: {
                            background: '#2196f3',
                            color: '#fff',
                            borderRadius: '10px',
                            padding: '20px',
                            fontSize: '18px',
                            maxWidth: '400px',
                            textAlign: 'center',
                            boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
                        },
                        ariaProps: {
                            role: 'alert',
                            'aria-live': 'assertive',
                        },
                    },
                }}
            />
        </>
    );
}
