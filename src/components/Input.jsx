import React, {useState} from 'react';
import {Input, Button} from 'antd';
import axios from 'axios';

const {TextArea} = Input;

export default function Inputs(){
    const [fullInput, setFullInput] = useState({
        title: '',
        content: ''
    });

    function handleChange(e){
        const {name, value} = e.target;

        setFullInput(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    function addNote(){
        axios
          .post("http://localhost:5000/api/notes", fullInput)
          .then(res => {
              if (res.data){
                  setFullInput({
                      title: '',
                      content: ''
                 })
              }
          })
          .catch(err => console.error(err));

    }

    return(
        <>
            <h1>Add a Note:</h1>
            <div style={{boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)"}}>
                <Input 
                    type='text' 
                    name='title' 
                    placeholder='Enter your Note Title' 
                    onChange={handleChange} 
                    value={fullInput.title}

                    />
                <TextArea rows={4}
                    type='text' 
                    name='content' 
                    placeholder='Enter your Note Content' 
                    onChange={handleChange} 
                    value={fullInput.content}

                    />
            </div>
            <Button  type='primary' style={{margin: "10px"}} onClick={addNote}>Add Note</Button>
        </>
    )
}