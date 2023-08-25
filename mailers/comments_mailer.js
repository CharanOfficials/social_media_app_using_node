import nodeMailer from "../config/nodemailer.js";

const newComment = (comment) => {
    console.log("Nodemailer")
    nodeMailer.transporter.sendMail({
        from: 'codingninjas2k16@gmail.com',
        to: comment.user.email,
        subject: 'Your Comment Published',
        html: '<h1>Your Comment is now published.</h1>'
    }).then((info) => {
        console.log("Message sent", info)
        return
    }).catch(() => {
        console.log("Error in sending the email", err)
        return
    })
}
export default {
    newComment
}