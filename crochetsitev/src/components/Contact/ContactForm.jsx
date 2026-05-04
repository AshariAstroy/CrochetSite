import { useState, useEffect } from "react";
import './ContactForm.css'
import ContactFormImg from "../../assets/images/contact-form.webp"

import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from 'react-i18next';

const ContactForm = () => {
    const { t, i18n } = useTranslation();

    const [captchaValue, setCaptchaValue] = useState(null);

    const formInitialDetails = {
        fullName: '',
        email: '',
        message: '',
    };

    const [formDetails, setFormDetails] = useState(formInitialDetails);
    const [buttonText, setButtonText] = useState(t('contact-send'));
    useEffect(() => {
        setButtonText(t('contact-send'));
    }, [i18n.language, t]);

    const [popup, setPopup] = useState(null);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState({ success: null, message: '' });

    const onFormUpdate = (category, value) => {
        setFormDetails({
            ...formDetails,
            [category]: value
        });
    };

    const showPopupMessage = (message, type = "success") => {
        setPopup({ message, type });
        setTimeout(() => setPopup(null), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonText(t('contact-send') + '...');

        const fieldLabels = {
            fullName: t('contact-form-1'),
            email: t('contact-form-2'),
            message: t('contact-form-3'),
        };

        const errorMessages = {
            fullName: 'contact-error-1',
            email: 'contact-error-2',
            message: 'contact-error-3',
        };

        const newErrors = {};

        for (const [key, value] of Object.entries(formDetails)) {
            if (!value.trim()) {
                newErrors[key] = errorMessages[key];
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setButtonText(t('contact-send'));
            return;
        }

        setErrors({});

        if (!captchaValue) {
            alert(t('contact-error-4'));
             setButtonText(t('contact-send'));
             return;
        }

        try {
            const response = await fetch("/contact-form.php", {
                method: "POST",
                headers: { "Content-Type": "application/json;charset=utf-8" },
                body: JSON.stringify({ ...formDetails, token: captchaValue }),
            });

            let result;

            try {
                // Try parsing JSON
                result = await response.json();
            } catch (err) {
                // If JSON parsing fails, fallback to text
                const text = await response.text();
                console.error("Server response was not JSON:", text);
                showPopupMessage(t('contact-error-5'), 'danger');
                setButtonText(t('contact-send'));
                return;
            }

            // Handle result safely
            if (result.code === 200) {
                setFormDetails(formInitialDetails);
                setStatus({ success: true, message: t('contact-success-1') });
                showPopupMessage(t('contact-success-1'), 'success');
            } else {
                setStatus({ success: false, message: result.status || t('contact-error-5') });
                showPopupMessage(result.status || t('contact-error-5'), 'danger');
            }

        } catch (error) {
            console.error("Fetch failed:", error);
            setStatus({ success: false, message: t('contact-error-5') });
            showPopupMessage(t('contact-error-5'), 'danger');
        }

        setButtonText(t('contact-send'));
    };

  return (
    <div className="contact_us">
        <div className="responsive-container-block bigContainer">
            <div className="responsive-container-block Container">
                <div className="responsive-cell-block wk-desk-5 wk-ipadp-4 wk-tab-12 wk-mobile-12">
                    <img className="mainImg" src={ContactFormImg} alt={t("contact-img")}/>
                </div>

                <div className="responsive-cell-block wk-desk-7 wk-ipadp-8 wk-tab-12 wk-mobile-12">
                    <p className="text-blk heading">
                        {t("contact-form-text")}
                    </p>

                    <form className="formTable" id="izml" onSubmit={handleSubmit} noValidate>

                    <div className="firstRow">
                        <div className="fullNameArea">
                        <p className="cardHead">
                            {t("contact-form-1")}
                        </p>
                        <input className="fullName" id="fullName" name="fullName" type="text" placeholder='Full Name'
                            value={formDetails.fullName}
                            onChange={(e) => onFormUpdate("fullName", e.target.value)}
                        />
                        {errors.fullName && <p className="error">{t(errors.fullName)}</p>}
                        </div>
                        <div className="emailArea">
                        <p className="cardHead">
                            {t("contact-form-2")}
                        </p>
                        <input className="email" id="email" name="email" type="text" placeholder='Email'
                            value={formDetails.email}
                            onChange={(e) => onFormUpdate("email", e.target.value)}
                        />
                        {errors.email && <p className="error">{t(errors.email)}</p>}
                        </div>
                    </div>

                    <div className="messageArea">
                        <p className="cardHead">
                            {t("contact-form-3")}
                        </p>
                        <textarea className="message" cols="30" id="message" name="message" rows="10"
                            value={formDetails.message}
                            onChange={(e) => onFormUpdate("message", e.target.value)}
                        ></textarea>
                        {errors.message && <p className="error">{t(errors.message)}</p>}
                    </div>

                    <button className="submit" href="#" id="w-c-s-bgc_p-1-dm-id-4">
                        {t('contact-send')}
                    </button>

                    <ReCAPTCHA
                        className="captcha"
                        sitekey="6LdIF9IsAAAAAHhlX1D9lezMyfY1-YOeEvPUpATG"
                        onChange={(value) => setCaptchaValue(value)}
                    />
                    </form>
                </div>
            </div>
        </div>

        {popup && (
            <div id="statusPopup">
                <div className={`status-message ${popup.type}`}>
                    {popup.message}
                </div>
            </div>
        )}
    </div>
  )
}

export default ContactForm