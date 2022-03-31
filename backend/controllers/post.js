const {User, Post}  = require('../models/')

exports.createPost = async (req,res) => {
    const {userId, title, body, attachement} = req.body;
    try {

        const user = await User.findOne({where: {id: userId}})
        const post = await Post.create({ title, body, attachement, userId : user.id})

        return res.status(201).json(post)

    } catch (error) {
        return res.status(500).json(error)
    }
}