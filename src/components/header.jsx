import React from "react";
import {useState, useEffect, useRef} from 'react';

function MenuButton(){
    return(
      <button className='z-10 flex items-center justify-center'>
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

function SelectMenu({visible,from,duration, animateEnter=true, properties={property:"opacity, transform"} }){

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
    transitionProperty: properties.property,
  };
  if (state !== VISIBLE){
    if (from.opacity !== undefined){
      style.opacity = from.opacity;
    }
    style.transform = `translate(${from.y ?? 0}px, ${from.x ?? 0}px)`;
  }

  return (
    <div style={style} id="select-menu" className="z-50 absolute right-7 top-9 bg-background text-popover-foreground border-border text-lg text-center rounded-2xl cursor-pointer
      border-2">
      <ul id="select-menu" className="">
        <li className="hover:bg-accent px-5 py-2 rounded-t-xl duration-200">Edit</li>
        <li className="hover:bg-accent px-5 py-2 rounded-b-xl duration-200">Display</li>
      </ul>
    </div>
  )
}

function KebabMenu({onClick}){
    
    return(
      <button id="select-menu"  onClick={onClick} className='z-10 right-5 flex items-center justify-center size-10 rounded-full hover:bg-accent duration-200'>
        <svg id="select-menu" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
          <path id="select-menu" strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
        </svg>
      </button>
    )
}

function SearchButton({onClick}){
    return(
      <button onClick={onClick} className='z-10 flex items-center justify-center size-10 rounded-full hover:bg-accent duration-200'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 ">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </button>
  
    )
}

function SearchBar(){
    return(
      <div className='fixed top-0 left-[50%] -translate-x-1/2 h-full w-full flex items-center'>
        <div className="backdrop-blur-sm opacity-50 bg-background w-full h-full absolute"></div>
        <input className='z-10 h-10 rounded-full bg-input text-left text-secondary-foreground focus:outline-none pr-5 pl-5 mx-auto drop-shadow-md' type='text' placeholder='Search...'/>
      </div>
    )
}

export function Header(notes){
  const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  
  const [visibleSearchBar, setVisibleSearchBar] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const toggleSearchBar = () => {
    if (isSearchBarOpen){
      setVisibleSearchBar(!visibleSearchBar);
      setIsSearchBarOpen(!isSearchBarOpen);
    } else {
      setIsSearchBarOpen(!isSearchBarOpen);
      setVisibleSearchBar(!visibleSearchBar);
    }
  };

  const toggleSelectMenu = () => {
    if (isSelectMenuOpen){
      setVisible(!visible);
      setTimeout(() => {
        setIsSelectMenuOpen(!isSelectMenuOpen);
      }, 300);
    } else {
      setIsSelectMenuOpen(!isSelectMenuOpen);
      setVisible(!visible);
    }
  };
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!menuRef.current.contains(event.target)){
        setVisible(false);
        setTimeout(() => {
          setIsSelectMenuOpen(false);
        }, 300);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuRef]);
  return (
    <header className='sticky top-0 flex flex-row items-center justify-center w-full h-28 p-5 backdrop-blur-sm'>
      <div className="absolute w-[inherit] -z-10 bg-background opacity-50 h-full"></div>
      <div className='flex w-full'>
        <MenuButton/>
        <div className='text-center w-full lg:w-fit lg:flex '>
          <h1 className='text-4xl w-full lg:pl-20'>Notes</h1>
          {notes.notes.length > 0 ? <p className='text-xl items-center w-full align-baseline text-muted-foreground italic mt-auto lg:pl-10'>
            {notes.notes.length} notes</p> : <p className='text-sm'>No notes</p>}
        </div>
      </div>
      <div className="relative flex gap-x-2 flex-col sm:flex-row">
        <div ref={menuRef} className="flex gap-x-2">
          {isSearchBarOpen && <SearchBar/>}
          <SearchButton onClick={toggleSearchBar}/>
        </div>
        <div ref={menuRef} className="flex gap-x-2">
          <KebabMenu onClick={toggleSelectMenu}/>
          {isSelectMenuOpen && <SelectMenu visible={visible}
            duration={200} from={{opacity:0 ,x:-20, y:20}}/>}
        </div>
      </div>
    </header>
    
  )
}