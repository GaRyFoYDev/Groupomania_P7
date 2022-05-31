const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('../middleware/cloudinary');
const fs = require("fs");

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
        
        if(error.errors[0].message == 'email must be unique'){
            return res.status(409).json({message: "email must be unique"})
        }
        return res.status(500).json(error.errors)
    }};


    // Connection à l'application avec création du token JWT
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
          token: jwt.sign({ userUuid: user.uuid },process.env.SECRET, {expiresIn : '24h'}),
        });
            
    }catch (error) {
        return res.status(500).json(error); 
    }

};




// Récupération de tous les utilisateurs
exports.getAllUsers = async (req, res) =>{
    try {
        const users = await User.findAll({attributes: ["uuid", "nom", "prenom","role", "image"]})
        return res.status(200).json(users);
        
    } catch (error) {
        
        return res.status(500).json(error)
    }
    
}


// Récupération d'un utilisateur
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


// Mis à jour de l'image de profil
exports.updateProfil = async(req, res) => {

    const userUuid = req.params.uuid;
   
    try {

        const user = await User.findOne({where: {uuid: userUuid}})

        if(!user){
            return res.status(404).json({message: "Aucun utilisateur trouvée !"});

        } else{
    
                 const result = await cloudinary.uploader.upload(req.file.path);
                 const image = await result.secure_url;

                  await User.update({image: image, image_id: result.public_id}, {where: {uuid : userUuid}});
                  cloudinary.uploader.destroy(user.image_id);

                  fs.unlink(req.file.path , () => {
          
                    console.log('ok');
                });

                  return res.status(200).json({message: "Image de profil modifiée avec succès !"})
    
                   }
    
        

    } catch (error) {
        return res.status(500).json(error)
    }
}


// Suppression d'un utilisateur
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