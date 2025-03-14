import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { smallHeroVideo, heroVideo } from "../utils";
import { useEffect, useState } from "react";

const Hero = () => {
  // State to track the video source
  const [videosrc, setVideosrc] = useState(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo
  );

  // Function to update video source on window resize
  useEffect(() => {
    const handleVideosrcSet = () => {
      setVideosrc(window.innerWidth < 760 ? smallHeroVideo : heroVideo);
    };

    window.addEventListener("resize", handleVideosrcSet);
    
    return () => {
      window.removeEventListener("resize", handleVideosrcSet);
    };
  }, []);

  // GSAP animation
  useGSAP(() => {
    gsap.to("#hero", { opacity: 1, delay: 1.5 });
    gsap.to("#cta", { opacity: 1, delay: 2, y: 0, ease: "power2.out" }); // CTA fades in properly
  }, []);

  return (
    <section className="w-full h-screen bg-black relative flex flex-col items-center justify-center">
      <div className="h-5/6 w-full flex flex-col items-center justify-center">
        <p id="hero" className="hero-title opacity-0">
          iPhone 15 Pro
        </p>
        <div className="md:w-10/12 w-9/12 flex justify-center">
          <video autoPlay muted playsInline key={videosrc} className="pointer-events-none w-full h-auto object-contain">
            <source src={videosrc} type="video/mp4" />
          </video>
        </div>
      </div>
      
      {/* CTA Section */}
      <div id="cta" className="flex flex-col items-center opacity-0 translate-y-2">
        <a href="#Highlights" className="btn">Buy</a>
        <p className="text-xl font-size 1rem text-white">from $199/month or $999</p>
      </div>
    </section>
  );
};

export default Hero
