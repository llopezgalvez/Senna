'use strict'
import Product from '../Product/product.model.js'
import Account from '../Account/account.model.js'
import Purchase from './purchase.model.js'
import User from '../User/user.model.js'

export const buyProduct = async (req, res) => {
    try {
        let author = req.user._id
        let { idProduct } = req.body

        let profile = await User.findById(author)
        let product = await Product.findById(idProduct)
        let account = await Account.findById({_id: profile.accountNumber})
        console.log(account.balance)
        console.log(req.body)

        if (!profile) return res.status(404).send({ msg: 'Necesitas iniciar sesión para poder comprar un producto o servicio' })
        if (!product) return res.status(404).send({ msg: 'El producto o servicio ya no está disponible' })

        if (account.balance < product.price) return res.status(400).send({ msg: 'Fondos insuficientes' })

        let fecha = new Date()
        let day = fecha.getDate()
        let month = fecha.getMonth() + 1 // Meses en JavaScript van de 0 a 11
        let year = fecha.getFullYear()
        let hour = fecha.getHours()
        let minutes = fecha.getMinutes()

        let dateBuy = `${day}/${month}/${year} ${hour}:${minutes}`

        let newBalance = account.balance - product.price

        let purchase = new Purchase({
            userAccount: author,
            product: idProduct,
            date: dateBuy
        })
        await purchase.save()

        await Account.findByIdAndUpdate(
            profile.accountNumber, // Aquí se corrige la referencia al ObjectId
            {
                $push: { purchase: purchase._id },
                $set: { balance: newBalance }
            }
        )
        return res.status(200).send({ msg: 'Tu compra se ha realizado exitosamente' })
    } catch (error) {
        console.error('Error in buyProduct:', error) // Añadir un log de error para depuración
        return res.status(500).send({ msg: 'Error in function buyProduct', error: error.message }) // Enviar el mensaje de error
    }
}