import { useState, useEffect } from 'react'
import {DeleteModal} from './components/modal.jsx'
import { Animation } from './components/animation.jsx';
import { NoteEditor } from './components/editor.jsx';
import { Arrow, Hamburger } from './components/icons.jsx';
import { NotesPage } from './components/notes.jsx';
import { setLocalStorageItem, getLocalStorageItem } from './data/data.jsx';
import { v4 as uuidv4 } from 'uuid';
import './App.css'




function SearchBar({searchNote, onClick, searchModal, hideSearchModal}){

  return (
    <div className='flex justify-center items-center w-full z-10'  onChange={searchNote}>
      <input type='text' className='w-1/2 h-10 rounded-md p-2 bg-input shadow-md shadow-black' onClick={onClick} placeholder='Search...' />
      <div className='my-auto w-2 p-4 '>
        { searchModal && <Arrow hideSearchModal={hideSearchModal}/>}
      </div>
    </div>
  )
}

function SearchResults({notes, clickedNote}){
  return (
    <div className='text-foreground'>
      <div className='absolute -z-10 top-0 left-0 w-full h-full backdrop-blur-[6px] '></div>
      <div id="notes-container" className='m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 overflow-auto h-[85vh] w-full z-30 '>
        {notes.map((note) => (
          <div id={note.key} key={note.key} onClick={clickedNote} className='flex  flex-col w-48 h-64 cursor-pointer border border-border z-40 m-auto my-2 bg-card
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
};

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
    if (searchModal) {
      hideSearchModal();
    }
    
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

    const [searchModal, setSearchModal] = useState(false);
    const showSearchModal = () => {
      setFadeSearch('fade-in');
      console.log(fade);
      setSearchModal(true);
    }

    // Set timeout to hide search modal after 5 seconds
    const [fade, setFade] = useState('');
    const [fadeSearch, setFadeSearch] = useState('fade-in');  

    const hideSearchModal = () => {
      setFadeSearch('fade-out');
      console.log(fadeSearch);
      setTimeout(() => {
        setSearchModal(false);
      }, 140);
    }
    useEffect(() => {
      const noteColor = document.getElementsByClassName(`Note`);
      for (let i = 0; i < noteColor.length; i++) {
        noteColor[i].classList.remove('bg-secondary');
      }
      const note = document.getElementById(currentNote.key);
      if (note) {
        note.classList.add('bg-secondary');
      }

    }
    ,[currentNote]);
      
    // Notes pages toggle
    const [notesPage, setNotesPage] = useState(false);

    const showNotesPage = () => {
      setFade('fade-in');
      console.log(fade);
      setNotesPage(true);
    }
    const hideNotesPage = () => {
      setNotesPage(false);
    }

  return (
    <div className='flex flex-col min-h-screen bg-background'>
      { showModal &&
        
        <DeleteModal onClick={deleteNote} cancelModal={cancelModal} animation={fade}/>
      }
      <header className='flex h-[100px] bg-card w-full m-auto shadow-md shadow-black z-10 text-foreground'>
        <div className='flex h-full w-full my-auto '>
          <Hamburger className={'my-auto p-4 cursor-pointer block md:hidden'}/>
          <h1 id='title-page' className='text-3xl my-auto sm:text-left pl-4 hidden sm:block '>Notes</h1>
          <SearchBar searchNote={searchNote} onClick={showSearchModal} searchModal={searchModal} hideSearchModal={hideSearchModal}/>
          
        </div>
      </header>
      <div className='relative flex flex-1 w-full h-full text-foreground ' >

        {searchModal &&
        <Animation className='absolute z-20 top-0 left-0 w-full h-full overflow-auto ' animation={fadeSearch}>
          <SearchResults notes={notesList} clickedNote={clickedNote}/>
        </Animation>
        }
        {notesPage &&
        <Animation className='w-full h-full overflow-auto' animation={fade}>
          <NotesPage notes={notes} clickedNote={clickedNote} toggleNotesPage={hideNotesPage}/>
        </Animation>
        }
        { !notesPage &&
          <NoteEditor newNote={newNote} animation={fade} currentNote={currentNote} addNote={addNote} onChangeNote={onChangeNote} notes={notes} toggleNotesPage={showNotesPage} clickedNote={clickedNote}/>
          }
         
      </div>
    </div>
  )
}
;
