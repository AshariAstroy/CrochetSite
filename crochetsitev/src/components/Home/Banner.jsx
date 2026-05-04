import "./Banner.css";
import { useEffect, useState } from "react";
import Img1 from "../../assets/gallery-photos/pillow-many-cats-1.webp"
import Img2 from "../../assets/gallery-photos/dragons-white-ice.webp"
import Img3 from "../../assets/gallery-photos/bunnies.webp"

import LanguageSelector from '../../locales/LanguageSelector.jsx'
import { useTranslation } from "react-i18next";

const Banner = () => {
    const { t } = useTranslation();

    const images = [ Img1, Img2, Img3 ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % images.length);
        }, 4500); // change every 3s

        return () => clearInterval(interval);
    }, []);

  return (
    <div className="banner">
        {images.map((img, i) => (
            <img
                key={i}
                src={img}
                className={`banner-img ${i === index ? "active" : ""}`}
            />
        ))}

        <div className="banner-text">
            <h1>{t("greetings-1")}</h1>
            <h5>{t("undertitle")}</h5>
        </div>
    </div>
  )
}

export default Banner