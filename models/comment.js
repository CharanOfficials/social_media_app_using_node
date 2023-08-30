import mongoose from "mongoose";
const commentSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    // Comment belongs to a user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
        required:true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
}, {
    timestamps: true
})

const Comment = mongoose.model('comment', commentSchema)

export default Comment