import Comment from '../models/comment.js'
import Post from "../models/post.js"
import commentsMailer from '../mailers/comments_mailer.js'
import commentEmailWorker from '../workers/comment_email_worker.js'
import queue from '../config/kue.js'
import Like from '../models/like.js'

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
            await comment.populate({
                path: 'user',
                select: '-password'
            })
            // save is used to put it in the database
            let job = queue.create('emails', comment).save(function (err) {
                if (err) {
                    console.log("Error in sending the job to the queue", err)
                    return
                }
                return
            })
            // commentsMailer.newComment(comment)
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment: comment,
                        user: req.body.userid
                    },
                    message: "Post created!"
                });
            }

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
                    await Like.deleteMany({likeable: comment._id, onModel:'Comment'})
                    // send the comment id which was deleted back to the views
                    if (req.xhr){
                        return res.status(200).json({
                            data: {
                                comment_id: req.params.id
                            },
                            message: "Post deleted"
                        });
                    }

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