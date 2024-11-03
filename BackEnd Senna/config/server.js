'use strict'

// Importaciones necesarias para el funcionamiento del servidor
import express from 'express' // Importando el framework Express
import cors from 'cors' // Importando middleware CORS para manejar Cross-Origin Resource Sharing
import helmet from 'helmet' // Importando Helmet para asegurar las aplicaciones Express estableciendo varios encabezados HTTP
import morgan from 'morgan' // Importando Morgan para registrar las solicitudes HTTP
import { config } from 'dotenv' // Importando dotenv para cargar variables de entorno desde un archivo .env
import User from '../src/User/user.model.js' // Importando el modelo User
import { encrypt } from '../src/utils/validator.js' // Importando la función encrypt de validator.js para cifrar contraseñas
import userRoutes from '../src/User/user.routes.js' // Importando las rutas de usuario
import depositRoutes from '../src/Deposit/deposit.routes.js' // Importando las rutas de depósito
import transferRoutes from '../src/Transfer/transfer.routes.js'; // Asegúrate de que la ruta y el nombre del archivo sean correctos
import favoriteRoutes from '../src/Favorite/favorite.routes.js'; // Revisa que la ruta y el nombre del archivo sean correctos
import productRoutes from '../src/Product/product.routes.js'
import purchaseRoutes from '../src/purchase/purchase.routes.js'




// Configuraciones del servidor
const server = express() // Inicializando el servidor Express
config() // Cargando variables de entorno
const port = process.env.PORT || 3200 // Usando el puerto de las variables de entorno, o por defecto 3200 si no está disponible

// Configurando middleware para el servidor
server.use(express.urlencoded({ extended: false })) // Analizando cuerpos URL-encoded (enviados por formularios HTML)
server.use(express.json()) // Analizando cuerpos JSON (enviados por clientes de API)
server.use(cors()) // Permitiendo o negando solicitudes de diferentes orígenes (local/remoto)
server.use(helmet()) // Aplicando mejores prácticas de seguridad estableciendo encabezados HTTP
server.use(morgan('dev')) // Registrando solicitudes HTTP en formato 'dev'
server.use('/user', userRoutes) // Usando rutas de usuario
server.use('/deposit', depositRoutes) // Usando rutas de depósito
server.use('/transfer', transferRoutes) //Usando rutas de transfer
server.use('/favorite', favoriteRoutes) // Usando rutas de favorite
server.use('/product', productRoutes) // Usando rutas de product
server.use('/purchase', purchaseRoutes) //Usando rutas de purchase





/**
 * Función para crear un usuario ADMIN
 */
const adminUser = async () => {
    try {
        // Crear una nueva instancia de User con el rol ADMIN
        const newAdmin = new User({
            name: 'Pandilla Momera',
            username: 'ADMINB',
            dpi: '1425364758693',
            address: '123 Main Street',
            phone: '98653212',
            email: 'pmomera@gmail.com',
            password: 'Adminb4!', // Contraseña en texto plano para ser cifrada
            workingName: 'Student',
            monthlyIncome: '10000000',
            ROL: 'ADMIN'
        })

        // Cifrar la contraseña antes de guardar
        newAdmin.password = await encrypt(newAdmin.password)

        // Verificar si un admin con el mismo DPI ya existe en la base de datos
        let adminExists = await User.findOne({ dpi: newAdmin.dpi })

        // Si el admin ya existe, registrar un mensaje y salir
        if (adminExists) return console.log('Admin already exists')

        // Guardar el nuevo usuario admin en la base de datos
        await newAdmin.save()
        console.log('ADMIN user created successfully')
    } catch (error) {
        console.error('Error creating ADMIN user', error)
    }
}

/**
 * Inicializar el servidor y crear el usuario admin
 */
export const initServer = async () => {
    await adminUser() // Llamar a la función adminUser para crear el usuario admin
    server.listen(port, () => {
        console.log(`HTTP Server running on port ${port}`) // Registrar el estado de ejecución del servidor y el puerto
    })
}