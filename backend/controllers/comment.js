const { Post, User, Comment, sequelize}  = require('../models/');



// Création de commentaires
exports.createComment = async (req,res) => {


    const {userUuid, postUuid,body, username} = req.body;
    
   
    try {

        const user = await User.findOne({where: {uuid: userUuid}})
        if(!user){
            res.status(404).json({message: 'Aucun utilisateur trouvé'})
        } 
            const post = await Post.findOne({where: {uuid: postUuid}})

            if(!post){
                res.status(404).json({message: 'Aucune publication trouvée'})
            }
            const comment = await Comment.create({body,username, userId : user.id, postId: post.id})
        
            
            return res.status(201).json({comment, message: 'Publication créée avec succès'})
        
    } catch (error) {
        return res.status(500).json(error)
    }
}


// Récupértation de tous les commentaires
exports.getAllComments = async(req, res) => {

    try {
       
        const comments = await Comment.findAll({
           attributes: ['uuid','body','username', [sequelize.fn('DATE_FORMAT', sequelize.col('Comment.createdAt'), "%d-%m-%Y à %H:%i"),"createdAt" ]],
           order: [["createdAt", "DESC"]], 
           include: [{model: Post, as: 'post', attributes: ['uuid']}, {model: User, as: 'user', attributes: ['uuid','image']}],
          
          }
          );
          
      
        return res.status(200).json(comments);
        
    } catch (error) {
        return res.status(500).json({error})
    }
}

// Suppression des commentaires
exports.deleteComment = async(req, res) => {
    const {userUuid} = req.body
    const commentUuid = req.params.uuid
   
    try {
        const comment = await Comment.findOne({where: {uuid: commentUuid}})

        if(!comment){
            return res.status(404).json({message: "Aucun commentaire trouvé !"});
        }
        else{
             
              const user = await User.findOne({where: {uuid : userUuid}})

                if(user.id  === comment.userId  || user.role === 'admin'){
                
                     Comment.destroy({where: {uuid : commentUuid}});
                    

                return res.status(200).json({message: "Commentaire supprimé avec succès !"})

                 }else{
                    return res.status(403).json({message: 'Accès refusé'})
                }
        
             }
        
             
                 
             
    }catch (error) {
        return res.status(500).json(error)
    }
}