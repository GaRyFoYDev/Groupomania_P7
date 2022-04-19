const {User, Post}  = require('../models/')

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