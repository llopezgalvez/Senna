import { compare, hash } from 'bcrypt' // Importa las funciones compare y hash de bcrypt para encriptar y verificar contraseñas

/**
 * Función para encriptar una contraseña.
 * @param {string} password - La contraseña a encriptar.
 * @returns {Promise<string|Error>} - La contraseña encriptada o un error si la encriptación falla.
 */
export const encrypt = async (password) => {
    try {
        // Encripta la contraseña con un factor de trabajo de 10
        return await hash(password, 10)
    } catch (error) {
        console.log(error) // Registra cualquier error que ocurra durante el proceso de encriptación
        return error // Retorna el error si hubo algún problema
    }
}

/**
 * Función para verificar una contraseña.
 * @param {string} password - La contraseña proporcionada por el usuario.
 * @param {string} hashedPassword - La contraseña encriptada almacenada.
 * @returns {Promise<boolean|Error>} - Retorna true si la contraseña coincide, de lo contrario retorna false o un error si la verificación falla.
 */
export const checkPassword = async (password, hashedPassword) => {
    try {
        // Compara la contraseña proporcionada con el hash almacenado
        return await compare(password, hashedPassword)
    } catch (error) {
        console.log(error) // Registra cualquier error que ocurra durante el proceso de verificación
        return error // Retorna el error si hubo algún problema
    }
}