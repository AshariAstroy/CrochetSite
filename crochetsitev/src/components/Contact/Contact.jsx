import React from 'react'
import "./Contact.css"
import { FaInstagram } from "react-icons/fa";
import { GoMail } from "react-icons/go";
import { PiPhoneCall } from "react-icons/pi";
import ContactImg from "../../assets/images/contact-img.webp"
import ContactForm from './ContactForm.jsx';

import LanguageSelector from '../../locales/LanguageSelector.jsx'
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className='contact'>
        <div className='contact-img'>
          <img src={ContactImg} alt={t("contact-img")}/>
        </div>

        <div className='contact-box'>
          <h2>{t("contact-title")}</h2>
          <h5>{t("contact-subtitle")}</h5>
          <ul className='contact-list'>
              <li className='contact-item'><a href='https://www.instagram.com/star_dragon_crochet/' target='_blank'><FaInstagram className='icon'/><p>@star_dragon_crochet</p></a></li>
              <li className='contact-item'><a href='mailto:info@stardragoncrochet.com'><GoMail className='icon'/><p>info@stardragoncrochet.com</p></a></li>
              <li className='contact-item'><PiPhoneCall className='icon'/><p>+32-468-24-18-73</p></li>
          </ul>
        </div>
      </div>

      <hr className="separator" />

      <ContactForm/>
    </div>
  )
}

export default Contact