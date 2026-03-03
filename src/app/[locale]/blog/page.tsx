import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Blog from "@/components/sections/Blog";
import ContactForm from "@/components/sections/ContactForm";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "blog" });
  return { title: t("title"), description: t("subtitle") };
}

export default function BlogPage() {
  return (
    <div className="pt-16">
      <Blog />
      <ContactForm />
    </div>
  );
}
