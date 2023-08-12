const { Notes } = require('../models/notes');
const { User } = require('../models/user')
const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apierror');

const addNotes = async (body) => {
    try {
        const note = new Notes({
            ...body
        });
        await note.save();
        return note;
    } catch (error) {
        throw error;
    }
};

const updateNote = async (_id, body) => {
    try {
        const note = await Notes.findOneAndUpdate(
            { _id },
            { "$set": body },
            { new: true }
        );
        if (!note) throw new ApiError(httpStatus.NOT_FOUND, 'Note not found');
        return note;
    } catch (error) {
        throw error;
    }
}

const deleteNote = async (_id) => {
    try {
        const note = await Notes.findByIdAndRemove({ _id });
        if (!note) throw new ApiError(httpStatus.NOT_FOUND, 'Note not found');
        return note;
    } catch (error) {
        throw error;
    }
}

const getAllNotes = async (id) => {
    try {
        const user = await User.findById(id);

        if (!user) {
            throw new Error('User not found');
        }




        const notes = await Notes.find({ user });

        return notes;
    } catch (error) {
        throw (error)
    }
}

module.exports = {
    addNotes,
    updateNote,
    deleteNote,
    getAllNotes
}