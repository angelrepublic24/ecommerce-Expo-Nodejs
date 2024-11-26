import express from 'express';
import { createProduct, deleteProduct, getProductById, getProductbyUserId, listProducts, updateProduct } from '../../controllers/productController.js';
import { validateData } from '../../middlewares/validationMiddleware.js';
import { z } from 'zod';
import { authorization, verifyToken } from '../../middlewares/authentication.js';
 const router = express.Router();

 const createProductSchema = z.object({
    name: z.string(),
    price: z.number({message: 'Price should be a number'}),
 })


 router.get('/', listProducts)
 router.get('/:id', getProductById)
 router.get('/:userId', getProductbyUserId)
 router.post('/', [verifyToken, authorization(['admin', 'seller']), validateData(createProductSchema)], createProduct)
 router.put('/:id', [verifyToken, authorization(['admin', 'seller'])], updateProduct)
 router.delete('/:id', [verifyToken, authorization(['admin', 'seller'])], deleteProduct)





 export default router;