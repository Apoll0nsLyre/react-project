import { useState, useEffect, useRef } from 'react'
import './App.css'
import './index.css'
import {Slide} from './components/slide.jsx'
import {Modal} from './components/modal.jsx'
import {Page} from './components/page.jsx'
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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPageOpen, setIsPageOpen] = useState(true)
  let stateDict = useRef({y: 0, opacity: 1}).current;
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
    setIsPageOpen(!isPageOpen)
    if (isModalOpen){
      stateDict.y = -50;
      stateDict.opacity = 0;
    }

  };

  const [notes, setNotes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault()
    toggleModal();
    const form = e.target;
    const formData = new FormData(form);
    let title = formData.get('title');
    const content = formData.get('content');
    const date = new Date();
    const today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    if (!title & !content ) {
      return;
    } else if (!title) {
      title =`Note of ${today}`;
    }
    handleAddNote({
      title,
      content,
      date
    });
    console.log(notes)
  };

  
  const handleAddNote=(noteContent) => {
    setNotes([...notes, noteContent]);
  }


  return (
    <div className='flex flex-col p-0'>
      <Slide visible={isPageOpen} from={{opacity: 1,x:0,y:-50}} animateEnter>
        <AddNoteButton onClick={toggleModal}/>
      </Slide>
        
      { isModalOpen && <Slide visible={!!isModalOpen} duration={300} 
        from={{opacity: 0,x:0,y:50}} >
        <Modal onSubmit={handleSubmit} />
      </Slide>
      }
      {isPageOpen && <Slide visible={isPageOpen} duration={300} 
      from={{opacity: stateDict.opacity,x:0,y:stateDict.y}}>
        <Page onClick={toggleModal} notes={notes}/>
        </Slide>}
        
    </div>
  );
}


