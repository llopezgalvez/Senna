import { useState } from "react"
import toast from "react-hot-toast"
import { loginReq } from "../services/api"

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false)

    const login = async (username, password) => {
        setIsLoading(true)
        const user = { username, password }
        try {
            const response = await loginReq(user)
            setIsLoading(false)

            if (response.error) {
                toast.error(
                    response?.error?.response?.data?.msg ||
                    'Correo o Contraseña no válidos.',
                    {
                        position: 'top-center',
                        style: {
                            background: '#f44336',
                            color: '#fff',
                            borderRadius: '10px',
                            padding: '20px',
                            fontSize: '18px',
                            textAlign: 'center',
                            boxShadow: '0px 4px 6px rgba(0,0,0,0.3)',
                        },
                        icon: '❌',
                        ariaProps: {
                            role: 'alert',
                            'aria-live': 'assertive',
                        },
                    }
                )
                return false  // Indica que el login falló
            }

            console.log(response)
            localStorage.setItem('token', response.data.token)
            toast.success('Inicio de sesión exitoso!', {
                position: 'top-center',
                style: {
                    background: '#4caf50',
                    color: '#fff',
                    borderRadius: '10px',
                    padding: '20px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    boxShadow: '0px 4px 6px rgba(0,0,0,0.3)',
                },
                icon: '🎉',
                ariaProps: {
                    role: 'alert',
                    'aria-live': 'assertive',
                },
            })
            return true  // Indica que el login fue exitoso
        } catch (error) {
            setIsLoading(false)
            toast.error('Error general al intentar loguearse. Intenta de nuevo.', {
                position: 'top-center',
                style: {
                    background: '#f44336',
                    color: '#fff',
                    borderRadius: '10px',
                    padding: '20px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    boxShadow: '0px 4px 6px rgba(0,0,0,0.3)',
                },
                icon: '❌',
                ariaProps: {
                    role: 'alert',
                    'aria-live': 'assertive',
                },
            })
            return false  // Indica que el login falló
        }
    }

    return { isLoading, login }
}
