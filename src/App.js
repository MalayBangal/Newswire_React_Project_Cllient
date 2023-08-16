import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./components/Home";
import EditNews from "./components/EditNews";
import NewNews from "./components/NewNews";
import ShowNews from "./components/ShowNews";
import Contact from "./components/Contact";
import Container from 'react-bootstrap/Container';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/style/style.css'
import NavbarBasic from "./components/Navbar";

function App() {
  return (
  
    <React.Fragment>
      <BrowserRouter>
        <Container>
          <NavbarBasic/>
              <ToastContainer/>
              <Routes>

                 <Route path="/" element={<Home/>} />
                  <Route path="/news/new" element={<NewNews/>} />
                 <Route path="/news/:id" element={<ShowNews/>} />
                  <Route path="/news/:id/edit" element={<EditNews/>} />
                 <Route path="/contact" element={<Contact/>}/>

              </Routes>
        </Container>
      </BrowserRouter>
    </React.Fragment>
   
  );
}

export default App;
