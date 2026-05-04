import React from 'react'
import './Home.css'
import Dinos from "../../../src/assets/gallery-photos/dinos-purple-green.webp"
import Banner from './Banner.jsx'
import Egg from '../../SecretButton.jsx'
import { Link } from 'react-router-dom';

import LanguageSelector from '../../locales/LanguageSelector.jsx'
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className='home'>
      <Banner/>
      
      <div className='section1'>
        <img src={Dinos}/>

        <div className='description-box'>
          <h2>{t("greetings-2")}<Egg/></h2>

          <ul className='about-me'>
            <li>{t("list-item-1")}</li>
            <li>{t("list-item-2")}</li>
            <li>{t("list-item-3")}</li>
            <li>{t("list-item-4")}</li>
            <li>{t("list-item-5")}</li>
          </ul>

          <div className="button-box">
            <Link to="/gallery" className="home-button">{t("galleryNav")}</Link>
            <Link to="/contact" className="home-button">{t("contactNav")}</Link>
          </div>
        
        </div>
      </div>
    </div>
  )
}

export default Home