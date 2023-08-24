import Post from '../../../models/post.js'
import Comment from '../../../models/comment.js'
const index = async function (req, res) {
    let posts = await Post.find({})
    .sort('-createdAt')
        .populate({
            path: 'user',
            select: '-password'
        })
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    // let temp = posts
    // delete temp.user.password
    return res.status(200).json ({
        message: "List of posts",
        post:posts
    })
}
    const destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id)
        if (post.user == req.user.id) {
            post.deleteOne()
            await Comment.deleteMany({ post: req.params.id })
            return res.status(200).json({
                message: "Post and associated comments deleted successfully."
            })
        } else {
            return res.status(401).json({
                message: "You can't delete this post."
            })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Internal server error"
        })
    }

}

export default {
    index, destroy
}