import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import FeedBackForm from "./components/FeedBackForm";
import FeedBackTable from "./components/FeedBackTable";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <div>
          <Navbar/>
          <Routes>
            <Route path="/" element ={<FeedBackForm/>}/>
            <Route path="/feedbacktable" element={<FeedBackTable />}/>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
