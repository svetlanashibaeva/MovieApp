import React, { Component } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import pageUp from '../assets/pageUp.png';

const scrollTop = {
    cursor: 'pointer', 
    position: "fixed", 
    zIndex: "2", 
    bottom: "0"
  }

const scrollToTop = () => {
    scroll.scrollToTop(); 
}

const ScrollTop = () => {
    return (
        <Link onClick={scrollToTop} style={scrollTop}><img src={pageUp}/></Link>
    )      
}

export default ScrollTop;

