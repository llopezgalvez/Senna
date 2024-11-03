import {Router} from 'express'
import { buyProduct } from './purchase.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'

const api = Router()

api.post('/buyProduct', [validateJwt], buyProduct)

export default api