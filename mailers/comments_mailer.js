import nodeMailer from "../config/nodemailer.js";

const newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({comment: comment},'/comments/new_comment.ejs')
    nodeMailer.transporter.sendMail({
        from: 'codingninjas2k16@gmail.com',
        to: comment.user.email,
        subject: 'Your Comment Published',
        html: htmlString
    }).then((info) => {
        console.log("Email sent")
        // console.log("Message sent", info)
        return
    }).catch(() => {
        console.log("Error in sending the email", err)
        return
    })
}
export default {
    newComment
}