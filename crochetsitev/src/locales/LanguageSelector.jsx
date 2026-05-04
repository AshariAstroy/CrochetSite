import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import enFlag from '../assets/icons/united-kingdom-flag-icon.svg';
import nlFlag from '../assets/icons/netherlands-flag-icon.svg';
import '../i18n';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 900);

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

const LanguageSelector = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { i18n, t } = useTranslation();

  const isMobile = useIsMobile();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
    setOpen(false);
  };

  /* load saved language */
  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  /* click outside */
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {isMobile ? (
        /* MOBILE*/
        <div className="language-inline">
          <button onClick={() => changeLanguage("en")}>
            <img src={enFlag} alt={t("lang-en")} className="language-icon" />
          </button>

          <div className="separator"></div>

          <button onClick={() => changeLanguage("nl")}>
            <img src={nlFlag} alt={t("lang-nl")} className="language-icon" />
          </button>
        </div>
      ) : (
        /* DESKTOP: dropdown */
        <div ref={ref} className={`language-switcher ${open ? "open" : ""}`}>
          
          {/* current language */}
          <button onClick={() => setOpen(prev => !prev)}>
            <img
              src={i18n.language === "en" ? enFlag : nlFlag}
              alt={i18n.language === "en" ? t('lang-en') : t('lang-nl')}
              className="language-icon"
            />
          </button>

          {/* dropdown */}
          <div className="dropdown">
            {i18n.language !== "en" && (
              <button onClick={() => changeLanguage("en")}>
                <img src={enFlag} alt={t("lang-en")} className="language-icon" />
              </button>
            )}

            {i18n.language !== "nl" && (
              <button onClick={() => changeLanguage("nl")}>
                <img src={nlFlag} alt={t("lang-nl")} className="language-icon" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LanguageSelector;