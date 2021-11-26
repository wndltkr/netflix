import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {Register, Login, Home, Detail, Recommend, NotFound} from 'pages'
import './index.css'

const App = () => {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/detail" element={<Detail/>}/>
          <Route path="/recommend" element={<Recommend/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
    );
  };
  
  ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById("app"));