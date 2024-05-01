function authentifier(req, res, next) {
    let res_authen = validerAuthen(req);

    if (res_authen.erreur !== 0) {
        let err = new Error(res_authen.msg);
        err.status = 401;
        return next(err)
    }

    next();
}

function validerAuthen(req) {
    const authheader = req.headers.authorization;
    console.log(req.headers);

    if (authheader === undefined)
        return { erreur: 1, msg: "Entête authorization absente"};

    const auth = authheader.split(' ')[1].split(':');
    const user = auth[0];
    const pass = auth[1];
    console.log(auth);
    console.log(user);
    console.log(pass);
 
    if (user !== 'admin' || pass !== 'password')
        return { erreur: 1, msg: "username / password invalide"};
    
    return { erreur: 0, msg: "username / password validés"};
}

module.exports = {
    authentifier,
    validerAuthen
};