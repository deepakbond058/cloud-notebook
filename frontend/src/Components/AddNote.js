import React, { useContext, useState } from 'react'
import noteContext from './Context/NoteContext';
import NoteItem from './NoteItem';

function AddNote() {
    const { addNote } = useContext(noteContext);
  
    const [newNote, setNewNote] = useState({ title: "", description: "", tag: "" })

    const onSubmit = (e) => {
        e.preventDefault();
        addNote(newNote.title,newNote.description,newNote.tag===""?"General":newNote.tag);
        setNewNote({ title: "", description: "", tag: "" });
    }

    const onChange = (e) => {
        setNewNote({...newNote,[e.target.name]:e.target.value})
    }
    return (
        <div className="container my-3">
            <h2>Add a Note</h2>

            <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" value={newNote.title} name="title" minLength={4} required onChange={onChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tags</label>
                <input type="text" className="form-control" id="tag" name="tag" value={newNote.tag} onChange={onChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" id="description" name='description' rows="3" value={newNote.description} minLength={4} required onChange={onChange}></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}

export default AddNote;  