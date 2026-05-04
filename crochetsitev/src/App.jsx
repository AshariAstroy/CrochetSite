import { useState, useLayoutEffect } from 'react'
import './App.css'
import ScrollToTopBtn from "./scroll-up";
import Header from './components/Header/Header.jsx'
import Home from './components/Home/Home.jsx'
import Gallery from './components/Gallery/Gallery.jsx'
import Contact from './components/Contact/Contact.jsx'
import Footer from './components/Footer/Footer.jsx'
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

function App() {

  const Wrapper = ({ children }) => {
    const location = useLocation();

    useLayoutEffect(() => {
      // Scroll to the top of the page when the route changes
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, [location.pathname]);

    return children;
  };

  return (
    <>
    <Router>
      <Wrapper>
        <div className="app">
          <ScrollToTopBtn/>

          <Routes>
            <Route element={<Header />}>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
          </Routes>

          <Footer />
        </div>
      </Wrapper>
    </Router>
    </>
  )
}

export default App