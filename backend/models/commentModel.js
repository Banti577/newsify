const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const commentSchema = new Schema({
    blogId: {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
    comment: {
        required: true,
        type: String,
    },
    CommentBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
             default: []
            
        }
    ],
    dislikes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    edited: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Comment = model('Comment', commentSchema);

module.exports = Comment;