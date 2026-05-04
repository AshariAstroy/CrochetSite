import React from 'react'
import "./Footer.css"

const Footer = () => {
  return (
    <section className='footer-wrap'>
      <section className='footer'>
        <div className='footer-box'>
            <p>Star Dragon Crochet @ All rights belong to whoever they belong. {new Date().getFullYear()}</p>
        </div>
      </section>
    </section>
  )
}

export default Footer