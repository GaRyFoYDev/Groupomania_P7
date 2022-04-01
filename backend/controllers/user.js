const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const {User}  = require('../models/')

// Création d'un compte utilisateur avec hach du mot de passe
exports.signup = async (req, res) => {
try {  
    const {password}  = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        password: hash
    }); 
    return res.status(201).json(user)

} catch (error) {

    return res.status(500).json(error)
}};


exports.login = async (req, res) => {
    
    try {
        const user = await User.findOne({where : {email : req.body.email} });
       
        if (!user)
        {
            return res.status(401).json({ error: "Cette utilisateur n'existe pas" })
        }
            const match = await bcrypt.compare(req.body.password, user.password);
        
        if( match == false ){
            return res.status(401).json({ error : "Mot de passe erroné" });
         }
                
        return res.status(200).json({ 
          userId: user.id,
          token: jwt.sign({ userId: user.id }, process.env.SECRET, {expiresIn : '24h'})
        });
            
    }catch (error) {
        return res.status(500).json(error); 
    }

};

exports.updatePassword = async (req, res) => {
    
    try {
        const {newpassword}  = req.body;
        const user = await User.findOne({where : {id : req.params.id}});
        const newHash = await bcrypt.hash(newpassword, 10); 
         User.update({password : newHash},{where: {id : user.id}});
           
           return res.status(200).json(user)
        }catch (error) {
        return res.status(500).json(error); 
    }

}




