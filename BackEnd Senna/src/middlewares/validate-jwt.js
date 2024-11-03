'use strict' // Aplica el modo estricto para ayudar a detectar errores comunes de codificación

import jwt from 'jsonwebtoken' // Importa la biblioteca JSON Web Token
import User from '../User/user.model.js' // Importa el modelo de usuario

/**
 * Middleware para validar el JSON Web Token (JWT).
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @param {Function} next - La función para pasar al siguiente middleware.
 */
export const validateJwt = async (req, res, next) => {
    try {
        // Obtener la clave secreta de las variables de entorno o usar un valor predeterminado
        const secretKey = process.env.SECRET_KEY || '@LlaveDeAccesoAlProgramaPD4@'
        // Extraer el token de los encabezados de la solicitud
        const { token } = req.headers

        // Verificar si el token está presente
        if (!token) return res.status(401).send({ msg: 'No autorizado' })

        // Verificar el token y extraer el ID de usuario (uid)
        const decoded = jwt.verify(token, secretKey, { algorithms: ['HS256'] })
        const { uid } = decoded

        // Buscar al usuario por su ID
        const user = await User.findOne({ _id: uid })

        // Verificar si el usuario existe
        if (!user) return res.status(404).send({ msg: 'Usuario no encontrado - No autorizado' })

        // Adjuntar el usuario al objeto de solicitud y proceder al siguiente middleware
        req.user = user
        next()
    } catch (error) {
        console.log(error) // Registrar el error para depuración
        return res.status(401).send({ msg: 'Token inválido o expirado' })
    }
}

/**
 * Middleware para verificar si el usuario tiene rol de administrador.
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 * @param {Function} next - La función para pasar al siguiente middleware.
 */
export const isAdmin = async (req, res, next) => {
    try {
        // Extraer el rol y el nombre de usuario del objeto de solicitud del usuario
        const { ROL, username } = req.user

        // Verificar si el rol del usuario es ADMIN
        if (!ROL || ROL !== 'ADMIN') return res.status(403).send({ msg: `No tienes acceso ${username}` })

        // El usuario tiene rol de administrador, proceder al siguiente middleware
        next()
    } catch (error) {
        console.log(error) // Registrar el error para depuración
        return res.status(401).send({ msg: 'Error al verificar el rol' })
    }
}