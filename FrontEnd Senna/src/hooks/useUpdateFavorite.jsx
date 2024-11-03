import { useState } from "react";
import { updateFavoriteReq } from "../services/api";
import { toast } from "react-hot-toast";

export const useUpdateFavorite = () => {
    const [updateFavorite, setUpdateFavorite] = useState(null)
    const updateFav = async (id, fav) => {
        const response = await updateFavoriteReq(id, fav)
        if (response.error) {
            toast.error('Error al actualizar favorito')
        }
        setUpdateFavorite(response.data)
        toast.success('Favorito actualizado correctamente')
    }
    return {
        updateFavorite,
        isFetching: !updateFavorite,
        updateFav
    }
}
