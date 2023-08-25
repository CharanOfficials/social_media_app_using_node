import nodeMailer from 'nodemailer'
import { fileURLToPath } from 'url'
import { dirname, join} from "path"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
import ejs from 'ejs'

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: "codingninjas2k16@gmail.com",
        pass: "slwvvlczduktvhdj"
    }
})
let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        join(__dirname, '../views/mailers', relativePath),
        data,
        function (err, template) {
            if (err) {
                console.log("Error in rendering template", err)
            }
            mailHTML = template
        }
    )
    return mailHTML
}
export default {
    transporter,
    renderTemplate
}