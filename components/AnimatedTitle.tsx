"use client";

import gsap from "gsap";
import React, { useEffect, useRef } from "react";

type AnimatedTitleProps = {
  title: string;
  containerClass: string;
};

const AnimatedTitle = ({ title, containerClass }: AnimatedTitleProps) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse", //onEnter, onLeave, onEnterBack, onLeaveBack
        },
      });

      titleAnimation.to("#animatedWord", {
        opacity: 1,
        transform: "translate3d(0,0,0) rotateY(0deg) rotateX(0deg)",
        ease: "power2.inOut",
        stagger: 0.02,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`animated-title ${containerClass}`}
    >
      {title.split("<br />").map((line, idx) => (
        <div
          key={idx}
          className='flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3'
        >
          {line.split(" ").map((word, i) => (
            <span
              id='animatedWord'
              key={i}
              className='animated-word'
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;
