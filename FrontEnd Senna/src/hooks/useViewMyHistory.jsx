import { useState } from 'react'
import { viewMyHistory } from '../services/api.js'
import toast from 'react-hot-toast'

export const useViewAccountHistory = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [accountHistory, setAccountHistory] = useState(null)

    const viewAccountHistory = async () => {
        setIsLoading(true)
        try {
            const response = await viewMyHistory()
            console.log(response)
            if (response.data) {
                setAccountHistory(response.data.profile)
                toast.success(response.data)
                console.log(response.data.profile)
            } else {
                toast.error('No se pudo cargar el historial de la cuenta')
            }
            setIsLoading(false)
            return response
        } catch (error) {
            toast.error('Error al ver la historia de cuenta')
            setIsLoading(false)
            return null
        }
    }

    return {
        isLoading,
        accountHistory,
        viewAccountHistory
    }
}