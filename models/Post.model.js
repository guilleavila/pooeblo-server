const { Schema, model } = require("mongoose");

const postSchema = new Schema(
    {
        image: {
            type: String,
        },
        content: {
            type: String,
        },
        likes: {
            type: Number,
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'Village'
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("Post", postSchema);