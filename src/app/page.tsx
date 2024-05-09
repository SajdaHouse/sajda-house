import MainPage from "@/components/pages/main-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    url: "https://sajdahouse.netlify.app",
    type: "website",
    title: "بيت سجدة للأثاث المنزلي | غرف معيشة وطعام - كنب - كراسي - سراير",
    description:
      "بيت سجدة هو متجر متخصص في بيع الأثاث الراقي والمريح. نقدم مجموعة متنوعة من غرف النوم إلى غرف المعيشة إلى غرف الطعام. نستخدم أفضل المواد لضمان الجودة والمتانة",
    images:
      "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/store/Logo_white.png",
    locale: "ar_EG",
    countryName: "Egypt",
    siteName: "بيت سجدة",
  },
  twitter: {
    card: "summary_large_image",
    title: "بيت سجدة للأثاث المنزلي | غرف معيشة وطعام - كنب - كراسي - سراير",
    description:
      "بيت سجدة هو متجر متخصص في بيع الأثاث الراقي والمريح. نقدم مجموعة متنوعة من غرف النوم إلى غرف المعيشة إلى غرف الطعام. نستخدم أفضل المواد لضمان الجودة والمتانة",
    images:
      "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/store/Logo_white.png",
  },
  alternates: { canonical: "https://sajdahouse.netlify.app" },
};

export default async function Home() {
  let jsonLd: { [key: string]: any } = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "بيت سجدة",
    alternateName: [
      "سجدة روم",
      "سجدة رووم",
      "BeatSagda",
      "BeatSajda",
      "SajdaHouse",
      "SagdaRoom",
      "SajdaRoom",
      "sajdahouse.vercel.app",
    ],
    url: "https://sajdahouse.netlify.app/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://sajdahouse.netlify.app/products?search={query}",
      "query-input": "required maxlength=100 name=query"
    }
  };

  return (
    <>
      <MainPage />
      <section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </section>
    </>
  );
}
