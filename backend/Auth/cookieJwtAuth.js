import jwt from 'jsonwebtoken';

export const cookieJwtAuthentication = (req, res, next) => {
    const token = req.cookies.token;
    console.log('token', token);
    
    try {
        /* @MassinS
            !modified 
                * extracted only email and id from the token
            ?--written by @lyesrabhi16
         */
        console.log(jwt.verify(token, process.env.JWTSecret));
        const { id, email } = jwt.verify(token, process.env.JWTSecret);
        req.email = email;
        req.matricule = id;
        // Autoriser les credentials
        res.set('Access-Control-Allow-Credentials', 'true');
        next();
    } catch {
        console.log("unauthorized");
        res.clearCookie('token');
        res.clearCookie('user');
        return res.status(401).redirect("http://localhost:5000");
    }
};
