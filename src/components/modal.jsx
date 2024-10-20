import React from "react";

export function DeleteModal({onClick, cancelModal}){

  return(
    <div className="fixed bg-background z-40 top-0 left-0 flex w-full">
      <div className='fixed z-30 top-0 left-0 w-full h-full backdrop-blur-sm'></div>
      <div className="absolute z-40 w-48 m-auto left-1/2 translate-x-[-50%] translate-y-[100%] bg-primary p-3 rounded-2xl">
        <h1 className='text-xl lg:text-xl text-center text-primary-foreground text-wrap pb-2'>Are you sure you want to delete this note?</h1>
        <div className='flex justify-center gap-x-2'>
          <button className='bg-popover shadow-md shadow-black text-foreground p-2 rounded-md hover:bg-destructive hover:text-destructive-foreground duration-200' onClick={onClick}>Delete</button>
          <button className='bg-popover shadow-md shadow-black text-foreground p-2 rounded-md hover:bg-secondary hover:text-secondary-foreground duration-200' onClick={cancelModal}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
