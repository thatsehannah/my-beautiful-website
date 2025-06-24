"use client";

import React, { MouseEvent, ReactNode, useRef, useState } from "react";
import BentoCard from "./BentoCard";
import { TiLocationArrow } from "react-icons/ti";

type BentoTiltProps = {
  children: ReactNode;
  className: string;
};

const BentoTilt = ({ children, className = "" }: BentoTiltProps) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 15;
    const tiltY = (relativeX - 0.5) * -15;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.95, 0.95, 0.95)`;

    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      className={className}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

const Features = () => {
  return (
    <section className='bg-black pb-52'>
      <div className='container mx-auto px-3 md:px-10'>
        <div className='px-5 py-32'>
          <p className='font-circular-web text-lg text-blue-50'>
            Into the Metagame Layer
          </p>
          <p className='max-w-md font-circular-web text-lg text-blue-50 opacity-50'>
            Immerse yourself in a rich and ever-expanding universe wher a vibant
            array of products coverage into an interconnected overlay experience
            on your world.
          </p>
        </div>
        <BentoTilt className='border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-65vh'>
          <BentoCard
            src='videos/feature-1.mp4'
            title='radiant'
            description='A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure.'
          />
        </BentoTilt>
        <div className='grid h-[135vh] grid-cols-2 grid-rows-3 gap-7'>
          <BentoTilt className='bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2'>
            <BentoCard
              src='videos/feature-2.mp4'
              title='zigma'
              description='An anime and gaming-inspired NFT collection - the IP primed for expansion.'
            />
          </BentoTilt>
          <BentoTilt className='bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0'>
            <BentoCard
              src='videos/feature-3.mp4'
              title='nexus'
              description='A gamified social hub, adding a new dimension of play to social interaction for Web3 communities.'
            />
          </BentoTilt>
          <BentoTilt className='bento-tilt_1 me-14 md:col-span-1 md:me-0'>
            <BentoCard
              src='videos/feature-4.mp4'
              title='azul'
              description='A cross-world AI Agent - elevating your gameplay to be more fun and productive.'
            />
          </BentoTilt>
          <div className='bento-tilt_2'>
            <div className='flex size-full flex-col justify-between bg-violet-300 p-5'>
              <h1 className='bento-title max-w-64 text-black'>
                More coming soon!
              </h1>
              <TiLocationArrow className='m-5 scale-[5] self-end' />
            </div>
          </div>
          <div className='bento-tilt_2'>
            <video
              src='videos/feature-5.mp4'
              loop
              muted
              autoPlay
              className='size-full object-cover object-center'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
