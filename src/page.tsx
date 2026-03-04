import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import ContactForm from "@/components/sections/ContactForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Services />
      <ContactForm />
    </main>
  );
}
