import React, { useContext, useEffect, useRef,useState } from 'react';
import AddNote from './AddNote';
import noteContext from './Context/NoteContext';
import { useNavigate } from 'react-router-dom';
import NoteItem from './NoteItem';

function Notes() {
    const [noteUpdate, setNoteUpdate] = useState({title:"",tag:"",description:""})
    let { noteCollection, fetchAllNotes, editNote } = useContext(noteContext);
    const buttonModal = useRef(null);
    let navigate = useNavigate();
    const closeModal = useRef(null);

    useEffect(() => {
        if(!localStorage.getItem('authtoken')){
            navigate('/login');
            return;
          }
        fetchAllNotes();
    }, [])

    const updateNoteContent = (noteDetails) => {
        buttonModal.current.click();
        setNoteUpdate(noteDetails);
    }

    const onClick = (e) => {
        e.preventDefault();// NO need as it's not part of the form
        
        editNote(noteUpdate._id,noteUpdate.title,noteUpdate.description,noteUpdate.tag===""?"General":noteUpdate.tag);
        closeModal.current.click();
    }

    const onChange = (e) => {
        setNoteUpdate({...noteUpdate,[e.target.name]:e.target.value})
    }
   

    return (
        <>
            <AddNote />
            {/* <!-- Button trigger modal --> */}
            <button type="button" ref={buttonModal} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" hidden={true}></button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" >
                    <div className="modal-content" style={{backgroundColor:"#453C67"}}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit</h1>
                        </div>
                        <div className="modal-body ">

                            <div className="mb-3">
                                <label htmlFor="modalTitle" className="form-label">Title</label>
                                <input type="text" className="form-control" id="modalTitle" value={noteUpdate.title} name="title" onChange={onChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="modalTag" className="form-label">Tags</label>
                                <input type="text" className="form-control" id="modalTag" name="tag" value={noteUpdate.tag} onChange={onChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="modalDescription" className="form-label">Description</label>
                                <textarea className="form-control" id="modalDescription" name='description' value={noteUpdate.description} rows="3" onChange={onChange}></textarea>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={closeModal} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={onClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>


            < div className='container text center'>
                <h2>Your Notes</h2>
                    {noteCollection.length===0 && "No Notes To Display..."}
                <div className='row'>
                    {noteCollection.map((element) => {
                        return <div className='col-md-4 my-3' key={element._id}>
                            <NoteItem noteDetails={element} updateNote={updateNoteContent} />
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes