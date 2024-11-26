import {Router} from 'express';
import {create, login} from '../controllers/userController.js'
import { z } from 'zod';
import { validateData } from '../middlewares/validationMiddleware.js';

const router = Router();

const createUserSchema = z.object({
    name: z.string(),
    lName: z.string(),
    email: z.string(),
    password: z.string(),
 })


router.post('/register', validateData(createUserSchema) ,create)
router.post('/login', login)


export default router;