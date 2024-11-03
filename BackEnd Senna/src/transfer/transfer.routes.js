import { Router } from "express";
import { test, transfer, listTransfer } from "./trasnfer.controller.js";
import {validateJwt} from '../middlewares/validate-jwt.js'

const api = Router()

api.get('/test', test)
api.post('/transfer',[validateJwt],transfer)
api.get('/list',[validateJwt], listTransfer)
export default api