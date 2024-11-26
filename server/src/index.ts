import express from "express";
import productRouter from "./routes/products/product.js";
import userRouter from "./routes/users.js"
import orderRouter from "./routes/orders.js"

import { connection } from "./db/conecction.js";
import serverless from "serverless-http";


const app = express();
const port = 3000
connection()

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use('/products', productRouter);
app.use('/auth', userRouter);
app.use('/order', orderRouter);


// if (process.env.NODE_ENV === "dev") {
    app.listen(port, () => {
        console.log(`Port running on ${port}`);
    })
//}

export const handler = serverless(app);

