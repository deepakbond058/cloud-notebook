import React, { useState } from 'react';
import axios from 'axios';

import NoteContext from './NoteContext';
const NoteState = (props) => {


  let parsedNotesArray = [];
  const [noteCollection, setNoteCollection] = useState(parsedNotesArray);
  const [alert, setAlert] = useState(null);

  const showAlert = (icon, type, message) => {
    setAlert({ icon, type, message });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }

  const fetchAllNotes = async () => {


    //API call to fetch initial notes from server
    await axios({
      method: 'get',
      url: "api/note/fetchnotes",
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("authtoken")
      },
    })
      .then((response) => {
        const parsedNotesArray =response.data;
        setNoteCollection(parsedNotesArray);
      });

  }

  const addNote = async (title, description, tag) => {
    //API call to add
    await axios({
      method: 'post',
      url: "api/note/addnote",
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("authtoken")
      },
      data: JSON.stringify({ title, description, tag })
    })
      .then((response) => {
        if (response.status === 200) {
          fetchAllNotes();
          showAlert('thumbs-up', 'Success', 'Note Added Successfully');
        }
        else {
          showAlert("circle-exclamation", 'Warning', 'Some Error Occured While Adding Note');
        }
      });


    // const newNote = { title, description, tag };
    // setNoteCollection(noteCollection.concat(newNote));
  }

  const delNote = async (id) => {

    //API call to delete

    await axios({
      method: 'delete',
      url: `api/note/deletenote/${id}`,
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("authtoken")},
    })
      .then((response) => {
        if (response.status === 200) {
          fetchAllNotes();
          showAlert('thumbs-up', 'Success', 'Note Added Successfully');
        }
        else {
          showAlert("circle-exclamation", 'Warning', 'Some Error Occured While Adding Note');
        }
      });
    
    //Logic to delete in client
    // setNoteCollection(noteCollection.filter((eachNote) => { return eachNote._id !== id }));
  }

  const editNote = async (id, title, description, tag) => {
    //API call to update
    await axios({
      method: 'put',
      url: `api/note/updatenote/${id}`,
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("authtoken")},
      data: JSON.stringify({ title, description, tag })
    })
      .then((response) => {
        if (response.status === 200) {
          fetchAllNotes();
          showAlert('thumbs-up', 'Success', 'Note Updated Successfully');
        }
        else {
          showAlert("circle-exclamation", 'Warning', 'Some Error Occured While Updating Note');
        }
      });

  }
  const getUser = async () => {
    //API call to fetch logged user details from server
    const response = await axios({
      method: 'post',
      url: "api/auth/getuser",
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("authtoken")}
    })
      
      return response.data; 
  }
  return (

    <NoteContext.Provider value={{ noteCollection, addNote, delNote, editNote, fetchAllNotes, alert, showAlert, getUser }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;