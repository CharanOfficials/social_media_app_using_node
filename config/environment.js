import fs from 'fs'
import rfs from 'rotating-file-stream'
import { fileURLToPath } from 'url'
import { dirname, join} from "path"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const logDiretory = join(__dirname, '../production_logs')
fs.existsSync(logDiretory) || fs.mkdirSync(logDiretory)

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path:logDiretory
})

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: "manipal",
    db: "goosip_development",
    smtp: {
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: "codingninjas2k16@gmail.com",
                pass: "slwvvlczduktvhdj"
            }
        },
    google_client_id: "",
    google_client_secret: "",
    google_callback_url: "http://127.0.0.1:8000/user/auth/google/callback",
    jwt_secret: 'Goosip',
    morgan: {
        mode: 'dev',
        options:{stream:accessLogStream}
    }
}
let db_Name_Prod = process.env.GOOSIP_DB;
db_Name_Prod = db_Name_Prod.replace(/"/g, '');

const production = {
    name: "production",
    asset_path: process.env.GOOSIP_ASSET_PATH,
    session_cookie_key: process.env.GOOSIP_SESSION_COOKIE_KEY,
    db: db_Name_Prod,
    smtp: {
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.GOOSIP_EMAIL_USERNAME,
                pass: process.env.GOOSIP_EMAIL_PASSWORD
            }
        },
    google_client_id: process.env.GOOSIP_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOSIP_GOOGLE_CLIENT_SECRET,
    google_callback_url: process.env.GOOSIP_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.GOOSIP_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options:{stream:accessLogStream}
    }
}

console.log(process.env.GOOSIP_GOOGLE_CALLBACK_URL)
export default eval(process.env.GOOSIP_ENVIRONMENT) == undefined ? development : eval(process.env.GOOSIP_ENVIRONMENT)