'use strict' // Aplica el modo estricto para ayudar a detectar errores comunes de codificación

import jwt from 'jsonwebtoken' // Importa la biblioteca JSON Web Token

// Clave secreta para firmar el JWT, obtenida de las variables de entorno o usando un valor predeterminado
const secretKey = process.env.SECRET_KEY || '@LlaveDeAccesoAlProgramaPD4@'

/**
 * Función para generar un JSON Web Token (JWT).
 * @param {Object} payload - La carga útil a incluir en el token.
 * @returns {string|Error} - El token generado o un error si la firma del JWT falla.
 */
export const generateJwt = async (payload) => {
    try {
        // Firma el JWT con la carga útil proporcionada y la clave secreta
        return jwt.sign(payload, secretKey, {
            expiresIn: '1h', // El token expira en 1 hora
            algorithm: 'HS256' // Algoritmo de firma HMAC SHA-256
        })
    } catch (error) {
        console.log(error) // Registra cualquier error para depuración
        return error // Retorna el error si la firma del JWT falla
    }
}