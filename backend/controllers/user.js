const bcrypt = require('bcrypt')

const {User}  = require('../models/')

// Création d'un compte utilisateur avec hach du mot de passe
exports.signup = async (req, res) => {
try {  
    const {mot_de_passe}  = req.body;
    const hash = await bcrypt.hash(mot_de_passe, 10);
    const user = await User.create({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        mot_de_passe: hash
    }); 
    return res.status(201).json(user)

} catch (error) {

    return res.status(500).json(error)
} }