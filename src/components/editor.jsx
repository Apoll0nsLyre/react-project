import { useState,useEffect } from "react";
import { Animation } from "./animation";
import { use } from "react";

export function NoteEditor({ sideNotesPage, currentNote, addNote, onChangeNote, newNote, toggleNotesPage, notes, clickedNote, animation, animation2}) {
    const [empty, setEmpty] = useState(false);
    useEffect(() => {
      if(notes.length === 0){
        setEmpty(true);
      } else {
        setEmpty(false);
      }
    }
    , [notes]);

    return (
      <Animation className=' w-full bg-background flex' animation={animation} onChange={onChangeNote}>
        {sideNotesPage &&
          <Animation animation={animation2} id="side-menu" className='bg-background w-[300px] h-full shadow-lg border-border border-4 shadow-black z-10 absolute sm:static'>
                  <div id="overlay" className=" "></div>
                  <div className='flex relative w-full justify-center items-center h-20'>
                    <button id='new-note' onClick={newNote} className='bg-input shadow-md shadow-black text-foreground p-2 rounded-lg text-sm hover:bg-primary
                    hover:text-primary-foreground duration-150 '>New note</button>
                    <button onClick={toggleNotesPage} title='Show full screen notes' className='absolute top-2 right-2  bg-input shadow-md shadow-black text-foreground p-1 rounded-lg text-sm hover:bg-primary
                    hover:text-primary-foreground duration-150  '>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                        </svg>
  
                    </button>
                </div>
                  <div id="notes-container" className='relative border-border border-t-2 overflow-auto h-[72vh] shadow-inner shadow-black '>
                  { empty && <h1 className='absolute italic top-[30%] right-[50%] translate-x-[50%] translate-y-[50%] z-40 text-3xl text-center text-primary m-auto'>No notes yet.</h1>}
                  {notes.map((note) => (
                    <div id={note.key} key={note.key} className='Note flex flex-row border-b-2 border-border cursor-pointer w-full hover:bg-secondary shadow-md duration-150' onClick={clickedNote}>
                      <h2 id={note.key} className='text-xl w-full overflow-hidden p-4 duration-150' >{note.title}</h2>
                      <div id={note.key} className='flex justify-end z-10 duration-150'>
                        <div id={note.key} className='delete-button rounded-full bg-destructive hover:text-black text-destructive-foreground m-auto p-2 mx-1 shadow shadow-black duration-150'>
                          <svg id={note.key} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                          className="size-6 delete-button rounded-full m-auto ">
                            <path id={note.key} strokeLinecap="round" className='delete-button' strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </div>
                        
                      </div>
                      
                    </div>
                  ))}
                </div>
              </Animation>}
              <div className='p-8 w-full bg-background ' onChange={onChangeNote}>
                <form id='note' className=' h-full flex flex-col bg-card p-4 rounded-xl shadow-lg shadow-black ' onSubmit={addNote}>
                  <input  id='title' type='text' name='title' className='max-w-fit h-10  p-2 text-2xl border-b-2 border-border bg-card' placeholder='Titre' defaultValue={currentNote ? currentNote.title :'' } />
                  <textarea required id='content' name="content" className='flex-1 w-full rounded-md p-4 resize-none bg-card' placeholder='Contenu' defaultValue={currentNote ? currentNote.content :'' }/>
                  <div className='flex justify-end'>
                    <button type='submit' className='w-16 bg-input text-foreground p-2 mt-2 rounded-lg text-sm shadow-md hover:bg-primary hover:text-primary-foreground duration-150 shadow-black'>Save</button>
                  </div>
                  
                </form>
              </div>
        </Animation>
              )
            };