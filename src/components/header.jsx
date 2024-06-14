import React from "react";
import {useState, useEffect} from 'react';
import { Slide } from "./slide.jsx";

function MenuButton(){
    return(
      <button className=' flex items-center justify-center'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
    )
}

const VISIBLE = 1;
const HIDDEN = 2;
const ENTERING = 3;
const LEAVING = 4;

function SelectMenu({visible,from,duration, animateEnter=true}){

  const [state, setState] = useState(
    visible ? (animateEnter ? ENTERING : VISIBLE) : HIDDEN);

  useEffect(() => {
    if (!visible){
      setState(LEAVING);
    } else {
      setState((s) => s === HIDDEN ? ENTERING : VISIBLE);
    }
  },[visible]);

  useEffect(() => {
    if (state === LEAVING){
      const timer = setTimeout(() => {
        setState(HIDDEN);
      }, duration);
      return () => clearTimeout(timer);
    } else if (state === ENTERING){
      setState(VISIBLE);
    }
  }, [state]);

  if (state === HIDDEN){
    return null;
  }

  let style = {
    transitionDuration: `${duration}ms`,
    transitionProperty: 'opacity, transform',
  };
  if (state !== VISIBLE){
    if (from.opacity !== undefined){
      style.opacity = from.opacity;
    }
    style.transform = `translate(${from.y ?? 0}px, ${from.x ?? 0}px)`;
  }

  return (
    <div style={style} className="z-50 absolute right-12 top-14 bg-background text-accent-foreground border-border text-lg text-center rounded-2xl cursor-pointer
      border-2">
      <ul className="">
        <li className="hover:bg-accent px-5 py-2 rounded-t-xl duration-200">Edit</li>
        <li className="hover:bg-accent px-5 py-2 rounded-b-xl duration-200">Display</li>
      </ul>
    </div>
  )
}

function KebabMenu({onClick}){
    
    return(
      <button onClick={onClick} className='flex items-center justify-center size-10 rounded-full hover:bg-accent duration-200'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
        </svg>
      </button>
    )
}

function SearchButton(onClick){
    return(
      <button onClick={onClick} className='flex items-center justify-center size-10 rounded-full hover:bg-accent duration-200'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 ">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </button>
  
    )
}

export function Header(notes){
  const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const toggleSelectMenu = () => {
    if (isSelectMenuOpen){
      setVisible(!visible);
      setTimeout(() => {
        setIsSelectMenuOpen(!isSelectMenuOpen);
      }, 300);
    }else{
      setIsSelectMenuOpen(!isSelectMenuOpen);
      setVisible(!visible);
    }
  }
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const toggleSearchBar = () => {
    setIsSearchBarOpen(!isSearchBarOpen);
  }
  return (
    <header className='sticky top-0 flex flex-row items-center justify-center w-full bg-background p-5'>
      <div className='flex w-full'>
        <MenuButton/>
        <div className='text-center w-full lg:w-fit lg:flex '>
          <h1 className='text-4xl w-full lg:pl-20'>Notes</h1>
          {notes.notes.length > 0 ? <p className='text-xl items-center w-full align-baseline text-muted-foreground italic mt-auto lg:pl-10'>{notes.notes.length} notes</p> : <p className='text-sm'>No notes</p>}
        </div>
      </div>
      <div className="absolute top-5 right-5 flex gap-x-2 flex-col sm:flex-row">
        <SearchButton onClick={toggleSearchBar}/>
        <KebabMenu onClick={toggleSelectMenu}/>
      </div>
      {isSelectMenuOpen && <SelectMenu visible={visible}
      duration={200} from={{opacity:0 ,x:-20, y:20}}/>}
    </header>
    
  )
}