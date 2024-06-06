import React from 'react'

export function NoteElement({onClick}){
    return(
      <div onClick={onClick} className='flex flex-col mx-auto text-center w-fit cursor-pointer '>
        <h1 className='text-xl'>Title</h1>
        <div className=' border-2 h-64 border-border w-60 mx-auto rounded-2xl text-left shadow-md shadow-primary hover:shadow-none ease-in-out duration-150
         bg-card '>
          <p className='m-4'>Content just here</p>
        </div>
      </div>
    )
  }