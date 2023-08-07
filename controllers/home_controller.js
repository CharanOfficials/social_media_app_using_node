import Post from "../models/post.js"
const home = (req, res) => {
    // console.log(req.cookies)
    // res.cookie('user_id', 25)
    // Post.find({

    // })
    //     .then((posts) => {
    //     return res.render('home', {
    //         title: "Home",
    //         posts: posts
    // })
    //     }).catch((err) => {
    //     console.log("Error in fetching the Posts")
    // })
    // To fetch the entire user object
    Post.find({}).populate('user').exec().then((posts) => {
        return res.render('home', {
            title: "Home",
            posts: posts
        })
    })
};
  
export default {
    home,
};  