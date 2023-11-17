import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.TOKEN_ACCESS_SECRET, (err, data) => {
            if (err) {
                res.status(401).json({ message: 'token is not valid' });
            }
            next();
        });
    } else {
        res.status(401).json({ message: 'token is not valid' });
    }
};

export default verifyToken;
