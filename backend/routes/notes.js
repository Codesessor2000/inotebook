const express = require('express');
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const { body, validationResult } = require('express-validator');

//get all notes GET: "api/notes/fetchAllNotes" login required
router.get('/fetchAllNotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error");
    }
})

//Add a note POST: "/api/notes/addnote" login required
router.post('/addnote', [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 })
], fetchUser, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, description, tag } = req.body;
        const note = new Note({
            title,
            description,
            tag,
            user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error");
    }
});

//update an existing note PUT: "/api/notes/updatenote/:id". login required
router.put("/updatenote/:id", fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, tag } = req.body;
    try {
        //create new note object
        const newNote = {};
        if (title) newNote.title = title;
        if (description) newNote.description = description;
        if (tag) newNote.tag = tag;

        //find the note to be update and update it
        let note = await Note.findById(req.params.id);
        if (!note) return res.status(404).send("not found");

        if (note.user.toString() !== req.user.id) return res.status(401).send("not allowed");

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error");
    }
});

//delete a note with DELETE: "/api/notes/:id"
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("not found"); }
        if (note.user.toString() != req.user.id) { return res.status(401).send("not allowed"); }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note });
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error");
    }
})

module.exports = router;