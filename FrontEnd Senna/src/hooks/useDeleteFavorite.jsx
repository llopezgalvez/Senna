import { deleteFavoriteReq } from "../services/api";
import toast from 'react-hot-toast';

export const useDeleteFavorite = () => {
    const deleteFavorite = async (fav) => {
        try {
            const response = await deleteFavoriteReq(fav)
            if (response.error) {
                toast.error('Error al eliminar favorito')
            } else {
                toast.success('Favorito eliminado correctamente')
            }
        } catch (error) {
            toast.error('Error al eliminar favorito')
            console.error('Error:', error)
        }
    }
    return {
        deleteFavorite
    }
}
