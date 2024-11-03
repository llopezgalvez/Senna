import { useState } from "react";
import { buyProductReq } from "../services/api.js";
import toast from 'react-hot-toast';

export const useBuyProduct = () => {
  const [isLoading, setIsLoading] = useState(false);

  const buyProduct = async (idProduct) => {
    setIsLoading(true);
    try {
      console.log('id del hook: ' + idProduct);
      const response = await buyProductReq(idProduct);
      
      // Aquí verificamos la respuesta exitosa
      if (response.status === 200) {
        toast.success('Producto comprado exitosamente');
      } else {
        // Manejo de otros casos, por ejemplo, mostrar un mensaje de error del servidor
        toast.error(response.message || 'Error en la compra del producto');
      }

      setIsLoading(false);
      console.log(response)
      return response;  // Retorna la respuesta para manejarla en el componente
    } catch (error) {
      setIsLoading(false);
      console.error('Error during transfer:', error);
      throw error;  // Re-lanza el error para que pueda ser manejado en el componente
    }
  };

  return {
    isLoading,
    buyProduct
  };
};
