import { Request, Response } from "express";
import Order from "..//model/ordersSchema";



const create = async(req: Request, res: Response) => {
    const body = req.body
    try{
        const order = new Order({user: req.user.id, ...body});
        if(!order) return res.status(400).send("Error creating order");
        await order.save();

        return res.status(201).send({
            ok: true,
            order
        })

    }catch(err){
        console.error(err);
        return res.status(500).send({
            err,
            message: err.message
        })
    }
}

export {
    create
}