import React,{useState,useEffect} from 'react';
import Nav from "../nav/nav";
import { Link } from 'react-router-dom';
import axios from "axios";

const URL = "http://localhost:5001/mainhome";


function MainHome() {

  //display
 
  return (
    <div>
      
      <Link to={`/adminhome`}><button>Admin Page</button></Link>
      <Link to={`/customerhome`}><button>Customer Page</button></Link>
      
    </div>
  )
}

export default MainHome