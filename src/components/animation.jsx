import { useState,useEffect } from "react";
export function Animation({ children, className, animation }) {
    
    return (
      <div className={className + ' ' + animation}>
        {children}
      </div>
    );


}