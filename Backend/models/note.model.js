import mongoose, { Schema, Types } from "mongoose";

const noteSchema = new Schema(
    {
        user: { type: Types.ObjectId, ref: "User", required: true },

        title: {
            type: String,
            trim: true,
            required: [true, "Title is required"],
            maxlength: [120, "Title must be at most 120 characters"],
        },

        body: {
            type: String,
            trim: true,
            default: "",
        },

        tags: {
            type: [String],
            default: [],
        },

        isPinned: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
