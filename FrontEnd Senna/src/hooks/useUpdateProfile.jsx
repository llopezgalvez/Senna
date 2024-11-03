import { useState } from 'react'
import { updateMyProfile } from '../services/api'
import {toast} from 'react-hot-toast'

export const useUpdateProfile = () => {
    const [isLoading, setIsLoading] = useState(false)

    const information = async (address, phone, email, username, monthlyIncome) => {
        setIsLoading(true)
        const data = {
            address,
            phone,
            email,
            username,
            monthlyIncome,
        }

        try {
            console.log('dos', data)
            const response = await updateMyProfile(data)
            console.log(response.data.msg)
            setIsLoading(false)
            return { success: true }
        } catch (error) {
            setIsLoading(false)
            return { success: false, error: error.message }
        }
    }

    return {
        isLoading,
        information
    }
}