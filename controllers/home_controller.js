import Post from "../models/post.js"
import User from "../models/user.js"
const home = async function (req, res) {
    try {
        // To fetch the entire user object
        let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                },
                populate: {
                    path: 'likes'
                }
            })
            .populate('likes')


        let user = await User.find({})
        return res.render('home', {
            title: "Home",
            posts: posts,
            all_users: user
        })
    
    } catch (err) {
        console.log("Error", err)
    }
}
export default {
    home,
};  