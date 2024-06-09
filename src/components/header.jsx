import React from "react";

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

export function Header() {
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