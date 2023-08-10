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
            req.flash('success',"Comment added.")
            res.redirect('/')
        }
    } catch (err) {
        req.flash('error',"You can't delete this comment.")
        return res.redirect('back')
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
                    await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, { new: true })
                    req.flash('success',"Comment deleted.")
                    return res.redirect('back')
                } else {
                    req.flash('error',"You are not authorized to delete the comment.")
                    return res.redirect('back')
                }
    } catch (err) {
        req.flash('error',"You can't delete this comment.")
        return res.redirect('back')
    }
}

export default {
    createComment, destroy
}