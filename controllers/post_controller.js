const post = function(req, res){
    return res.end("<h1>User Posts</h1>")
}

const postLikes = function(req, res){
    return res.end("<h1>User Posts Likes</h1>")
}

export default {
    post, postLikes
}