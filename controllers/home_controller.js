const home = (req, res) => {
    return res.render('home', {
        title: "Home"
    })
};
  
export default {
    home,
};  