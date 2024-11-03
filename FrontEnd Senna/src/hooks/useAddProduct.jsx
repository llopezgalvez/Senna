import React from 'react'
import toast from 'react-hot-toast'
import { addProductReq } from '../services/api'
import { useState } from 'react'

export const useAddProduct = () => {
    const [isLoading, setIsLoading] = useState(false)

    const addProduct = async (name, description, price) => {
        setIsLoading(true)
        const product = {
            name,
            description,
            price
        }

        try {
            const response = await addProductReq(product)
            console.log('Server Response:', response)
            console.log(response.data.msg)
            toast.success('Se agregó correctamente')
            
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
        addProduct
    }
}
