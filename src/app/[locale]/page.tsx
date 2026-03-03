"use client";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Blog from "@/components/sections/Blog";
import ContactForm from "@/components/sections/ContactForm";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Blog />
      <ContactForm />
    </>
  );
}
