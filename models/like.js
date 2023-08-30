import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId
    },
    // defines the Object id of the liked object
    likeable: {
        type: mongoose.Schema.ObjectId,
        require: true,
        refPath: 'onModel'
    },
    // this field is used to define the type of the liked object since this is a dynamic reference
    onModel: {
        type: String,
        require: true,
        enum: ['Post', 'Comment']
    }
}, {
    timestamps: true
})
const Like = mongoose.model("Like", likeSchema)
export default Like