const profile = function(req, res){
    return res.render('profile', {
        title: "Profile"
    })
}

export default {
    profile,
}