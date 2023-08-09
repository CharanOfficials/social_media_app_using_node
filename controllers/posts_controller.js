import Post from '../models/post.js'
import Comment from '../models/comment.js'
const post = async function (req, res) {
    try {
        await Post.create({
        content: req.body.content,
        user: req.user._id
    })
    return res.redirect('back')
    } catch (err) {
        console.log("Error", err)
        return
    }
}

const destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id)
        // Id means converting the Object Id into Strings
        if (post.user == req.user.id) {
            post.deleteOne()
            await Comment.deleteMany({ post: req.params.id })
            return res.redirect('back')
        } else {
            res.redirect('back')
        }
    } catch (err) {
        console.log("Error", err)
    }

}

export default {
    post, destroy
}