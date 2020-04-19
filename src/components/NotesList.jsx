import React, {useState} from 'react';
import axios from 'axios';
import Note from './Note';
import {Row} from 'antd';


export default function NotesList(){

 const [notes, setNotes] = useState([]);

 function getNotes(){
     axios
       .get("http://localhost:5000/api/notes")
       .then(res => {
           setNotes(res.data);
       })
       .catch(err => console.error(err));
 }

 window.onload = getNotes();
    
function renderNotes(notes){
    return(
        <Note
            key={notes._id}
            id={notes._id} 
            title={notes.title}
            content={notes.content}
            isCompleted={notes.isCompleted}
            onDelete ={() => {
                getNotes();
            }}
            onUpdate={()=>{
                getNotes();
            }}
        />
    )
}
    return(
        <>
            <h1>Your Notes</h1>
            <div className='notes-container'>
            <Row justify='center'>
                {notes.map(renderNotes)} 
            </Row>    
            </div>
        </>
    )
}