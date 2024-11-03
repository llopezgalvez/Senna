import { Router } from "express"
import { validateJwt } from "../middlewares/validate-jwt.js"
import { addProduct, updateProduct, deleteProduct, listProduct } from "./product.controller.js"

const api = Router()

api.post('/addProduct',[validateJwt], addProduct)
api.put('/updateProduct/:id',[validateJwt], updateProduct)
api.delete('/deleteProduct/:id',[validateJwt], deleteProduct)
api.get('/listProduct', listProduct)


export default api 