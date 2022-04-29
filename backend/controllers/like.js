const { User,Post, Like}  = require('../models/');


exports.likePost = async(req, res) => {
    const postUuid = req.params.uuid;
    const {userUuid} = req.body;
    
    try{
        const user =  await User.findOne({where: {uuid: userUuid}});
        const post = await Post.findOne({where: {uuid: postUuid}});

        if(!post) {
            return res.status(404).json({message: "Aucune publication trouvée"})
        }else {

            const like  = await Like.findOne({where: {postId: post.id, userId: user.id}})
    
          
    
            if(like){
                await Like.destroy({where: {userId: user.id, postId: post.id}});
                await Post.update({likes: post.likes - 1}, {where: {uuid: postUuid}})
    
                const postUpdateDislike = await Post.findOne({where: {uuid: postUuid}});
                return res.status(200).json({postUpdateDislike, message: "l'utilisateur a dislike le post"})
            }else{
                 await Like.create({
                    userId: user.id,
                    postId: post.id
                });
    
                await Post.update({likes: post.likes + 1}, {where: {uuid: postUuid}});
                
                const postUpdatelike = await Post.findOne({where: {uuid: postUuid}});
                return res.status(201).json({postUpdatelike, message: "L'utilisateur a like le post"})
    
            }

        }
    }catch(error){
        return res.status(500).json(error)
    }
}