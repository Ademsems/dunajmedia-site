import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import About from '@/components/sections/About';
import Blog from '@/components/sections/Blog';
import ContactForm from '@/components/sections/ContactForm';

export default function HomePage({ params }: { params: { locale: string } }) {
  // Opt into static rendering for this page
  setRequestLocale(params.locale);

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
