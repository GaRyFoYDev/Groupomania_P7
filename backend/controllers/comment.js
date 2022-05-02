const { Post, User, Comment, sequelize}  = require('../models/');

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
exports.getAllComments = async(req, res) => {

    try {
       
        const comments = await Comment.findAll({
           attributes: ['uuid','body','username', [sequelize.fn('DATE_FORMAT', sequelize.col('Comment.createdAt'), "%d-%m-%Y à %H:%i"),"createdAt" ]],
           order: [["createdAt", "DESC"]], 
           include: [{model: Post, as: 'post', attributes: ['uuid']}]
          }
          );
          
      
        return res.status(200).json(comments);
        
    } catch (error) {
        return res.status(500).json({error})
    }
}