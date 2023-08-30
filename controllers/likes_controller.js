import Like from '../models/like.js'
import Comment from '../models/comment.js'
import Post from '../models/post.js'

const toggleLike = async function (req, res) {
    try {
        // likes/toggle/?id:abcde&type=Post
        let likeable;
        // for toggling or increment/ decrement the count
        let deleted = false
        if (req.query.type == 'Post') {
            // to get the post along with the associated likes
            likeable = await Post.findById(req.query.id).populate('likes')
        } else {
            //  to get the comment along with the associated likes
            likeable = await Comment.findById(req.query.id).populate('likes')
        }
        // check if  like already exists req.query is because we are using query
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.query._id 
        }).exec()
        
        // if a like already exists then delete it from the arrays
        if (existingLike) {
            likeable.likes.pull(existingLike._id)
            likeable.save()
            existingLike.deleteOne()
            deleted = true
        } else {
            // make a new like
            let newLike = await Like.create({
                user: req.query._id,
                likeable: req.query.id,
                onModel: req.query.type
            })
            likeable.likes.push(newLike._id)
            likeable.save()
        }   
        // return like creation or deletion status
        return res.status(200).json({
            message: "Request successful!",
            data: {
                deleted:deleted
            }
        })

    } catch (err) {
        console.log("Error", err)
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}
export default {
    toggleLike
}