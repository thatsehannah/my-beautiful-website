"use client";

import React, { MouseEvent, useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";
import Image from "next/image";
import gsap from "gsap";

const Story = () => {
  const frameRef = useRef<HTMLImageElement>(null);

  const handleMouseLeave = () => {
    const element = frameRef.current;

    gsap.to(element, {
      duration: 0.3,
      rotateX: 0,
      rotateY: 0,
      ease: "power1.inOut",
    });
  };

  const handleMouseMove = (e: MouseEvent<HTMLImageElement>) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    //this calculates the center of the image
    const rect = element.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPersepctive: 500,
      ease: "power1.inOut",
    });
  };

  return (
    <section
      id='story'
      className='min-h-dvh w-screen bg-black text-blue-50'
    >
      <div className='flex size-full flex-col items-center py-10 pb-24'>
        <p className='font-general text-sm uppercase md:text-[10px]'>
          the multiversal ip world
        </p>
        <div className='relative size-full'>
          <AnimatedTitle
            title='The story of a hidden realm'
            containerClass='mt-5 pointer-events-none mix-blend-difference relative z-10'
          />
          <div className='story-img-container'>
            <div className='story-img-mask'>
              <div className='story-img-content'>
                <Image
                  ref={frameRef}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                  src='/img/entrance.webp'
                  alt='entrance'
                  fill
                  quality={100}
                  className='object-contain rounded-lg'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
