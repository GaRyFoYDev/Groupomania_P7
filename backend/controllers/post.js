const {User, Post, sequelize}  = require('../models/');
const fs = require("fs");

exports.createPost = async (req,res) => {

    const image = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : "";
    
    const {userUuid, body} = req.body;
    const likes = 0;
   
    try {

        const user = await User.findOne({where: {uuid: userUuid}})
        const post = await Post.create({body,image,likes, userId : user.id})
    
        return res.status(201).json(post)

    } catch (error) {
        return res.status(500).json(error)
    }
}

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
                 const file = post.image.split("/images/")[1];
                 fs.unlink(`images/${file}`, () => {
                     Post.destroy({where: {uuid : postUuid}});
                    });

                return res.status(200).json({message: "Publication supprimée avec succès !"})

                 }else{
                    return res.status(403).json({message: 'Accès refusé'})
                }
        
             }
        
             
                 
             
    }catch (error) {
        return res.status(500).json(error)
    }
}

exports.updatePost = async(req, res) => {

    const image = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : req.body.image;
    
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
                    
                    const file = post.image.split("/images/")[1];
                    fs.unlink(`images/${file}`, () => {
                        
                    Post.update({ body, image}, {where: {uuid : postUuid}});
                       });
                  
                
                  return res.status(200).json({message: "Publication modifiée avec succès !"})
    
                   }else{
                      return res.status(403).json({message: 'Accès refusé'})
                  }
            }
      
           }
    
        

    } catch (error) {
        return res.status(500).json(error)
    }
}



  