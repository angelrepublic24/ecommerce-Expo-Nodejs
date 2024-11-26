import { Request, Response } from "express";
import User from "../model/userSchema.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config()


const listUsers = async(req: Request, res: Response) => {
    const user = await User.findOne();
    return res.send({
        ok: true,
        user
    })

}

const getUserId = (req: Request, res: Response) => {

}

const create = async(req: Request, res: Response) => {
    try{
        const body = req.body;
        let password = await bcrypt.hash(body.password, 12);
        body.password = password
        const user = new User(body)
        await user.save()
        return res.send({
            user
        })
    }catch(err){
       return res.status(400).send({
        err
       }) 
    }
    
}

const login = async(req: Request, res: Response) => {
    try{
        const body = req.body;
        const user = await User.findOne({email: body.email})
        if(!user) return res.status(400).send('Authentication failed');

        const passwordMatch = await bcrypt.compare(body.password, user.password);
        if (!passwordMatch) return res.status(400).send('Authentication failed');

        const secretKey = process.env.SECRET_KEY;
        const tokenExpiration = process.env.LIMIT_TOKEN;

        if (!secretKey || !tokenExpiration) {
            return res.status(500).send('Internal server error: secret key or token expiration not set.');
        }

        const token = jwt.sign({user: {id: user._id, role: user.role } }, secretKey, {expiresIn: "20d"})
        console.log(token)
        
            return res.send({
                ok: true,
                user,
                token,
                message: "User logged in successfully"
            })
        

    }catch(error){
        return res.status(400).send({
            error,
            message: error.message
        })
    }

}

export {
    create,
    login
}