import { useState } from "react";

function SecretButton() {
    const [clicks, setClicks] = useState(0);

    const handleClick = () => {
        const newCount = clicks + 1;

        if (newCount >= 7) {
            window.open(
                "https://www.youtube.com/watch?v=7Ex7euRwMLU",
                "_blank"
            );

            setClicks(0); // reset counter
        } else {
            setClicks(newCount);
        }
    };

    return (
        <button className="easter-egg" onClick={handleClick}>
            <h2>:)</h2>
        </button>
    );
}

export default SecretButton;