import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import About from "@/components/sections/About";
import ContactForm from "@/components/sections/ContactForm";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: t("subtitle") };
}

export default function AboutPage() {
  return (
    <div className="pt-16">
      <About />
      <ContactForm />
    </div>
  );
}
