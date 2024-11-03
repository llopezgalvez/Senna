'use strict'

import Favorite from './favorite.model.js'
import User from '../User/user.model.js'

function isNumber(value) {
    return /^\d+$/.test(value)
}

export const addFavorite = async (req, res) => {
    try {
        let userID = req.user.id
        let data = req.body
        let existsFavorite = await Favorite.findOne({ name: data.name })
        if (existsFavorite) return res.status(409).send({ msg: 'Ya existe el nombre de la cuenta' })

        if (data.name == '' || data.accountNumber == '' || data.typeAccount == '') {
            return res.send({ msg: 'Por favor ingrese todos los datos que se le solicita' })
        }

        if (!isNumber(data.accountNumber)) {
            return res.send({ msg: 'Por favor, ingrese solo números en el número de cuenta' })
        }

        if (data.accountNumber.length !== 20) {
            return res.send({ msg: 'Por favor, ingrese un número de cuenta de exactamente 20 dígitos' })
        }

        let favorite = new Favorite({
            ...data,
            user: userID
        })

        await favorite.save()
        return res.status(200).send({ msg: 'Favorito agregado con éxito' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ msg: 'Error en la funcionalidad addFavorite' })
    }
}

export const listMyFavorites = async (req, res) => {
    try {
        let userID = req.user.id
        let favorites = await Favorite.find({ user: userID })
        if (favorites.length == 0) return res.status(404).send({ msg: 'No hay favoritos' })
        return res.status(200).send({ msg: 'My Favorites: ', favorites })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ msg: 'Error en la funcionalidad de listMyFavorites' })
    }
}

export const deleteFavorite = async (req, res) => {
    try {
        let { id } = req.params
        let userID = req.user.id
        let favorite = await Favorite.findOne({ _id: id })
        if (!favorite) return res.status(404).send({ msg: 'No existe favorite' })
        if (favorite.user.toString() !== userID.toString()) return res.send({ msg: 'No puedes eliminar favoritos de otras cuentas' })
        let delFavorite = await Favorite.findOneAndDelete({ _id: id })
        if (!delFavorite) return res.status(500).send({ msg: 'No se pudo eliminar favorito' })
        return res.status(200).send({ msg: 'Favorito eliminado correctamente' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ msg: 'Error en la funcionalidad deleteFavorite' })
    }
}

export const updateFavorite = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let userID = req.user.id

        let favorite = await Favorite.findOne({ _id: id })
        if (!favorite) return res.status(404).send({ msg: 'No existe favorito' })

        if (favorite.user.toString() !== userID.toString()) return res.send({ msg: 'No puedes editar favoritos de otras cuentas' })

        if(data.name == ''){
            return res.send({msg: 'Ingresar el dato a actualizar'})
        }else if(data.accountNumber == ''){
            return res.send({msg: 'Ingresar el dato a actualizar'})
        }else if(data.typeAccount == ''){
            return res.send({msg: 'Ingresar el dato a actualizar'})
        }

        if(data.name){
            let existsFavorite = await Favorite.findOne({ name: data.name })
            if (existsFavorite) return res.status(409).send({ msg: 'Ya existe el nombre de la cuenta' })
        }

        if (data.accountNumber) {
            if (!isNumber(data.accountNumber)) {
                return res.send({ msg: 'Por favor, ingrese solo números en el número de cuenta' })
            }
        }

        if (data.accountNumber) {
            if (data.accountNumber.length !== 20) {
                return res.send({ msg: 'Por favor, ingrese un número de cuenta de exactamente 20 dígitos' })
            }
        }

        let updFavorite = await Favorite.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!updFavorite) return res.status(500).send({ msg: 'No se pudo editar' })
        return res.status(200).send({ msg: 'Se ha actualizado con exito' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ msg: 'Error en la funcionalidad updateFavorite' })
    }
}

export const searchFavorite = async (req, res) => {
    try {
        let { search } = req.body
        let result = await Favorite.find({
            $or: [
                { name: search },
                { typeAccount: search }
            ]
        })
        if (result.length == 0) return res.status(404).send({ msg: 'No hay resultados' })
        return res.status(200).send({ msg: 'Resultados: ', result })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ msg: 'Error en la funcionalidad searchFavorite' })
    }
}