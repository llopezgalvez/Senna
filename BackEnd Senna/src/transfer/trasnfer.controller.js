'use strict'
import Transfer from './transfer.model.js'
import User from '../User/user.model.js'
import Account from '../Account/account.model.js'

export const test = (req, res) => {
    try {
        return res.send({ message: 'Transfer running...' })
    } catch (error) {

    }
}

export const transfer = async (req, res) => {
    try {
        let data = req.body
        let { id } = req.user

        // Buscar el usuario
        let user = await User.findOne({ _id: id })

        // Buscar la cuenta del usuario
        let account = await Account.findOne({ _id: user.accountNumber })
        if (!account) {
            return res.status(404).send({ message: 'Necesitas iniciar sesión para realizar una transferencia' })
        }

        // Buscar la cuenta del destinatario
        let desAccount = await Account.findOne({ accountNumber: data.transferAccount })
        if (!desAccount) return res.status(404).send({ message: 'Cuenta del destinatario no encontrada' })

        if (account.balance === 0 || account.balance < data.amount) {
            return res.send({ message: 'Fondos insuficientes' })
        }

        if (data.amount > 2000) {
            return res.send({ message: 'No puedes transferir más de Q 2,000.00' })
        }

        // Obtener la fecha actual en formato DD/MM/YYYY
        let today = new Date()
        let day = String(today.getDate()).padStart(2, '0')
        let month = String(today.getMonth() + 1).padStart(2, '0')
        let year = today.getFullYear()
        let todayString = `${day}/${month}/${year}`

        // Buscar todas las transferencias del usuario en el día actual
        let transfersToday = await Transfer.find({
            userAccount: account._id,
            date: { $regex: new RegExp(`^${todayString}`) } // Usar regex para buscar por fecha
        })

        // Sumar las cantidades de las transferencias de hoy
        let totalTransferredToday = transfersToday.reduce((total, transfer) => total + transfer.amount, 0)

        if (totalTransferredToday + data.amount > 10000) {
            return res.send({ message: 'No puedes transferir más de Q 10,000.00 por día' })
        }

        // Crear y guardar la transferencia
        data.userAccount = account._id
        data.amount = parseInt(data.amount)
        data.date = `${todayString} ${today.getHours()}:${today.getMinutes()}`

        let transfer = new Transfer(data)
        await transfer.save()

        // Actualizar el saldo de la cuenta
        let newAmount = account.balance - data.amount
        await Account.findOneAndUpdate(
            { _id: account._id },
            {
                $push: { transfer: transfer._id },
                $set: { balance: newAmount }
            }
        )

        // Actualizar el saldo del destinatario
        let transAmount = desAccount.balance + data.amount
        await Account.findOneAndUpdate({ _id: desAccount._id }, { $set: { balance: transAmount } })

        return res.send({ message: 'Transferencia realizada con éxito' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error during transfer', error })
    }
}

export const listTransfer = async (req, res) => {
    try {
        let trasnfer = await Transfer.findOne({ _id: id })
        if (!transfer) return console.log('trasnfer not exist')
        return res.send(trasnfer)
    } catch (error) {
        console.error(error)
        return console.log('error during print transfer')
    }

}