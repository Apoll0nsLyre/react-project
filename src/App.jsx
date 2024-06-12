import { useState, useEffect, useRef } from 'react'
import './App.css'
import './index.css'
import {Slide} from './components/slide.jsx'
import {Modal} from './components/modal.jsx'
import {Page} from './components/page.jsx'
import { v4 as uuidv4 } from 'uuid';
// Note app


function AddNoteButton({onClick}){
  return(
      <button type='button' className='fixed z-50 right-10 bottom-10 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground
      shadow-md shadow-primary hover:shadow-none ease-in-out duration-150'
      onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
      </button>
  )
}



export default function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Nettoyage de l'intervalle lorsque le composant est démonté
    return () => clearInterval(interval);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPageOpen, setIsPageOpen] = useState(true)
  let stateDict = useRef({y: 0, opacity: 1}).current;
  const toggleModal = (e) => {
    const noteClicked = e ? e.target.parentElement.id : null;
    console.log(noteClicked);
    const note = notes.find((note) => note.key === noteClicked);
    const title = note ? note.title : '';
    const content = note ? note.content : '';
    const key = note ? note.key : '';
    const date = note ? note.date : '';
    if (note) {
      setCurrentNote({
        title,
        content,
        key,
        date
      });
    } else {
      setCurrentNote({
        title: '',
        content: '',
        key: '',
        date: ''
      });
    }
    setIsModalOpen(!isModalOpen)
    setIsPageOpen(!isPageOpen)
    if (isModalOpen){
      stateDict.y = -50;
      stateDict.opacity = 0;
    }

  };

  const handleSubmit = (e) => {
    e.preventDefault()
    toggleModal();
    const form = e.target;
    const formData = new FormData(form);
    let title = formData.get('title');
    const content = formData.get('content');
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const date = hours + ':' + minutes;
    const key = currentNote.key ? currentNote.key : uuidv4();
    if (!title & !content ) {
      return;
    } else if (!title) {
      title =`Note of ${today}`;
    } else if (key === currentNote.key) {
      const newNotes = notes.map((note) => {
        if (note.key === key) {
          return {
            title,
            content,
            date,
            key
          };
        } else {
          return note;
        }
      });
      setNotes(newNotes);
    }else {
      handleAddNote({
        title,
        content,
        key,
        date
      });
    }
  };

  const [notes, setNotes] = useState(() => {
    if (localStorage.getItem('notes')) {
      return JSON.parse(localStorage.getItem('notes'));
    } else {
      return [];
    }
  });

  const [currentNote, setCurrentNote] = useState({
    title: '',
    content: '',
    key: '',
    date: ''
  });


  const handleAddNote=(note) => {
    setNotes([...notes, note]);
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('notes'));
    if (data) {
      setNotes(data);
    }
  },[]);

  useEffect(() => {
    window.localStorage.setItem('notes', JSON.stringify(notes));
  },[notes]);

  return (
    <div className='flex flex-col p-0'>
      <Slide visible={isPageOpen} from={{opacity: 1,x:0,y:-50}} animateEnter>
        <AddNoteButton onClick={toggleModal}/>
      </Slide>

      { isModalOpen && <Slide visible={!!isModalOpen} duration={300}
        from={{opacity: 0,x:0,y:50}} >
        <Modal onSubmit={handleSubmit} note={currentNote}/>
      </Slide>
      }
      {isPageOpen && <Slide visible={isPageOpen} duration={300}
      from={{opacity: stateDict.opacity,x:0,y:stateDict.y}}>
        <Page onClick={toggleModal} notes={notes} />
        </Slide>}

    </div>
  );
}


