import React, { useContext } from 'react'
import noteContext from './Context/NoteContext'


function NoteItem(props) {
    const { delNote } = useContext(noteContext);
    const { noteDetails, updateNote } = props;
    return (
        <div>
            <div className="card bg-secondary" >
                <div className="card-body ">
                    <h5 className="card-title" style={{ display: "inline-block" }}>{noteDetails.title}</h5>

                    <span style={{ position: "absolute", right: "0" }}>
                      
                        <a href="#" data-toggle="tooltip" title="Delete note">
                        <i className="fa-solid fa-trash mx-3" onClick={() => { delNote(noteDetails._id) }}></i>
                        </a>

                        <a href="#" data-toggle="tooltip" title="Edit note">
                        <i className="fa-solid fa-pen-nib mx-3" onClick={() => { updateNote(noteDetails) }}></i>
                        </a>
                    </span><br />
                    <div className="badge text-bg-info" >{noteDetails.tag}</div>
                    <div className="badge text-bg-info mx-1">{new Date(noteDetails.date).toDateString()}</div>
                    <hr />
                    <p className="card-text">{noteDetails.description}</p>

                </div>
            </div>
        </div>
    )
}

export default NoteItem