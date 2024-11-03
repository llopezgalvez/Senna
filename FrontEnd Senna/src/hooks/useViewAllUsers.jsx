import {useState} from 'react'
import { viewAllUser } from '../services/api.js'
import toast from 'react-hot-toast'

export const useViewAllUsers = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [allUsers, setAllUsers] = useState(null)

    const viewAllUsers = async () => {
        setIsLoading(true)
        try {
            const response = await viewAllUser()
            console.log(response)
            if (response.data) {
                setAllUsers(response.data.profile)
                toast.success(response.data)
                console.log(response.data.profile)
            } else {
                toast.error('No hay usuarios registrados')
            }
            setIsLoading(false)
            return response
        } catch (error) {
            toast.error('Error al mostrar el historial de todos los usuarios')
            setIsLoading(false)
            return null
        }
    }

    return {
        isLoading,
        allUsers,
        viewAllUsers
    }
}