import { fromJSON } from 'postcss';
import React, {useEffect, useState, useRef} from 'react';

const VISIBLE = 1;
const HIDDEN = 2;
const ENTERING = 3;
const LEAVING = 4;

export function Slide({
    children,
    visible,
    duration = 300,
    from,
    animateEnter = true}){
        const childRef = useRef(children);
        const [state, setState] = useState(
            visible ? (animateEnter ? ENTERING : VISIBLE) : HIDDEN);
    if (visible){
        childRef.current = children;
    }
    useEffect(() => {
        if(!visible){
            setState(LEAVING);
        } else {
            setState((s) => s === HIDDEN ? ENTERING : VISIBLE);
        }
    },[visible]);

    useEffect(() => {
        if (state===LEAVING){
            const timer = setTimeout(() => {
                setState(HIDDEN);
            }, duration);
            return () =>
                 clearTimeout(timer);
        } else if (state === ENTERING){
            setState(VISIBLE);
    }}, [state]);

    if (state === HIDDEN){
        return null;
    }

    let style = {
        transitionDuration: `${duration}ms`,
        transitionProperty : 'opacity transform',
    };
    if (state !== VISIBLE){
        if (from.opacity!==undefined){
            style.opacity = from.opacity;
        }
        style.transform = `translate(${from.x || 0}px, ${from.y || 0}px)`;
    }

    return(
      <div style={style} >
        {childRef.current}
      </div>
    )
  }