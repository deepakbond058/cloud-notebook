const express = require("express");
const fetchuser = require("../middleWare/fetchUser");
const router = express.Router();
const Note = require("../modules/Note");
const { body, validationResult } = require('express-validator');




//Route 1 :GET request to fetch all notes of the user http://localhost:5000/api/note/fetchallnotes
router.get("/fetchnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        res.status(500).send(error.message);
    }
})
//Route 2 :POST request to adding a new note http://localhost:5000/api/note/addnote
router.post("/addnote", [
    body('title', " should have a Minimum 5 characters").isLength({ min: 3 }),
    body('description', " can't be left empty").isLength({min:3})
], fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({ title, description, tag, user: req.user.id });
        const savedNote = await note.save();
        res.json(savedNote);

    } catch (error) {
        res.status(500).send(error.message);
    }

})

//Route 2 :PUT request to Update note http://localhost:5000/api/note/updatenote
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const { title, description, tag } = req.body
    //updating the details in a new object if not null
    try {
        const newNote = {};
        if (title) { newNote.title = title; }
        if (description) { newNote.description = description; }
        if (tag) { newNote.tag = tag; }

        //FInd the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("not found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed HackerBoy")
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        res.status(500).send(error.message);
    }

})

//Route 3 :DELETE request to delete note http://localhost:5000/api/note/updatenote
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    const { title, description, tag } = req.body
    try {
        //FInd the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("not found") }

        //Allow deletion only if user owns that note 
   
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed HackerBoy")
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json("success");
    } catch (error) {
        res.status(500).send(error.message);
    }

})
module.exports = router;