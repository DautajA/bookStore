import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import Course from "./components/Course";
import Signup from './components/Signup';
import CreateBook from './components/adminCRUD/CreateBook';
import { Toaster } from 'react-hot-toast';
import { useAuth } from "./context/AuthProvider";
import About from './components/About';
import Contact from './components/Contact';
import Update from './components/adminCRUD/UpdateBook';
import ReadOne from "./components/adminCRUD/ReadOne";
import Page404 from "./home/Page404";
import Category from './components/Category';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [authUser] = useAuth();

  useEffect(() => {
    console.log('authUser changed:', authUser);
  }, [authUser]);

  const isAdmin = authUser && authUser.role === 'admin';

  return (
    <>
      <div className="dark:bg=slate-900 dark:text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course" element={authUser ? <Course /> : <Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create" element={isAdmin ? <CreateBook /> : <Navigate to="/" />} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/readOne/:id" element={<ReadOne />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/category/:category" element={<Category />} />
          {/* 404 */}
          <Route path="*" element={<Page404 />} />
        </Routes>
        <Footer/>
        <Toaster />
      </div>
    </>
  );
}

export default App;




