import Post from '../models/post.js'
import Comment from '../models/comment.js'
const post = async function (req, res) {
    try {
        await Post.create({
        content: req.body.content,
        user: req.user._id
        })
    req.flash('success', 'Post published.')
    return res.redirect('back')
    } catch (err) {
        req.flash('error', err)
        return res.redirect('back')
    }
}

const destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id)
        // Id means converting the Object Id into Strings
        if (post.user == req.user.id) {
            post.deleteOne()
            await Comment.deleteMany({ post: req.params.id })
            req.flash('success', 'Post and associated comments deleted.')
            return res.redirect('back')
        } else {
            req.flash('error', "You can't delete this post.")
            res.redirect('back')
        }
    } catch (err) {
        req.flash('error',"You can't delete this post.")
        res.redirect('back')
    }

}

export default {
    post, destroy
}