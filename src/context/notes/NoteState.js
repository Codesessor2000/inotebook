import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    const getAllNotes = async () => {
        //todo api call
        const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
            method: 'GET',
            headers: {
                'Content-Type':"application/json",
                'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYzODhiMzliODIwNTA4Y2Y5ODU5ZDczIn0sImlhdCI6MTcxNDk4MTY4OX0.lP2ogQ5Dv-xP50OdK7lqwuIu5poSZagFEmVLzKg95c8"
            }
        })
        const json = await response.json();
        setNotes(json)
    }


    //add note
    const addNote = async (title, description, tag) => {
        //todo api call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type':"application/json",
                'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYzODhiMzliODIwNTA4Y2Y5ODU5ZDczIn0sImlhdCI6MTcxNDk4MTY4OX0.lP2ogQ5Dv-xP50OdK7lqwuIu5poSZagFEmVLzKg95c8"
            },
            body: JSON.stringify({title,description,tag}),
        })
        const note = await response.json();
        setNotes(notes.concat(note))
    }
    //edit note
    const editNote = async (id, title, description, tag) => {
        //todo api call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': "application/json",
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYzODhiMzliODIwNTA4Y2Y5ODU5ZDczIn0sImlhdCI6MTcxNDk4MTY4OX0.lP2ogQ5Dv-xP50OdK7lqwuIu5poSZagFEmVLzKg95c8"
            },
            body: JSON.stringify({title, description, tag}),
        })
        let newNotes = JSON.parse(JSON.stringify(notes));
        for(let index = 0; index<newNotes.length;index++){
            if(newNotes[index]._id === id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }
    //delete note
    const deleteNote = async(id) => {
        //todo api call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': "application/json",
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYzODhiMzliODIwNTA4Y2Y5ODU5ZDczIn0sImlhdCI6MTcxNDk4MTY4OX0.lP2ogQ5Dv-xP50OdK7lqwuIu5poSZagFEmVLzKg95c8"
            }
        });
        const newNotes = notes.filter((note)=>{return note._id !== id});
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{notes, addNote, editNote, deleteNote, getAllNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;