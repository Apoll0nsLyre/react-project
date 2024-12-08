import { useState, useEffect } from 'react'
import {DeleteModal} from './components/modal.jsx'
import { Animation } from './components/animation.jsx';
import { NoteEditor } from './components/editor.jsx';
import { Arrow, Hamburger } from './components/icons.jsx';
import { SearchBar, SearchResults } from './components/search.jsx';
import { NotesPage } from './components/notes.jsx';
import { setLocalStorageItem, getLocalStorageItem } from './data/data.jsx';
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import { use } from 'react';

export default function App() {

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
    if (width > 768) {
      setSideNotesPage(true);
      setSlide('');
    }
  },[window.innerWidth]);

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

const [fadeModal, setFadeModal] = useState('');
const cancelModal = (e) => {
  e.preventDefault();
  setFadeModal('fade-out');
  setTimeout(() => {
    setShowModal(false);
  }
  , 190);
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
const newNote = () => {
  if (sideNotesPage && width < 768) {
    toggleSideNotesPage();
  }
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
    if (notesPage && !e.target.classList.contains('delete-button')) {
      hideNotesPage();
    }
    if (sideNotesPage && width < 768) {
      toggleSideNotesPage();
    }
    const noteClicked = e ? e.target.id : '';
    const note = notes.find((note) => note.key === noteClicked);
    if (e.target.classList.contains('delete-button')) {
      setShowModal(true);
      setFadeModal('fade-in');
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
    const [fadeSearch, setFadeSearch] = useState('');  

    const hideSearchModal = () => {
      setFadeSearch('fade-out');
      setTimeout(() => {
        setSearchModal(false);
      }, 190);
      
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
    const [sideNotesPage, setSideNotesPage] = useState(true);
    const [slide, setSlide] = useState('');
    const showNotesPage = () => {
      setFade('fade-in');
      console.log(fade);
      setNotesPage(true);
    }
    const hideNotesPage = () => {
      setNotesPage(false);
    }

    const toggleSideNotesPage = () => { 
      if (sideNotesPage) {
        setSlide('slide-out');
        setTimeout(() => {
          setSideNotesPage(false);
        }, 290);
      }
      else {
        setSlide('slide-in');

        setSideNotesPage(true);
        
      }
    }

    useEffect(() => {
      
      const width = window.innerWidth;
      if (width > 768) {
        setSideNotesPage(true);
      } else {
        setSideNotesPage(false);
      }
    },[ window.innerWidth]);

  return (
    <div className='flex flex-col min-h-screen bg-background'>
      { showModal &&
      <Animation className='absolute z-40 top-0 left-0 w-full h-full' animation={fadeModal}>
        <DeleteModal onClick={deleteNote} cancelModal={cancelModal} animation={fadeModal}/>
      </Animation>
      }
      <header className='flex h-[100px] bg-card w-full m-auto shadow-md shadow-black z-10 text-foreground'>
        <div className='flex h-full w-full my-auto '>
          <Hamburger onClick={toggleSideNotesPage} className={'my-auto p-4 cursor-pointer block md:hidden'}/>
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
          <NoteEditor newNote={newNote} animation2={slide} animation={fade} currentNote={currentNote} addNote={addNote}
           onChangeNote={onChangeNote} notes={notes} sideNotesPage={sideNotesPage} toggleNotesPage={showNotesPage} clickedNote={clickedNote}/>
          }
         
      </div>
    </div>
  )
}
;
