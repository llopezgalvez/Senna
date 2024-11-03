import { useState } from "react"
import { addFavoriteReq } from "../services/api.js"
import toast from "react-hot-toast"

export const useFavorite = () => {
    const [isLoading, setIsLoading] = useState(false)

    const favorite = async (name, accountNumber, typeAccount) => {
        setIsLoading(true)
        const user = {
            name,
            accountNumber,
            typeAccount
        }

        try {
            const response = await addFavoriteReq(user)
            console.log('Server Response:', response)
            console.log(response.data.msg)
            toast.success(response.data.msg)
            
            setIsLoading(false)
            return true
        } catch (err) {
            setIsLoading(false)

            console.error('Error:', err)

            if (err.response?.data?.errors) {
                let errors = err.response.data.errors
                errors.forEach(error => toast.error(error.msg))
            } else {
                toast.error(
                    err.response?.data?.msg ||
                    'Rellene todos los campos'
                )
            }
            return false
        }
    }

    return {
        isLoading,
        favorite
    }
}
