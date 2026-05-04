import { useState, useEffect } from "react";
import './NavBar.css';

import Logo from '../../../assets/icons/logo.svg?react'
import LogoM from '../../../assets/icons/logoMobile.svg?react'
import { Link } from 'react-router-dom';
import { Twirl as Hamburger } from 'hamburger-react'

import LanguageSelector from '../../../locales/LanguageSelector.jsx'
import { useTranslation } from "react-i18next";


const NavBar = () => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
    useEffect(() => {
    if (open) {
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.classList.add("menu-open");
    } else {
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.classList.remove("menu-open");
    }

    return () => {
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [open]);

  return (
    <section className='navbar-section'>
        <div className='div-logo'>
          <a href='/' className='logo'><Logo className='svg'/></a>
        </div>
        <div className='div-logoMobile'>
          <a href='/' className='logoMobile'><LogoM className='svg'/></a>
        </div>

        {/* Mobile icon */}
        <Hamburger rounded size={42} distance="lg" toggled={open} toggle={setOpen}/>

        <div className={`categories ${open ? "open" : ""}`}>
            <LanguageSelector className='language-icon'/>
            
            <div className="vl"></div>

            <Link to="/" onClick={() => setOpen(false)} className="navbar-item">{t("homeNav")}</Link>

            <div className="vl"></div>

            <Link to="/gallery" onClick={() => setOpen(false)} className="navbar-item">{t("galleryNav")}</Link>
            
            <div className="vl"></div>
            
            <Link to="/contact" onClick={() => setOpen(false)} className="navbar-item">{t("contactNav")}</Link>
        </div>
        
    </section>
  )
}

export default NavBar