import React from 'react';


export function NotesPage({notes, clickedNote, toggleNotesPage}){
    return (
      <div className='relative flex w-full h-full'>
        <button onClick={toggleNotesPage} className='bg-input shadow-md shadow-black text-foreground p-1 rounded-lg text-sm hover:bg-primary
          hover:text-primary-foreground duration-150'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
  
          </button>
        <div id="notes-container" className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 overflow-auto h-[85vh] w-full z-10'>
          {notes.map((note) => (
            <div id={note.key} key={note.key} onClick={clickedNote} className='flex  flex-col w-56 h-64 cursor-pointer border border-border z-40 m-auto my-2 bg-card
             text-foreground p-3 hover:bg-primary hover:text-primary-foreground duration-150 rounded-xl shadow-md shadow-black'>
              <h1 id={note.key} className='text-xl lg:text-xl text-center font-bold text-wrap pb-2 border-b-2 border-border'>{note.title}</h1>
              <p id={note.key} className='text-lg lg:text-md text-center text-wrap overflow-hidden h-full'>{note.content}</p>
              <div>
              <div id={note.key} className='flex justify-end z-10 duration-150'>
                <div id={note.key} className='delete-button rounded-full w-1/2 bg-destructive hover:text-black text-destructive-foreground m-auto p-2 mx-1 shadow-lg shadow-background duration-150'>
                    <svg id={note.key} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                    className="size-6 delete-button rounded-full m-auto ">
                        <path id={note.key} strokeLinecap="round" className='delete-button' strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </div>
  
              </div>
              </div>
            </div>
          ))}
          </div>
          
        </div>
    )
  }