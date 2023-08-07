import mongoose from "mongoose";

const postScemea = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, {
    timestamps: true
})

const Post = mongoose.model('Post', postScemea)

export default Post