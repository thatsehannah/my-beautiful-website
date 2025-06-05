"use client";

import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const nextVideoRef = useRef<HTMLVideoElement>(null);
  const loadedVideoSet = useRef<Set<HTMLVideoElement>>(new Set());

  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  const handleMiniVideoClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  const handleVideoLoad = (video?: HTMLVideoElement) => {
    if (video && !loadedVideoSet.current.has(video)) {
      loadedVideoSet.current.add(video);
      setLoadedVideos((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const videos = document.querySelectorAll("video");

    videos.forEach((video) => {
      if (video.readyState >= 3) {
        handleVideoLoad(video);
      } else {
        video.addEventListener("loadeddata", () => handleVideoLoad(video), {
          once: true,
        });
      }
    });

    return () => {
      videos.forEach((video) => {
        video.removeEventListener("loadeddata", () => {});
      });
    };
  });

  useEffect(() => {
    console.log("Loaded videos count:", loadedVideos);

    if (loadedVideos === totalVideos - 1) {
      console.log("All videos loaded my guy.");

      setIsLoading(false);
    }
  }, [loadedVideos]);

  //animation for changing the background video
  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => {
            if (nextVideoRef.current !== null) {
              void nextVideoRef.current.play();
            }
          },
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  //animation for scrolling past the hero section
  //"Animate from the values given in the from() to whatever is defined in set()"
  useGSAP(() => {
    gsap.set("#video-frame", {
      //defines what #video-frame will animate TO
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0 0 40% 10%",
    });
    gsap.from("#video-frame", {
      //defines what #video-frame will animate FROM
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame", //element to watch for scrolling
        start: "center center", //animation starts when the center of the #video-frame element aligns with the center of the viewport
        end: "bottom center", //animation finishes when the bottom of the #video-frame element aligns with the center of the viewport
        scrub: true,
      },
    });
  });

  const getVideoSrc = (index: number) => `videos/hero-${index}.mp4`;

  return (
    <div className='relative h-dvh w-screen overflow-x-hidden'>
      {isLoading && (
        <div className='flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50'>
          <div className='three-body'>
            <div className='three-body__dot' />
            <div className='three-body__dot' />
            <div className='three-body__dot' />
          </div>
        </div>
      )}
      <div
        id='video-frame'
        className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'
      >
        <div>
          <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
            <div
              onClick={handleMiniVideoClick}
              className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'
            >
              <video
                src={getVideoSrc(upcomingVideoIndex)}
                ref={nextVideoRef}
                loop
                muted
                id='current-video'
                className='size-64 origin-center scale-150 object-cover object-center'
              />
            </div>
          </div>
          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id='next-video'
            className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
          />
          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            className='absolute left-0 top-0 size-full object-cover object-center'
          />
        </div>
        <h1 className='hero-heading absolute bottom-5 right-5 z-40 text-blue-75'>
          Gaming
        </h1>
        <div className='absolute left-0 top-0 z-40 size-full'>
          <div className='mt-24 px-5 sm:px-10'>
            <h1 className='hero-heading text-blue-100'>redefine</h1>
            <p className='mb-5 max-w-64 font-robert-regular text-blue-100'>
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>
            <Button
              id='watch-trailer'
              title='watch trailer'
              leftIcon={<TiLocationArrow />}
              containerClass='bg-yellow-300 flex-center gap-1'
            />
          </div>
        </div>
      </div>
      <h1 className='hero-heading absolute bottom-5 right-5 text-black'>
        Gaming
      </h1>
    </div>
  );
};

export default Hero;
