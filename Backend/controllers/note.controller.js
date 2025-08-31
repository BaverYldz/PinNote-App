import Note from "../models/note.model.js";

export const createNote = async (req, res, next) => {
    try {
        const note = await Note.create({
            ...req.body,
            user: req.user._id
        })

        res.status(201).json({
            success: true,
            data: note
        })

    } catch (error) {
        next(error)
    }
}

export const getUserNotes = async (req, res, next) => {
    try {
        if (req.user._id.toString() !== req.params.id) {
            const error = new Error('You are not the owner of this account')
            error.statusCode = 401;
            throw error;
        }

        const note = await Note.find({ user: req.params.id });
        res.status(200).json({
            success: true,
            data: note
        })

    } catch (error) {
        next(error)
    }
}

export const getAllNotes = async (req, res, next) => {
    try {
        const notes = await Note.find();

        res.status(200).json({
            success: true,
            data: notes
        })

    } catch (error) {
        next(error)
    }
}

export const getByIdNote = async (req, res, next) => {
    try {
        const note = await Note.findById(req.params.id)

        if (note.user.toString() !== req.user._id.toString()) return res.status(403).json({ success: false, error: "You are not authorized to get this Note" });

        res.status(200).json({
            success: true,
            data: note
        })

    } catch (error) {
        next(error)
    }
}


export const updateNote = async (req, res, next) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) return res.status(404).json({ error: "Note doesn't exist" })

        if (note.user.toString() !== req.user._id.toString()) return res.status(403).json({ success: false, error: "You are not authorized to update this note" });

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )

        res.status(200).json({
            success: true,
            data: updatedNote
        })

    } catch (error) {
        next(error)
    }
}

export const deleteNote = async (req, res, next) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) return res.status(404).json({ error: "Note doesn't exist" })

        if (note.user.toString() !== req.user._id.toString()) return res.status(403).json({ success: false, error: "You are not authorized to delete this note" });

        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        res.status(204).json({
            success: true,
            data: deletedNote
        })

    } catch (error) {
        next(error)
    }
}