import {useState} from 'react'
import { viewMyProfile } from '../services/api'
import toast from 'react-hot-toast'

export const useViewProfile = () => {
    const [isLoading, setIsLoading] = useState(false)

    const viewProfile = async () => {
        setIsLoading(true)
        try {
            const response = await viewMyProfile()
            toast.success(response.data.msg)
            setIsLoading(false)
            return response
        } catch (error) {
            toast.error('Error al cargar la información del usuario')
            setIsLoading(false)
            return null
        }
    }

    return {
        isLoading, 
        viewProfile
    }
}