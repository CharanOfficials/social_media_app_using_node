import Post from '../models/post.js'

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

export default {
    post
}