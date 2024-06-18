import React from 'react';

export function NoteElement({onClick,title,content, date,id}){
    return(
      <div onClick={onClick} id={id} className='flex flex-col mx-auto py-2 text-center w-fit cursor-pointer text-wrap '>
        <h1 name="title" className='text-xl  w-[200px] h-[30px] m-auto truncate'>{title}</h1>
        <p name='date' className='text-sm'>{date}</p>
        <div id={id} className='border-2 h-40 sm:h-44 lg:h-64 w-40 sm:w-40  lg:w-60 border-border mx-auto rounded-2xl
         text-left shadow-md shadow-primary hover:shadow-none ease-in-out duration-150 bg-card truncate '>
          <div className='h-[inherit]'>
          <p name='content' className=' items-center m-4 mt-2 break-words text-wrap h-32 sm:h-44 lg:h-64 '>{content}</p>
          </div>
             
        </div>
      </div>
    )
}