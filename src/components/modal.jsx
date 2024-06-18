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

function DeleteButton({onClick}){
  return (
    <button onClick={onClick} className='rounded-full bg-primary text-primary-foreground  hover:text-foreground-destructive p-2 hover:bg-destructive duration-200'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>
    </button>
  )
};
export function DeleteModal({onClick, onDelete}){

  return(
    <div className="fixed bg-background z-30 top-0 left-0 flex w-full">
      <div className='fixed z-30 top-0 left-0 w-full h-full backdrop-blur-sm'></div>
      <div className="absolute z-40 w-[200px] m-auto left-1/2 translate-x-[-50%] translate-y-[100%] bg-primary p-3 rounded-2xl">
        <h1 className='text-xl lg:text-xl text-center text-primary-foreground text-wrap pb-2'>Are you sure you want to delete this note?</h1>
        <div className='flex justify-center gap-x-2'>
          <button className='bg-popover text-foreground p-2 rounded-md hover:bg-destructive hover:text-destructive-foreground duration-200' onClick={onDelete}>Delete</button>
          <button className='bg-popover text-foreground p-2 rounded-md hover:bg-secondary hover:text-secondary-foreground duration-200' onClick={onClick}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
export function Modal({onSubmit, note,onClick}){

  return(
      <div className='fixed z-10 top-0 left-0 w-full h-full bg-background '>
        <div className="fixed top-5 right-5 z-10">
          <DeleteButton onClick={onClick} />
        </div>
        <form action="" onSubmit={onSubmit}>
            <header className='sticky flex top-0 p-5 h-fit items-center border-b border-border'>
            <ButtonBack/>
            <input name='title' className='text-2xl pl-5 w-3/4 text-secondary-foreground text-start border-none bg-transparent focus:outline-none' type='title' placeholder='Title...'
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