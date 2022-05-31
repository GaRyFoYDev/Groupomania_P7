const {User, Post, sequelize}  = require('../models/');
const cloudinary = require('../middleware/cloudinary')
const fs = require("fs");




// Création d'un post
exports.createPost = async (req,res) => {

    //const image = req.file ? req.file.filename : "";
    
    const {userUuid, body} = req.body;
    const likes = 0;
   
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const user = await User.findOne({where: {uuid: userUuid}})
        const post = await Post.create({
            body,
            image:result.secure_url,
            image_id: result.public_id,
            likes, 
            userId : user.id})

        fs.unlink(req.file.path , () => {
          
            console.log('ok');
        });
       
        return res.status(201).json(post)

    } catch (error) {

        return res.status(500).json(error)
    }
}



// Récupération de tous les posts
exports.getAllPosts = async(req, res) => {

    try {
       
        const posts = await Post.findAll({
           attributes: ['uuid','body', 'image','likes', [sequelize.fn('DATE_FORMAT', sequelize.col('Post.createdAt'), "%d-%m-%Y à %H:%i"),"createdAt" ]],
           order: [["createdAt", "DESC"]], 
           include: [{model: User, as: 'user', attributes: ['uuid','nom', 'prenom', 'image', 'role']}]
          }
          );
          
      
        return res.status(200).json(posts);
        
    } catch (error) {
        return res.status(500).json({error})
    }
}


// Récupération d'un post
exports.getOnePost = async (req, res) =>{
    try {
        
        const post = await Post.findOne({where: {uuid :req.params.uuid}});
        

        if(!post){
            return res.status(400).json({message: "Aucune publication trouvée"})
        }
        return res.status(200).json(post);
        
    } catch (error) {
        
        return res.status(500).json(error)
    }
    
}




// Suppression d'un post
exports.deletePost = async(req, res) => {
    const {userUuid} = req.body
    const postUuid = req.params.uuid
   
    try {
        const post = await Post.findOne({where: {uuid: postUuid}})

        if(!post){
            return res.status(404).json({message: "Aucune publication trouvée !"});
        }
        else{
              const user = await User.findOne({where: {uuid : userUuid}})

                if(user.id  === post.userId || user.role === 'admin'){
                
                await cloudinary.uploader.destroy(post.image_id)
                Post.destroy({where: {uuid : postUuid}})
                 

                return res.status(200).json({message: "Publication supprimée avec succès !"})

                 }else{
                    return res.status(403).json({message: 'Accès refusé'})
                }
        
             }
        
             
                 
             
    }catch (error) {
        return res.status(500).json(error)
    }
}




// Modification d'un post
exports.updatePost = async(req, res) => {

  
    
    const {userUuid, body} = req.body;
    const postUuid = req.params.uuid
   
    try {

        const post = await Post.findOne({where: {uuid: postUuid}})

        if(!post){
            return res.status(404).json({message: "Aucune publication trouvée !"});
        } else{

            if(!body){
                throw `Votre publication n'est pas conforme`

            }else{

                const user = await User.findOne({where: {uuid : userUuid}})
    
                  if(user.id  === post.userId){
                    
                    const result = await cloudinary.uploader.upload(req.file.path);
                    const image = req.file ? result.secure_url : req.body.image;

                    await Post.update({ body, image, image_id: result.public_id}, {where: {uuid : postUuid}});
                    console.log();
                    fs.unlink(req.file.path, () => {
                        console.log('ok');
                    });

                    await cloudinary.uploader.destroy(post.image_id)
                    
          
                
                  return res.status(200).json({message: "Publication modifiée avec succès !", result})
    
                   }else{
                      return res.status(403).json({message: 'Accès refusé'})
                  }
            }
      
           }
    
        

    } catch (error) {
        return res.status(500).json(error)
    }
}



  