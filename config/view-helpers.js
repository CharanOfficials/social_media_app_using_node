import env from '../config/environment.js'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join} from "path"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// app will receive express app instance from index
const pathView = (app) => {
    console.log(app)
    app.locals.assetPath = function (filePath) {
        if (env.name == 'development') {
            return filePath
        }
        return '/'+JSON.parse(fs.readFileSync(join(__dirname, '../public/assets/rev-manifest.json')))[filePath]
    }
}
export default pathView