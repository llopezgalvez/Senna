'use strict'
import Deposit from './deposit.model.js' // Importa el modelo de depósito
import User from '../User/user.model.js' // Importa el modelo de usuario
import Account from '../Account/account.model.js' // Importa el modelo de cuenta

/**
 * Función para realizar un nuevo depósito.
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 */
export const newDeposit = async (req, res) => {
    try {
        // Obtener el ID del autor desde el token de usuario
        let author = req.user._id
        // Obtener los datos del cuerpo de la solicitud
        let data = req.body

        // Buscar el perfil del usuario autor y poblar el número de cuenta
        let profile = await User.findById(author).populate('accountNumber')
        if (!profile) return res.status(404).send({ msg: 'Debes estar logueado' })
        if (!data) return res.status(409).send({ msg: 'Por favor ingresa todos los parámetros' })

        
        // Buscar la cuenta del receptor por su número de cuenta
        let receiverAccount = await Account.findOne({ accountNumber: data.receiver })
        if (!receiverAccount) return res.status(404).send({ msg: 'El receptor no existe' })

        // Convertir los montos a números
        let depositAmount = Number(data.amount)
        if (isNaN(depositAmount)) return res.status(400).send({ msg: 'Monto de depósito inválido' })

        // Actualizar los saldos de las cuentas
        receiverAccount.balance = Number(receiverAccount.balance) + depositAmount

        // Guardar las cuentas actualizadas
        await receiverAccount.save()

        // Crear y guardar el nuevo depósito
        data.date = new Date()
        data.receiver = receiverAccount._id

        let newDeposit = new Deposit(data)
        await newDeposit.save()

        // Añadir referencia del depósito a las cuentas

        await receiverAccount.save()

        return res.status(200).send({ msg: 'El depósito fue exitoso' })
    } catch (error) {
        return res.status(500).send({ msg: 'Error en la función newDeposit', error: error.message })
    }
}