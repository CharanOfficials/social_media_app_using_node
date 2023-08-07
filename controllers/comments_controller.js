import Comment from '../models/comment.js'
import Post from "../models/post.js"
const createComment = function (req, res) {
    Post.findById(req.body.postid)
        .then((post) => {
            if (post) {
                Comment.create({
                    content: req.body.content,
                    post: req.body.postid,
                    user: req.user._id
                })
                //     .then((comment) => {
                //     post.comments.push(comment)
                //     post.save()
                //     res.redirect('/')
                // })
                    .catch((err) => {
                console.log(`Error while commenting the Post ${err}`)
            })
        }
        })
        .catch((err) => {
        console.log("Unable to find the Post while commenting")
    })
}

export default {
    createComment
}