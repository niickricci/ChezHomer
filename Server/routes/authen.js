const { Router } = require('express');
const authen = require('../authentification');

const authenRoutes = Router();

authenRoutes.get('/', (req, res) => {
    console.log("authentification");

    let res_authen = authen.validerAuthen(req);

    if (res_authen.erreur !== 0) {
        res.status(401).send({ erreur: 1, msg: res_authen.msg});
        return;
    }

    res.json({
        prénom: "Bart",
        nom: "Simpson"
    });
});

module.exports = authenRoutes;
