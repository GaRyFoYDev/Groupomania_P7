const {User, Post, sequelize}  = require('../models/');
const fs = require("fs");

exports.createPost = async (req,res) => {

    const image = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : "";
    
    const {userUuid, body} = req.body;
   
    try {

        const user = await User.findOne({where: {uuid: userUuid}})
        const post = await Post.create({body, image, userId : user.id})
    
        return res.status(201).json(post)

    } catch (error) {
        return res.status(500).json(error)
    }
}

exports.getAllPosts = async(req, res) => {

    try {
       
        const posts = await Post.findAll({
           attributes: ['uuid','body', 'image', [sequelize.fn('DATE_FORMAT', sequelize.col('Post.createdAt'), "%d-%m-%Y à %H:%i"),"createdAt" ]],
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
        

        const user = await Post.findOne({where: {uuid :req.params.uuid}});
        return res.status(200).json(user);
        
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
            return res.status(400).json({message: "Aucun post trouvé !"});
        }
        else{
              const user = await User.findOne({where: {uuid : userUuid}})

                if(user.id  === post.userId || user.role === 'admin'){
                 const file = post.image.split("/images/")[1];
                 fs.unlink(`images/${file}`, () => {
                     Post.destroy({where: {uuid : postUuid}});
                    });

                return res.status(200).json({message: "Post supprimé !"})

                 }else{
                    return res.status(403).json({message: 'Accès refusé'})
                }
        
             }
        
             
                 
             
    }catch (error) {
        return res.status(500).json(error)
    }
}


  