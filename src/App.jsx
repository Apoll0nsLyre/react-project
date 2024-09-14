import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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

function SearchBar(){
  return (
    <div className='  flex justify-center items-center w-full '>
      <input type='text' className='w-1/2 h-10 rounded-md p-2 bg-input ' placeholder='Search...'/>
    </div>
  )
}


function App() {

  return (
    <div className='flex flex-col min-h-screen'>
      <header className='flex h-[100px] bg-background w-full m-auto'>
        <div className='flex h-full w-full my-auto'>
          <Hamburger/>
          <h1 className='text-3xl my-auto text-left'>Notes</h1>
          <SearchBar/>
        </div>
      </header>
      <div className='flex flex-1 bg- w-full h-full'>
        
        <div className='bg-background w-[300px] '>
            <div className='flex justify-center items-center h-20'>
              <button className='bg-primary text-primary-foreground p-2 rounded-lg text-sm '>+ Add note</button>
            </div>
            <div>

            </div>
        </div>
        <div className='p-8 w-full '>
          <form className=' h-full flex flex-col bg-card p-4'>
            <label className='p-2 text-2xl' aria-label='title'>Titre</label>
            <input type='text' name='title' className=' w-full h-10 rounded-md p-2 ' placeholder='Titre'/>
            <textarea className=' flex-1 w-full rounded-md p-2 resize-none' placeholder='Contenu'/>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App;
