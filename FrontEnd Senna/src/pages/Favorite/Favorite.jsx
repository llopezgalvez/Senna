import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useFavorite } from '../../hooks/useFavorite'
import { Taskbar } from '../../components/Taskbar/Taskbar'
import { useGetFavorite } from '../../hooks/useGetFavorite'
import { useDeleteFavorite } from '../../hooks/useDeleteFavorite'
import { useUpdateFavorite } from '../../hooks/useUpdateFavorite'
import { CardsF } from '../../components/Cards/CardsF'
import './Favorite.css'

export const Favorite = () => {
  const { favorites, getFavorites, isFetching } = useGetFavorite()
  const { favorite } = useFavorite()
  const { deleteFavorite } = useDeleteFavorite()
  const { updateFav } = useUpdateFavorite()
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    accountNumber: '',
    typeAccount: '',
  })

  //Obtiene los favoritos
  useEffect(() => {
    getFavorites()
  }, [])


  //Eliminar favorito
  const getFavoriteDeleted = async (favId) => {
    const result = await deleteFavorite(favId)
    if (result.error) {
      toast.error('Error al eliminar favorito')
    } else {
      toast.success('¡Favorito eliminado correctamente!')
      await getFavorites()
    }
  }

  //handle para editar
  const handleEdit = (fav) => {
    setEditingId(fav._id)
    setFormData({
      name: fav.name,
      accountNumber: fav.accountNumber,
      typeAccount: fav.typeAccount,
    })
  }

  /*const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        value: value
      }
    }))
  }*/

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, accountNumber, typeAccount } = formData
    if (editingId) {
      const result = await updateFav(editingId, { name, accountNumber, typeAccount })
      if (result.error) {
        toast.error('Error al actualizar favorito')
      } else {
        toast.success('¡Favorito actualizado correctamente!')
        await getFavorites()
        setFormData({
          name: '',
          accountNumber: '',
          typeAccount: '',
        })
        setEditingId(null)
        // Recargar la página después de actualizar el favorito
        window.location.reload()
      }
    } else {
      const result = await favorite(name, accountNumber, typeAccount)
      if (result.success) {
        toast.success('¡Favorito agregado correctamente!')
        await getFavorites()
        setFormData({
          name: '',
          accountNumber: '',
          typeAccount: '',
        })
        // Recargar la página después de agregar un favorito
        window.location.reload()
      } else if (result.error) {
        toast.error(result.error)
      }
    }
  }


  const handleCancel = () => {
    setFormData({
      name: '',
      accountNumber: '',
      typeAccount: '',
    })
    setEditingId(null)
  }


  return (
    <>
      <div className="backgrounds">
        <div className="shapes"></div>
        <div className="shapes"></div>
        <div className="shapes"></div>
        <div className="shapes"></div>
        <div className="shapes"></div>
        <div className="shapes"></div>
      </div>
      <div className='conter'>
        <form id='formsss' onSubmit={handleSubmit}>
          <div>
            <h1 id='fav'>FAVORITOS</h1>
            <input
              type="text"
              placeholder="Nombre"
              id="name"
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Número de cuenta"
              maxLength={20}
              id="accountNumber"
              name='accountNumber'
              value={formData.accountNumber}
              onChange={handleChange}
            />
            <select
              id="typeAccount"
              name='typeAccount'
              value={formData.typeAccount}
              onChange={handleChange}
            >
              <option value="">Seleccione un tipo de cuenta</option>
              <option value="Ahorro">Ahorro</option>
              <option value="Monetaria">Monetaria</option>
            </select>


            <button className='buton' type="submit">{editingId ? 'Guardar' : 'Agregar'}</button>
            {editingId && (
              <button type="button" onClick={handleCancel}>Cancelar</button>
            )}
          </div>
        </form>
        <form id='formFav'>

          {isFetching ? (
            <p>Cargando favoritos...</p>
          ) : favorites && favorites.length > 0 ? (
            <div className="favorites">
              <h2 id='fav'>Mis Favoritos</h2>
              {favorites.map((item) => (
                <div key={item._id} className="favorite-item">
                  <div>
                    <strong>Nombre:</strong> {item.name}
                  </div>
                  <div>
                    <strong>No. de cuenta:</strong> {item.accountNumber}
                  </div>
                  <div>
                    <strong>Tipo de cuenta:</strong> {item.typeAccount}
                  </div>
                  <div className="favorite-actions">
                    <button className='eliminar' onClick={() => getFavoriteDeleted(item._id)}>
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No hay favoritos disponibles.</p>
          )}

        </form>
      </div>

          <CardsF />
      <Toaster />
    </>
  )
}