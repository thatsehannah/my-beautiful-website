import Hero from "@/components/Hero";
import React from "react";

const page = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      <Hero />
      <section className='z-0 min-h-screen bg-blue-500'></section>
    </main>
  );
};

export default page;
