import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {DeleteModal} from './components/modal.jsx'
import { setLocalStorageItem, getLocalStorageItem } from './data/data.jsx';
import { v4 as uuidv4 } from 'uuid';
import './App.css'


function Button(){
  return (
    <div className='fixed z-10 p-4 right-10 bottom-10 bg-primary text-secondary rounded-full cursor-pointer'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:size-9 size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
      </svg>
    </div>
  )
}



function Hamburger(){
  return (
      <div className='my-auto p-4 cursor-pointer'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 ">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </div>
  )
}

function SearchBar({searchNote}){

  return (
    <div className='  flex justify-center items-center w-full ' onChange={searchNote}>
      <input type='text' className='w-1/2 h-10 rounded-md p-2 bg-input ' placeholder='Search...' />
    </div>
  )
}

export default function App() {

  // Notes state and functions to add and remove notes
  const [notes, setNotes] = useState(() => {
    if (localStorage.getItem('notes')) {
      return JSON.parse(localStorage.getItem('notes'));
    } else {
      return [];
    }
  });
  let [notesList, setNotesList] = useState(notes);

  const [currentNote, setCurrentNote] = useState(
    {
      title: '',
      content: '',
      date: '',
      key: ''
    }
  );
  const [clicked, setClicked] = useState("");

  const handleAddNote=(note) => {
    setNotes([...notes, note]);

  }

const onChangeNote = (e) => {
  const { name, value } = e.target;
  setCurrentNote({
    title : name === 'title' ? value : currentNote.title,
    content : name === 'content' ? value : currentNote.content,
    date : new Date().toLocaleString(),
    key : currentNote.key === '' ? uuidv4() : currentNote.key
  });
}

// (this is the function copied from the other note App)
const addNote = (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const date = new Date().toLocaleString();
  const title = formData.get('title') ? formData.get('title') : date;
  const content = formData.get('content');
  const key = currentNote.key ? currentNote.key : uuidv4();
  if (!title & !content ) {
    return;
  } else if (title === '') {
    const title =`Note of ${date}`;
    handleAddNote({
      title,
      content,
      key,
      date
    });
  } else if (clicked === "clicked") {
    const newNotes = notes.map((note) => {
      if (note.key === currentNote.key) {
        note.title = title ;
        note.content = content;
        note.date = date;
        console.log(note);
        return note;
      } else {
        return note;
      }
    }
    );
    setNotes(newNotes);
  }else {
    handleAddNote({
      title,
      content,
      key,
      date
    });
  }
  form.reset();
  setCurrentNote({
    title: '',
    content: '',
    key: '',
    date: ''
  });

};
// delete note
const [deletedNotes, setDeletedNotes] = useState([]);
const [showModal, setShowModal] = useState(false);

const cancelModal = (e) => {
  e.preventDefault();
  setShowModal(false);
};

const [keyToDelete, setKeyToDelete] = useState('');
const deleteNote = () => {
  const newNotes = notes.filter((note) => note.key !== keyToDelete);
  setNotes(newNotes);
  setDeletedNotes([...deletedNotes, currentNote]);
  setShowModal(false);
  setCurrentNote({
    title: '',
    content: '',
    key: '',
    date: ''
  });
  setClicked("");
};

// New note function
const newNote = (e) => {
  e.preventDefault();
  setCurrentNote({
    title: '',
    content: '',
    key: '',
    date: ''
  });
  setClicked("");
  console.log(currentNote);
};
  // Notes clicked state 
  const clickedNote = (e) => {
    e.preventDefault();
    const noteClicked = e ? e.target.id : '';
    const note = notes.find((note) => note.key === noteClicked);
    if (e.target.classList.contains('delete-button')) {
      setShowModal(true);
      setKeyToDelete(note.key);
      return;
    }
    setClicked("clicked");
    if (note && note in deletedNotes) {
      return;
    }else {
      const title = note ? note.title : '';
      const content = note ? note.content : '';
      const key = note ? note.key : '';
      const date = note ? note.date : '';
      setCurrentNote({
        title,
        content,
        key,
        date
      });
      setClicked("clicked");
    }
  };


    useEffect(() => {
      const data = JSON.parse(localStorage.getItem('notes'));
      if (data) {
        setNotes(data);
      }
    },[]);

    useEffect(() => {
      window.localStorage.setItem('notes', JSON.stringify(notes));
      setNotesList(notes);
    },[notes]);

    const searchNote = (e) => {
      const search = e.target.value;
      const filteredNotes = notes.filter((note) => {
        if (note.title.toLowerCase().includes(search.toLowerCase())|| note.content.toLowerCase().includes(search.toLowerCase())) {
          return note;
        }
      }
      
    );
    setNotesList(filteredNotes);
    };
  return (
    <div className='flex flex-col min-h-screen'>
      { showModal &&
        <DeleteModal onClick={deleteNote} cancelModal={cancelModal}/>
      }
      <header className='flex h-[100px] bg-background w-full m-auto shadow-xl shadow-black '>
        <div className='flex h-full w-full my-auto'>
          <Hamburger/>
          <h1 className='text-3xl my-auto text-left'>Notes</h1>
          <SearchBar searchNote={searchNote}/>
        </div>
      </header>
      <div className='flex flex-1 bg-border w-full h-full'>
        
        <div id='new-note' className='bg-background w-[300px]'>
            <div className='flex justify-center items-center h-20'>
              <button id='new-note' onClick={newNote} className='bg-primary text-primary-foreground p-2 rounded-lg text-sm hover:bg-white hover:text-black duration-150 border-2 border-black'>New note</button>
            </div>
            <div id="notes-container" className='border-t-2 overflow-auto h-[74vh]'>
              {notesList.map((note) => (
                <div id={note.key} key={note.key} className='flex flex-row border-b-2 border-border cursor-pointer w-full ' onClick={clickedNote}>
                  <h2 id={note.key} className='text-xl w-full overflow-hidden p-4 hover:bg-secondary duration-150' >{note.title}</h2>
                  <div id={note.key} className='delete-button flex justify-end z-20 bg-destructive hover:bg-destructive-hover hover:text-black text-destructive-foreground duration-150'>
                    <svg id={note.key} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" delete-button w-8 m-auto">
                      <path id={note.key} className='delete-button' strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>

                  </div>
                  
                </div>
              ))}
            </div>
        </div>
        <div className='p-8 w-full ' onChange={onChangeNote}>
          <form id='note' className=' h-full flex flex-col bg-card p-4 rounded-xl' onSubmit={addNote}>
            <input  id='title' type='text' name='title' className=' w-fit h-10  p-2 text-2xl border-b-2' placeholder='Titre' defaultValue={currentNote ? currentNote.title :'' } />
            <textarea required id='content' name="content" className=' flex-1 w-full rounded-md p-4 resize-none' placeholder='Contenu' defaultValue={currentNote ? currentNote.content :'' }/>
            <div className='flex justify-end'>
              <button type='submit' className='w-16 bg-primary text-primary-foreground p-2 mt-2 rounded-lg text-sm '>Save</button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  )
}
;
