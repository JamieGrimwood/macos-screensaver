import React from 'react';

import ImageCrossFadeFull from './ImageCrossFadeFull';

export default function App() {
    const [time, setTime] = React.useState(new Date());
    const [currentImage, setCurrentImage] = React.useState(0);
    const [joke, setJoke] = React.useState(null);

    const images = [
        'photo1.avif',
        'photo2.avif'
    ]

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1)
            console.log(currentImage + 1, images.length)
        }, 15000)

        return () => clearInterval(interval)
    }, [currentImage])

    React.useEffect(() => {
        // Update the time every second
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    React.useEffect(() => {
        fetch('https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun?blacklistFlags=nsfw,racist,sexist,explicit&type=single')
            .then(res => res.json())
            .then(json => {
                setJoke(json.joke)
            })

        setInterval(() => {
            fetch('https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun?blacklistFlags=nsfw,racist,sexist,explicit&type=single')
                .then(res => res.json())
                .then(json => {
                    setJoke(json.joke)
                })
        }, 15000)
    }, [])

    function getCurrentDateFormatted() {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const now = new Date();
        const dayOfWeek = daysOfWeek[now.getDay()];
        const month = monthsOfYear[now.getMonth()];
        const day = now.getDate();
        const daySuffix = (day) => {
            if (day > 3 && day < 21) return 'th'; // handles 11th to 19th
            switch (day % 10) {
                case 1: return "st";
                case 2: return "nd";
                case 3: return "rd";
                default: return "th";
            }
        };

        return `${dayOfWeek},\u00a0${month} ${day}${daySuffix(day)}`;
    }

    return (
        <div style={{ height: '100vh' }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 0,
                width: '100%',
                height: '100%',
            }}>
                <ImageCrossFadeFull imgUrl={images[currentImage]} />
            </div>
            <div style={{
                position: 'absolute',
                top: 50,
                left: 50,
                zIndex: 1,
            }}>
                <div style={{ width: 'fit-content' }}>
                    <div className="card">
                        <p className="time-text">
                            <span>{time.toLocaleTimeString()}</span>
                        </p>
                        <p className="day-text">{getCurrentDateFormatted()}</p>
                    </div>
                </div>
            </div>
            <div style={{
                position: 'absolute',
                bottom: 50,
                right: 50,
                zIndex: 1,
            }}>
                <div className="flex items-center justify-center bg-white border border-gray-100 rounded-lg px-4 py-2 shadow-lg h-48 w-80 text-center text-xs">
                    {joke}
                </div>
            </div>
        </div>
    )
}