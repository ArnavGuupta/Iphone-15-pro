import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";

import { hightlightsSlides } from "../constants";
import { pauseImg,replayImg,playImg } from "../utils";

gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
    const videoRef = useRef([]);
    const videospanref = useRef([]);
    const videodivref = useRef([]);

    const [video, setVideo] = useState({
        isEnd: false,
        StartPlay: false,
        videoID: 0,
        isLastVideo: false,
        isPlaying: false,
    });

    const [loadeddata, setloadeddata] = useState([]);
    const { isEnd, StartPlay, videoID, isLastVideo, isPlaying } = video;

    // ✅ GSAP animation for slider transition
    useGSAP(() => {
        gsap.to("#slider", {
            transform: `translateX(${-100 * videoID}%)`,
            duration: 2,
            ease: "power2.inOut",
        });

        gsap.to("#video", {
            scrollTrigger: {
                trigger: "#video",
                toggleActions: "restart none none none",
            },
            onComplete: () => {
                setVideo((prev) => ({
                    ...prev,
                    StartPlay: true,
                    isPlaying: true,
                }));
            },
        });

        return () => {
            gsap.killTweensOf("#slider");
            gsap.killTweensOf("#video");
        };
    }, [videoID]);

    useEffect(() => {
        let currentProgress = 0;
        let span = videospanref.current;

        if (span[videoID]) {
            let anim = gsap.to(span[videoID], {
                onUpdate: () => {
                    const progress = Math.ceil(anim.progress() * 100);

                    if (progress !== currentProgress) {
                        currentProgress = progress;

                        gsap.to(videodivref.current[videoID], {
                            width:
                                window.innerWidth < 760
                                    ? "10vw" // Mobile
                                    : window.innerWidth < 1200
                                    ? "10vw" // Tablet
                                    : "4vw", // Laptop
                        });

                        gsap.to(span[videoID], {
                            width: `${currentProgress}%`,
                            backgroundColor: "white",
                        });
                    }
                },
                onComplete: () => {
                    if (isPlaying) {
                        gsap.to(videodivref.current[videoID], { width: "12px" });
                        gsap.to(span[videoID], { backgroundColor: "#afafaf" });
                    }
                },
            });

            const animUpdate = () => {
                if (videoRef.current[videoID]) {
                    anim.progress(
                        videoRef.current[videoID].currentTime / hightlightsSlides[videoID].videoDuration
                    );
                }
            };

            if (isPlaying) {
                gsap.ticker.add(animUpdate);
            } else {
                gsap.ticker.remove(animUpdate);
            }
        }
    }, [videoID, StartPlay, isPlaying]);

    useEffect(() => {
        if (loadeddata.length > 3) {
            if (!isPlaying) {
                videoRef.current[videoID]?.pause();
            } else {
                StartPlay && videoRef.current[videoID]?.play();
            }
        }
    }, [StartPlay, videoID, isPlaying, loadeddata]);

    const handleLoadedMetadata = (i, e) => setloadeddata((prev) => [...prev, e]);

    const handleProcess = (type, i) => {
        let nextID = Math.min(videoID + 1, hightlightsSlides.length - 1);

        switch (type) {
            case "video-end":
                setVideo((prev) => ({
                    ...prev,
                    isEnd: true,
                    videoID: nextID,
                }));

                setTimeout(() => {
                    if (videoRef.current[nextID]) {
                        videoRef.current[nextID].play();
                    }
                }, 500);
                break;

            case "video-last":
                setVideo((prev) => ({
                    ...prev,
                    isLastVideo: true,
                    videoID: Math.min(i + 1, hightlightsSlides.length - 1),
                }));
                break;

            case "video-reset":
                setVideo({ isEnd: false, StartPlay: false, videoID: 0, isLastVideo: false, isPlaying: false });
                break;

            case "play":
            case "pause":
                setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying, isLastVideo: false }));
                break;

            default:
                return video;
        }
    };

    return (
        <>
            <div className="flex items-center">
                {hightlightsSlides.map((list, i) => (
                    <div key={list.id} id="slider" className="sm:pr-20 pr-10 relative">
                        <div className="video-carousel_container">
                            <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                                <video
                                    id="video"
                                    muted
                                    playsInline
                                    preload="auto"
                                    className={`${list.id === 2 ? "translate-x-44" : ""} pointer-events-none`}
                                    ref={(el) => (videoRef.current[i] = el)}
                                    onPlay={() => setVideo((prev) => ({ ...prev, isPlaying: true }))}
                                    onLoadedMetadata={(e) => handleLoadedMetadata(i, e)}
                                    onEnded={() => handleProcess(i === hightlightsSlides.length - 1 ? "video-last" : "video-end", i)}
                                >
                                    <source src={list.video} type="video/mp4" />
                                </video>
                            </div>

                            {/* Text overlay */}
                            <div className="absolute top-12 left-[5%] z-10 text-white">
                                {list.textLists.map((text) => (
                                    <p key={text} className="text-lg font-semibold">{text}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Progress Dots */}
            <div className="relative flex-center mt-10">
                <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur relative cursor-pointer rounded-full">
                    {videoRef.current.map((_, i) => (
                        <span
                            key={i}
                            ref={(el) => (videodivref.current[i] = el)}
                            className="mx-2 w-3 h-3 rounded-full bg-gray-200 relative cursor-pointer"
                        >
                            <span className="absolute w-full h-full rounded-full bg-blue-500" ref={(el) => (videospanref.current[i] = el)}></span>
                        </span>
                    ))}
                </div>

                {/* Play/Pause/Replay Button */}
                <button className="p-2 bg-gray-300 rounded-full ml-4" onClick={() => handleProcess(isLastVideo ? "video-reset" : isPlaying ? "pause" : "play")}>
                    <img src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg} alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"} />
                </button>
            </div>
        </>
    );
};

export default VideoCarousel;