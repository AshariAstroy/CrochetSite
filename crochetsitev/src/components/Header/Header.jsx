import React from 'react'
import './Header.css';
import NavBar from './NavBar/NavBar'
import { Outlet } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <section className='header-wrap'>
          <section className='header'>
                  <section className='header-top__navbar'>
                      <NavBar/>
                  </section>
              </section>
      </section>

      <main>
        <Outlet/>
      </main>
    </>
  
  )
}

export default Header