import { Router } from "express";
import { addFavorite, listMyFavorites, deleteFavorite, updateFavorite, searchFavorite } from "./favorite.controller.js";
import { validateJwt } from "../middlewares/validate-jwt.js";

const api = Router()

api.post('/addFavorite', [validateJwt], addFavorite)
api.get('/listFavorites', [validateJwt], listMyFavorites)
api.delete('/deleteFavorite/:id', [validateJwt], deleteFavorite)
api.put('/updateFavorite/:id', [validateJwt], updateFavorite)
api.post('/searchFavorite', [validateJwt], searchFavorite)

export default api