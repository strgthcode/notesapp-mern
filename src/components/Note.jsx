import React, {useState} from 'react';
import {Card, Modal, Button, Input, Col} from 'antd';
import axios from 'axios';

const {TextArea} = Input;

export default function Note(props){

    const [modal, setModal] = useState({
        visible: false,
    });

    function showModal(){
        setModal({
            visible: true,
        });
    };

    function handleOk(e){
        console.log(e);
        editNote();
        setModal({
            visible: false,
        });
    };

    function handleCancel(e){
        console.log(e);
        setModal({
            visible: false,
        });
    };

    function editNote(){
        return(
            axios
              .post(`http://localhost:5000/api/notes/update/${props.id}`, fullInput)
              .then(res => {
                  if(res.data){
                    setFullInput({
                        title: '',
                        content: ''
                   });
                      props.onUpdate();
                      console.log(res.data);
                  }
              })
              .catch(err => console.error(err))
        )
    }

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


    function deleteNote(){
        axios
          .delete(`http://localhost:5000/api/notes/${props.id}`)
          .then(res => {
              if(res.data){
                  props.onDelete();
                  console.log('Deleted Item Successfully');
              }
          })
          .catch(err => console.error(err));
    }

    


    return(

        <>
            
            <Col>
                <Card  title={props.title}  
                style={{ width: 300, 
                         boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)",
                         margin: "5px" }}>

                <p name='content'> {props.content} </p>
    
                
                    <Button onClick={showModal}>Edit</Button>
                    <Button onClick={deleteNote}>Delete</Button>

                    <Modal
                        title="Edit Note"
                        visible={modal.visible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <h4>Edit Note Title</h4>                        
                        <Input
                            
                            type='text' 
                            name='title' 
                            placeholder='Enter your Note Title' 
                            onChange={handleChange} 
                            value={fullInput.title}
                        />
                        <h4>Edit Note Content</h4>   
                        <TextArea rows={4}
                            type='text' 
                            name='content' 
                            placeholder='Enter your Note Content' 
                            onChange={handleChange} 
                            value={fullInput.content}

                         />

                      

                    </Modal>
                 </Card>   
            </Col>
        </>
    )
}