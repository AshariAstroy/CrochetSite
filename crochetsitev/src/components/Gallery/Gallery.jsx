import {useState} from 'react';
import './Gallery.css';
import { galleryData } from "./Data";
import { IoClose } from "react-icons/io5";

const Gallery = () => {

    const [model, setModel] = useState(false);
    const [tempImage, setTempImage] = useState('');

    const getImg = (img) => {
        setTempImage(img);
        setModel(true);
    }

    const preload = (src) => {
        const img = new Image();
        img.src = src;
    };

    galleryData.slice(0, 3).forEach(item => preload(item.image));
    return (
        <section>
            <div className={model? "model open": "model"}>
                <img className="gallery-img" src={tempImage}/>
                <IoClose onClick={() => setModel(false)}/>
            </div>

            <div className="gallery">
                {galleryData.map((item) => {
                    return (
                        <div className="images" key={item.id} onClick={() => getImg(item.image)}>
                            <img className="gallery-img" src={item.image} alt={item.alt} loading="lazy"/>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Gallery