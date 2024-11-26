import jwt from 'jsonwebtoken';
import express, { NextFunction, Request, Response } from 'express';


const verifyToken = (req: Request, res:Response, next: NextFunction) => {
    if(!req.headers.authorization) res.status(403).send({message: 'The header is missing'})
    const token = req.header('Authorization');

    if(!token) res.status(403).send({message: 'The token not provided'})

    try{
        jwt.verify(token, process.env.SECRET_KEY as string, (err, decoded: any) => {
            if(err) res.status(401).send({message: 'The token is invalid'})
            if(!decoded && !decoded.user) res.status(401).send({message: 'Invalid token payload',})

            console.log(decoded)
            req.user = decoded.user!
            next();
            
        })

    } catch(e){
        return res.status(500).send({
            ok: false,
            e,
            message: 'An error occurred during token verification'
        });
    }

    
}

const authorization = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.user?.role;
        console.log(userRole);

        if(!userRole) return res.status(403).send({message: 'User does not exist'});
        if(!roles.includes(userRole)) return res.status(403).send({message: 'Access denied'});

        next();
    }
}

export{
    verifyToken,
    authorization
}