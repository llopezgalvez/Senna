'use strict'
import express from 'express'
import { 
    register, 
    login, 
    viewProfile, 
    updateMyPassword, 
    updateMyProfile, 
    updateUser, 
    viewAllUsers, 
    deleteMyProfile, 
    viewMyBalance, 
    viewMyAccount,
    viewAllAccounts
} from "./user.controller.js"
import {validateJwt, isAdmin} from '../middlewares/validate-jwt.js'

// Inicializa el enrutador de Express
const api = express.Router()

// --------------------- USER --------------------- 
/**
 * @route POST /register
 * @desc Registrar un nuevo usuario
 * @access Público
 */
api.post('/register', register)

/**
 * @route POST /login
 * @desc Iniciar sesión de un usuario
 * @access Público
 */
api.post('/login', login)

/**
 * @route GET /viewProfile
 * @desc Ver perfil del usuario autenticado
 * @access Privado
 */
api.get('/viewProfile', [validateJwt], viewProfile)

/**
 * @route GET /viewMyBalance
 * @desc Ver balance del usuario autenticado
 * @access Privado
 */
api.get('/viewMyBalance', [validateJwt], viewMyBalance)

/**
 * @route GET /viewMyAccount
 * @desc Ver cuenta del usuario autenticado
 * @access Privado
 */
api.get('/viewMyAccount', [validateJwt], viewMyAccount)

/**
 * @route POST /updateMyPassword
 * @desc Actualizar contraseña del usuario autenticado
 * @access Privado
 */
api.post('/updateMyPassword', [validateJwt], updateMyPassword)

/**
 * @route PUT /updateMyProfile
 * @desc Actualizar perfil del usuario autenticado
 * @access Privado
 */
api.put('/updateMyProfile', [validateJwt], updateMyProfile)

/**
 * @route DELETE /deleteMyProfile
 * @desc Eliminar perfil del usuario autenticado
 * @access Privado
 */
api.delete('/deleteMyProfile', [validateJwt], deleteMyProfile)

// --------------------- ADMIN ---------------------
/**
 * @route PUT /updateUser/:id
 * @desc Actualizar perfil de un usuario (solo admins)
 * @access Privado (Admin)
 */
api.put('/updateUser/:id', [validateJwt, isAdmin], updateUser)

/**
 * @route GET /viewUsers
 * @desc Ver todos los usuarios (solo admins)
 * @access Privado (Admin)
 */
api.get('/viewUsers', [validateJwt, isAdmin], viewAllUsers)

/**
 * @Route GET /viewAllUsers
 * @desc Ver todos los usuarios con su historial (solo admins)
 * @access Privado (Admin)
 */
api.get('/viewAllUsers', [validateJwt, isAdmin], viewAllAccounts)

export default api