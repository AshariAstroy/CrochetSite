import { useEffect, useState } from "react";
import { FiArrowUpCircle } from "react-icons/fi";


function ScrollToTopBtn() {
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  function handleScroll() {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;

    setShowScrollBtn(scrollTop > 0);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={showScrollBtn ? "btn-visible" : "btn-hidden"}
      onClick={() => scrollToTop()}
    >
        <FiArrowUpCircle className="scroll-up"/>
    </button>
  );
}

export default ScrollToTopBtn;