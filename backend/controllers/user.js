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
            password: hash,
            role: req.body.role,
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
            return res.status(404).json({ error: "Cet utilisateur n'existe pas" })
        }
            const match = await bcrypt.compare(req.body.password, user.password);
        
        if( match == false ){
            return res.status(401).json({ error : "Mot de passe erroné" });
         }
                
        return res.status(200).json({ 
          userUuid: user.uuid,
          token: jwt.sign({ userUuid: user.uuid }, process.env.SECRET, {expiresIn : '24h'}),
        });
            
    }catch (error) {
        return res.status(500).json(error); 
    }

};

exports.getAllUsers = async (req, res) =>{
    try {
        const users = await User.findAll()
        return res.status(200).json(users);
        
    } catch (error) {
        
        return res.status(500).json(error)
    }
    
}

exports.getOneUser = async (req, res) =>{
    try {
        

        const user = await User.findOne({where: {uuid :req.params.uuid}, attributes: ["uuid", "nom","prenom","role","image"]});
        if(!user){
            return res.status(404).json({message: "Aucun utilisateur trouvé"})
        }
        return res.status(200).json(user);
        
    } catch (error) {
        
        return res.status(500).json(error)
    }
    
}





exports.updatePassword = async (req, res) => {
    
    try {

        const {currentPassword, newPassword}  = req.body;
        const userUuid =  req.params.uuid;

        const user = await User.findOne({where : {uuid : userUuid}});

        if (!user)
        {
            return res.status(404).json({ error: "Erreur userUuid" })
        }
            const match = await bcrypt.compare(currentPassword, user.password);
        
        if( match == false ){
            return res.status(401).json({ error : "Mot de passe erroné" });
         }

        const newHash = await bcrypt.hash(newPassword, 10); 
         User.update({password : newHash},{where: {uuid : user.uuid}});
           
        return res.status(200).json({message: "Mot de passe modifié avec succès"})
        }catch (error) {
        return res.status(500).json(error); 
    }

}

exports.updateProfil = async(req, res) => {

    const image = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : req.body.image;
    
    
    const userUuid = req.params.uuid;
   
    try {

        const user = await User.findOne({where: {uuid: userUuid}})

        if(!user){
            return res.status(404).json({message: "Aucune publication trouvée !"});

        } else{
    
                 
                  await User.update({image: image}, {where: {uuid : userUuid}});
                
                  return res.status(200).json({message: "Image de profil modifiée avec succès !"})
    
                   }
    
        

    } catch (error) {
        return res.status(500).json(error)
    }
}

exports.deleteUser = async(req, res) => {
 
    const userUuid = req.params.uuid
   
    try {
              const user = await User.findOne({where: {uuid : userUuid}})

                if(user.uuid  === userUuid || user.role === 'admin'){
               
                     User.destroy({where: {uuid : userUuid}});
                    

                return res.status(200).json({message: "Utilisateur supprimé avec succès !"})

                 }else{
                    return res.status(403).json({message: 'Action interdite'})
                }           
             
    }catch (error) {
        return res.status(500).json(error)
    }
}