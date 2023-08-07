import Post from "../models/post.js"
const home = (req, res) => {
    // To fetch the entire user object
    Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate:{
                path:'user' 
            }
        })
        .exec()
        .then((posts) => {
            console.log(posts)
        return res.render('home', {
            title: "Home",
            posts: posts
        })
    })
};
  
export default {
    home,
};  