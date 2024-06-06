import { useState, useEffect, useRef } from 'react'
import './App.css'
import './index.css'
import {Slide} from './components/slide.jsx'
import {NoteElement} from './components/note.jsx'
// Note app

function ButtonBack({onClick}){
  return(
    <div className='size-fit'
    onClick={onClick}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 cursor-pointer text-foreground">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </div>
  )
}


function Modal({onClick}){
  // trouver un moyen de stocker le contenu du textarea et title

  return(
    <div className='fixed z-50 top-0 left-0 w-full h-full bg-background '>
      <header className='sticky flex top-0 p-5 items-center border-b border-border'>
        <ButtonBack onClick={onClick}/>
        <input className='text-4xl pl-5 text-secondary-foreground border-none bg-transparent focus:outline-none' type='text' placeholder='Title...' />
      </header>
      <main className='flex flex-col h-full w-full '>
        <div className='w-full p-5'>
          <textarea className='w-full h-[80vh] p-5 rounded-md text-xl text-secondary-foreground bg-transparent focus:outline-none resize-none border border-border'
           placeholder='Content...'/>
        </div>
      </main>
    </div>
  )
}

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




function Main({onClick}){
  return(
    <main className='flex flex-col items-center justify-center w-full'>
      <div className='grid grid-cols-1 w-full pt-10 m-5 h-full sm:grid-cols-2 lg:grid-cols-4'>
        <NoteElement onClick={onClick}/>
        <NoteElement onClick={onClick}/>
        <NoteElement onClick={onClick}/>
        <NoteElement onClick={onClick}/>
      </div>
    </main>
  )
}

function MenuButton(){
  return(
    <button className=' flex items-center justify-center'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    </button>
  )
}

function SearchBar(){
  return(
    <button className='flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 rounded-full bg-primary text-primary-foreground">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    </button>

  )
}

function Page({onClick}){
    return(
      <>
        <Header/>
        <Main onClick={onClick}/>
      </>
    )
}

function Header() {
  return (
    <header className='sticky top-0 flex flex-row items-center justify-center w-full bg-background p-5'>
      <div className='flex w-full'>
        <MenuButton/>
        <div className='text-center w-full lg:w-fit'>
          <h1 className='text-4xl w-full lg:pl-20'>Notes</h1>
        </div>
      </div>
      <SearchBar/>
    </header>
    
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
  return (
    <div className='flex flex-col p-0'>
      <Slide visible={isPageOpen} from={{opacity: 1,x:0,y:-50}} animateEnter>
        <AddNoteButton onClick={toggleModal}/>
      </Slide>
        
      { isModalOpen && <Slide visible={!!isModalOpen} duration={300} 
        from={{opacity: 0,x:0,y:50}} >
        <Modal onClick={toggleModal} />
      </Slide>
      }
      {isPageOpen && <Slide visible={isPageOpen} duration={300} 
      from={{opacity: stateDict.opacity,x:0,y:stateDict.y}}>
        <Page onClick={toggleModal}/>
        </Slide>}
        
    </div>
  );
}


