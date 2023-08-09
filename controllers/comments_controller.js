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
                    .then((comment) => {
                    post.comments.push(comment)
                    post.save()
                    res.redirect('/')
                })
                    .catch((err) => {
                console.log(`Error while commenting the Post ${err}`)
            })
        }
        })
        .catch((err) => {
        console.log("Unable to find the Post while commenting")
    })
}

const destroy =  function (req, res) {
    Comment.findById(req.params.id)
        .then((comment) => {
            let postId = comment.post
            Post.findById(postId)  // To check whether post belongs to the logged in Usr so that they can delee the coments done by soe other user as well
                .populate('user')  // Populate user stored in Post
                .then(post => {
                    return post.user
                })
                .then((postUser) => {
                    // .id is used for converting the _id in String before comparison
                    if ((comment.user == req.user.id) || (postUser._id == req.user.id)) {
                        comment.deleteOne()
                        Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, {new: true})
                            .then((post) => {
                                return res.redirect('back')
                            })
                            .catch((err) => {
                                console.log("Unable to delete the comment from Post", err)
                                return res.redirect('back')
                            })
                    }
                })
                .catch((err) => {
                    console.log("Post User error", err)
                })
                }).catch((err) => {
                    console.log("Error in finding the appropriate comment", err)
                    res.redirect('back')
    })
}

export default {
    createComment, destroy
}