import About from "@/components/About";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Story from "@/components/Story";
import React from "react";

const page = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Story />
    </main>
  );
};

export default page;
