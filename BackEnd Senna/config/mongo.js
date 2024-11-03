'use strict' // Aplica el modo estricto para ayudar a detectar errores comunes de codificación
import mongoose from 'mongoose' // Importa la biblioteca mongoose para la interacción con MongoDB

/**
 * Conecta a la base de datos MongoDB usando Mongoose y configura los oyentes de eventos para los eventos de conexión.
 */
export const connect = async () => {
    try {
        // Oyentes de eventos para varios eventos de conexión de mongoose

        /**
         * Se activa si hay un error durante el proceso de conexión.
         * Registra el error y se desconecta para evitar más problemas.
         */
        mongoose.connection.on('error', () => {
            console.log('MongoDB | no se pudo conectar a MongoDB')
            mongoose.disconnect() // Se desconecta para evitar más problemas
        })

        /**
         * Se activa cuando mongoose comienza a intentar conectarse.
         * Registra el intento de conexión.
         */
        mongoose.connection.on('connecting', () => console.log('MongoDB | intentando conectar'))

        /**
         * Se activa cuando mongoose se conecta exitosamente a MongoDB.
         * Registra la conexión exitosa.
         */
        mongoose.connection.on('connected', () => console.log('MongoDB | conectado a MongoDB'))

        /**
         * Se activa cuando mongoose abre una conexión a la base de datos.
         * Registra que la conexión a la base de datos está abierta.
         */
        mongoose.connection.on('open', () => console.log('MongoDB | la conexión a la base de datos está abierta'))

        /**
         * Se activa cuando mongoose se desconecta de MongoDB.
         * Registra el evento de desconexión.
         */
        mongoose.connection.on('disconnected', () => console.log('MongoDB | desconectado de MongoDB'))

        /**
         * Se activa cuando mongoose se reconecta después de una desconexión.
         * Registra el evento de reconexión.
         */
        mongoose.connection.on('reconnected', () => console.log('MongoDB | reconectado a MongoDB'))

        // Intenta conectar a MongoDB usando mongoose
        await mongoose.connect(process.env.URI_MONGO)
        console.log('Conectado a la base de datos')
    } catch (error) {
        // Registra un error si la conexión falla
        console.log('Fallo en la conexión a la base de datos', error)
    }
}