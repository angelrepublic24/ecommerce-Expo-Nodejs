import jwt from 'jsonwebtoken';
const verifyToken = (req, res, next) => {
    if (!req.headers.authorization)
        res.status(403).send({ message: 'The header is missing' });
    const token = req.header('Authorization');
    if (!token)
        res.status(403).send({ message: 'The token not provided' });
    try {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err)
                res.status(401).send({ message: 'The token is invalid' });
            if (!decoded && !decoded.user)
                res.status(401).send({ message: 'Invalid token payload', });
            console.log(decoded);
            req.user = decoded.user;
            next();
        });
    }
    catch (e) {
        return res.status(500).send({
            ok: false,
            e,
            message: 'An error occurred during token verification'
        });
    }
};
const authorization = (roles) => {
    return (req, res, next) => {
        const userRole = req.user?.role;
        console.log(userRole);
        if (!userRole)
            return res.status(403).send({ message: 'User does not exist' });
        if (!roles.includes(userRole))
            return res.status(403).send({ message: 'Access denied' });
        next();
    };
};
export { verifyToken, authorization };
