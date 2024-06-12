import React from "react";

function ButtonBack(){
    return(
      <div className="flex" type="submit" >
        <button className='size-fit' type="submit">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 cursor-pointer text-foreground">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
        </button>
      </div>
    )
  }
  
  
export function Modal({onSubmit, note}){

  return(
      <div className='fixed z-50 top-0 left-0 w-full h-full bg-background '>
      <form action="" onSubmit={onSubmit}>
          <header className='sticky flex top-0 p-5 h-fit items-center border-b border-border'>
          <ButtonBack/>
          <input name='title' className='text-2xl pl-5 w-full text-secondary-foreground text-start border-none bg-transparent focus:outline-none' type='title' placeholder='Title...'
          id='title' defaultValue={note ? note.title : '' } maxLength="50"/>
          </header>
          <main className='flex flex-col h-full w-full '>
            <div className='w-full p-5'>
                <textarea className='w-full h-[80vh] p-5 rounded-md text-xl text-secondary-foreground bg-transparent focus:outline-none resize-none border border-border'
                placeholder='Content...' name='content' id='content' type='content' defaultValue={note ? note.content : ''}/>
            </div>
          </main>
      </form>
      </div>
  )
}