import Comment from '../models/comment.js'
import Post from "../models/post.js"
const createComment = async function (req, res) {
    try {
        let post = await Post.findById(req.body.postid)
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.postid,
                user: req.user._id
            })
            post.comments.push(comment)
            post.save()
            res.redirect('/')
        }
    } catch (err) {
        console.log("Error", err)
    }
}

const destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id)
        let postId = comment.post
        let post = await Post.findById(postId)  // To check whether post belongs to the logged in Usr so that they can delee the coments done by soe other user as well
            .populate('user')  // Populate user stored in Post
            let postUser = post.user
                // .id is used for converting the _id in String before comparison
                if ((comment.user == req.user.id) || (postUser._id == req.user.id)) {
                    await comment.deleteOne()
                    await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, {new: true})
                    return res.redirect('back')
                } else {
                    return res.status(500).send("Unauthorized")
                }
    } catch (err) {
        console.log("Error", err)
        return
    }
}

export default {
    createComment, destroy
}