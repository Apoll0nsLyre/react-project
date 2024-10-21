import { useState,useEffect } from "react";

export function Animation({ children, id, className, animation}) {
    
    return (
      <div id={id} className={className + ' ' + animation }>
        {children}
      </div>
    );


}