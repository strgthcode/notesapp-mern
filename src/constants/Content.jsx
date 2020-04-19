import React from 'react'
import Inputs from '../components/Input';
import NotesList from '../components/NotesList'

export default function Content(){
    return(
        <>
            <div className='content'>
                <Inputs />
                <NotesList />            
            </div>
        </>
    )
}