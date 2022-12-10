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

    try {
    //API call to fetch initial notes from server
    const response = await axios({
      method: 'get',
      url: "api/note/fetchnotes",
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("authtoken")
      },
    })  
      const parsedNotesArray = await response.data;
      setNoteCollection(parsedNotesArray);
    } catch (error) {
      console.log(error.response.data.error);
    }
  }

  const addNote = async (title, description, tag) => {
    //API call to add
    try {
      const response = await axios({
        method: 'post',
        url: "api/note/addnote",
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("authtoken")
        },
        data: JSON.stringify({ title, description, tag })
      })
  
          if (response.status === 200) {
            fetchAllNotes();
            showAlert('thumbs-up', 'Success', 'Note Added Successfully');
          }
          else {
            showAlert("circle-exclamation", 'Warning', 'Some Error Occured While Adding Note');
          }
      
    } catch (error) {
      console.log(error.response.data.error);
    }
    // const newNote = { title, description, tag };
    // setNoteCollection(noteCollection.concat(newNote));
  }

  const delNote = async (id) => {

    //API call to delete

    try {
      
      const response = await axios({
        method: 'delete',
        url: `api/note/deletenote/${id}`,
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("authtoken")},
      })
  
          if (response.status === 200) {
            fetchAllNotes();
            showAlert('thumbs-up', 'Success', 'Note Added Successfully');
          }
          else {
            showAlert("circle-exclamation", 'Warning', 'Some Error Occured While Adding Note');
          }
    } catch (error) {
      console.log(error.response.data.error);
    }
  
    //Logic to delete in client
    // setNoteCollection(noteCollection.filter((eachNote) => { return eachNote._id !== id }));
  }

  const editNote = async (id, title, description, tag) => {
    //API call to update
    try {
      const response = await axios({
        method: 'put',
        url: `api/note/updatenote/${id}`,
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("authtoken")},
        data: JSON.stringify({ title, description, tag })
      })
  
          if (response.status === 200) {
            fetchAllNotes();
            showAlert('thumbs-up', 'Success', 'Note Updated Successfully');
          }
          else {
            showAlert("circle-exclamation", 'Warning', 'Some Error Occured While Updating Note');
          }  
    } catch (error) {
      console.log(error.response.data.error)
    }
    
  

  }
  const getUser = async () => {
    //API call to fetch logged user details from server
    try {
      const response = await axios({
        method: 'post',
        url: "api/auth/getuser",
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("authtoken")}
        })  
        return response.data; 
    } catch (err) {
      console.log(err.response.data.error);
    }
  }
  return (

    <NoteContext.Provider value={{ noteCollection, addNote, delNote, editNote, fetchAllNotes, alert, showAlert, getUser }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;