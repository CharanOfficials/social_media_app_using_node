import Post from '../models/post.js'
import Comment from '../models/comment.js'
import { json } from 'express'
import Like from '../models/like.js'
const post = async function (req, res) {
    try {
        let post = await Post.create({
        content: req.body.content,
        user: req.user._id
        })
        await post.populate({
            path: 'user',
            select:'-password'
        })
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: post,
                    user:req.user._id
                },
                message: 'Post created!'
            })
    }
    req.flash('success', 'Post published.')
    return res.redirect('back')
    } catch (err) {
        req.flash('Unable to publish.', err)
        return res.redirect('back')
    }
}

const destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id)
        // Id means converting the Object Id into Strings
        if (post.user == req.user.id) {
            // delete against either the post id or the Post's comments id associated likes
            // to delete the posts like 
            await Like.deleteMany({ likeable: post, onModel: 'Post' })
            // To delete the likes of the comments associated with the posts
            await Like.deleteMany({_id:{$in:Post.comments}})

            post.deleteOne()
            await Comment.deleteMany({ post: req.params.id })
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post_id: req.params.id
                },
                message: "Post deleted successfully."
            });
        }
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