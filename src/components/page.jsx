import React from 'react';
import {Header} from './header.jsx'
import {NoteElement} from './note.jsx'

function Main({onClick, notes}){

    return(
      <main className='flex flex-col items-center justify-center w-full '>
        <div className='grid grid-cols-2 w-full pt-10 m-5 h-full sm:grid-cols-3 lg:grid-cols-4' >
            {notes.map((note) => (
                <NoteElement key={note.key} id={note.key} date={note.date}
                 onClick={onClick} title={note.title} content={note.content}/>
                 
            ))}
        </div>
      </main>
    )
  }
  
export function Page({onClick,notes}){
      return(
        <>
          <Header notes={notes}/>
          <Main onClick={onClick} notes={notes}/>
        </>
      )
  }