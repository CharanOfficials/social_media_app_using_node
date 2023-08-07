import mongoose from "mongoose";

const postScemea = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:true
    },
    // include the array of ids of all comments in this post schema itself
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            def: 'comment',
            required:true
        }
    ]
}, {
    timestamps: true
})

const Post = mongoose.model('Post', postScemea)

export default Post