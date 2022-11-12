import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
import Contract from "./pages/contracts/contract";
import AddContract from "./pages/contracts/new-contract/add-contract";
import EditContract from "./pages/contracts/edit-contract/edit-contract";
import Milestone from "./pages/milestones/milestone";
import Navbar from "./components/Navbar";
import { AlertProvider } from "./common/providers/AlertContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <AlertProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/contract/edit" exact element={<EditContract />} />
            <Route path="/contract/add" exact element={<AddContract />} />
            <Route path="/contract" element={<Contract />}></Route>
            <Route path="/milestone" element={<Milestone />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </AlertProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
