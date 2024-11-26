import { Router } from "express";
import { create } from "../controllers/orderController";
import { verifyToken } from "../middlewares/authentication";

const router = Router();


router.post('/', verifyToken, create)





export default router