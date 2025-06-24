"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React from "react";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center", //animation starts when the center of the #clip element aligns with the center of the viewport
        end: "+=800 center", //the scroll animation ends 800 pixels after the start point, maintaining the same vertical alignment
        scrub: 0.5, //syncs the animation progress with the scroll position (0.5 second easing delay between the scroll and the animation catching up)
        pin: true, //enables the element to stay in place while the user scrolls
        pinSpacing: true, //adds extra spacing below the element so content below doesn't interfere
      },
    });

    clipAnimation.to("#aboutImage", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div
      id='about'
      className='min-h-screen w-screen '
    >
      <div className='relative mb-8 mt-36 flex flex-col items-center gap-5'>
        <h2 className='font-general text-sm uppercase md:text-[10px]'>
          Welcome to Zentry
        </h2>
        <AnimatedTitle
          title="Discover the world's <br /> largest shared adventure"
          containerClass='mt-5 !text-black text-center'
        />
        <div className='about-subtext'>
          <p>The Game of Games begins-your life, now an epic MMORPG</p>
          <p>Zentry unites every player from countless games and platforms</p>
        </div>
      </div>
      <div
        className='h-dvh w-screen'
        id='clip'
      >
        <div
          id='aboutImage'
          className='mask-clip-path about-image'
        >
          <Image
            src='/img/about.webp'
            alt='background'
            className='absolute left-0 top-0 size-full object-cover'
            fill
          />
        </div>
      </div>
    </div>
  );
};

export default About;
