import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import ContactForm from "@/components/sections/ContactForm";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("subtitle") };
}

export default function ContactPage() {
  return (
    <div className="pt-16">
      <ContactForm />
    </div>
  );
}
