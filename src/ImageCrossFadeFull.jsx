import React, { useEffect, useState } from "react"
import wait from "waait"

const ImageCrossFade = ({ imgUrl, width, height }) => {
    const [fadeIn, setFadeIn] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [loadedImage, setLoadedImage] = useState(imgUrl)

    useEffect(() => {
        setLoaded(false)
        setFadeIn(true)
    }, [imgUrl])

    return (
        <div className={`w-full w-screen h-screen`}>
            {fadeIn && (
                <img
                    onLoad={() => {
                        setLoaded(true)
                        wait(1100).then(() => {
                            setLoadedImage(imgUrl)
                        })
                    }}
                    alt=""
                    src={imgUrl}
                    priority
                    width={100000}
                    height={100000}
                    className={`w-screen h-screen absolute z-10 rounded transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}
                />
            )}
            {
                loadedImage && (<img
                    onLoad={() => {
                        setFadeIn(false)
                    }}
                    alt=""
                    src={loadedImage}
                    priority
                    width={100000}
                    height={100000}
                    className={`w-screen h-screen`}
                />)
            }
        </div>
    )
}

export default React.memo(ImageCrossFade)