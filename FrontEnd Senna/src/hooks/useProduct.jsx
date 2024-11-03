import { useState, useEffect } from "react";
import { getProductReq } from "../services/api";

export const useProduct = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

    const fetchProducts = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await getProductReq()
            setIsLoading(false)
            if (response.error) {
                setError(response.error)
                console.error("Error al obtener productos:", response.error);
            } else if (Array.isArray(response.data.products)) {
                setProducts(response.data.products)
            } else {
                setError('No se encontraron productos')
                console.error('No se encontraron productos', response)
            }
        } catch (err) {
            setIsLoading(false)
            setError('Hubo un error al cargar los productos')
            console.error('Error:', err)
        }
    }

    return { products, isLoading, error, fetchProducts }
}