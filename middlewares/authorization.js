const jwt = require('jsonwebtoken');

const authGuard = (req, res, next) => {
    const { authorization } = req.headers;
    const {token} = req.cookies;
    console.log("token");
    console.log(token);
    console.log("authorization");
    console.log(authorization)
    console.log("req.headers.cookie");
    console.log(req.headers.cookie)
    if(!token)
        res.status(400).send("No tiene permisos para usar este recurso");
        
        req.jws_payload = jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) return res.status(403).json({ message: "Invalid token"}) ;   
            
            req.user = user
            console.log("req.user = user");
            console.log(req.user);
            next();
        })
/*     if(!authorization) {
        res.status(400).send("No tiene permisos para usar este recurso");
        }else {
            const token = authorization.split(' ')[1];
            console.log("token generado");
            console.log(token)
            req.jws_payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
            next();
        }  */
        
    };

module.exports = authGuard;