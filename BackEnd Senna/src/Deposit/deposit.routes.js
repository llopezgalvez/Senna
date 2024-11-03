'use strict'
import express from 'express'
import { newDeposit } from './deposit.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'

// Inicializa el enrutador de Express
const api = express.Router()

/**
 * @route POST /newDeposit
 * @desc Crear un nuevo depósito
 * @access Privado
 */
api.post('/newDeposit', validateJwt, newDeposit)

export default api