import React, { Component } from "react";
import pageUp from '../assets/pageUp.png';

const scrollTop = {
    cursor: 'pointer', 
    position: "fixed", 
    zIndex: "2", 
    bottom: "0",
    right: "0"
  }


const ScrollTop = () => {
    console.log('dfgfd')
    return (    
    <img 
        src={pageUp} 
        width="70px" 
        height="70px"  
        // eslint-disable-next-line no-restricted-globals 
        onClick={() => {window.scrollTo({top: pageXOffset, left: 0, behavior: 'smooth' })}} 
        style={scrollTop} 
        id="showScroll"
        hidden 
       />
    )      
}

export default ScrollTop;

