import Post from '../models/post.js'
import Comment from '../models/comment.js'
const post = function (req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    }).then(() => {
        console.log("Success")
        res.redirect('back')
    }).catch((err) => {
        console.log("Error in creating a new post")
        return
    })
}

const destroy = function (req, res) {
    Post.findById(req.params.id)
        .then((post) => {
            // Id means converting the Object Id into Strings
            if (post.user == req.user.id) {
                post.deleteOne()
                Comment.deleteMany({ post: req.params.id })
                    .then(() => {
                    return res.redirect('back')
                    })
                    .catch((err) => {
                    console.log("Unable to delete the related comments")
                })
            }
        }).catch((err) => {
            console.log("Unable to find the related post", err)
            res.redirect('back')
    })
}

export default {
    post, destroy
}