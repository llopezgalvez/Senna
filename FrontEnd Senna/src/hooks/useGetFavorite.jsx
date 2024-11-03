import { useState } from "react";
import { getFavoriteReq } from "../services/api";
import { toast } from "react-hot-toast";

export const useGetFavorite = () => {
  const [favorites, setFavorites] = useState(null);

  const getFavorites = async () => {
    try {
      const response = await getFavoriteReq();
      if (response.error) {
        if (response?.err?.response?.data?.errors) {
          const errors = response?.err?.response?.data?.errors;
          errors.forEach((error) => {
            toast.error(error.msg);
          });
        } else {
          toast.error(
            response?.err?.response?.data?.msg ||
              response?.err?.data?.msg ||
              "Error al obtener los favoritos. Inténtalo de nuevo."
          );
        }
        return;
      }
      console.log("Favoritos obtenidos:", response.data.favorites);
      setFavorites(response.data.favorites);
    } catch (error) {
      console.error("Error en la solicitud de favoritos:", error);
      toast.error(
        "Error en la solicitud de favoritos. Por favor, intenta de nuevo."
      );
    }
  };

  return {
    favorites,
    isFetching: !favorites,
    getFavorites,
  };
};
