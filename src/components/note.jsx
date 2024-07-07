import React from 'react';

export function NoteElement({onClick,title,content, date,id}){
    return(
      <div onClick={onClick} id={id} className=' flex flex-col mx-auto my-2 text-center cursor-pointer text-wrap rounded-2xl'>
        <h1 name="title" className=' text-xl w-40 sm:w-40 lg:w-60 h-[30px] mx-auto truncate'>{title}</h1>
        <p name='date' className='text-sm'>{date}</p>
        <div id={id} className='border-2 h-40 sm:h-44 lg:h-64 w-40 sm:w-40 lg:w-60 border-border mx-auto rounded-2xl
         text-left shadow-md shadow-primary hover:shadow-none ease-in-out duration-150 bg-card truncate '>
          <p name='content' className=' items-center m-4 mt-2 break-words text-wrap h-32 sm:h-44 lg:h-64 w-fit'>{content}</p>
          </div>
      </div>
    )
}