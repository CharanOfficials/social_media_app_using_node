import mongoose from "mongoose";
import multer from 'multer'
import { fileURLToPath } from 'url'
import { dirname, join} from "path"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const AVATAR_PATH = join('/uploads', 'users')
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    friendships: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Friendship'
        }
    ]
},{
    timestamps: true
});
console.log(__dirname + '/uploads')
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, join(__dirname,'..',AVATAR_PATH))
  },
    filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})
// Global methods
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar')
userSchema.statics.avatarPath = AVATAR_PATH

const user = mongoose.model('user',userSchema);

export default user