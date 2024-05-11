import type { Metadata, MetadataRoute } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
import { DataProvider } from "@/components/contexts/data-context";
import Navbar from "@/components/custom/Navbar";
import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Link from "next/link";
import Image from "next/image";
import { GoogleTagManager } from "@next/third-parties/google";
import { Suspense } from "react";
import {GoogleAnalyticsTracking} from "@/components/analytics";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "بيت سجدة للأثاث المنزلي | غرف معيشة وطعام - كنب - كراسي - سراير",
  description:
    "بيت سجدة هو متجر متخصص في بيع الأثاث الراقي والمريح. نقدم مجموعة متنوعة من غرف النوم إلى غرف المعيشة إلى غرف الطعام. نستخدم أفضل المواد لضمان الجودة والمتانة",
  applicationName: "بيت سجدة للأثاث",
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "standard",
    "max-video-preview": -1,
  },
  verification: {
    google: "rwhH_4FUpRbLVq9yWzJDyET_4RDk_8-gIEXbqSqKgkI",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head><script
      id="google-tag-manager"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WKX2Q94Q');
            `,
          }}
        /></head>
      <body className={`${tajawal.className} bg-slate-50`}>
      <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WKX2Q94Q"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        <DataProvider>
          <NextTopLoader />
          <Header />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </DataProvider>
        <SpeedInsights />
        <Link
          href="https://api.whatsapp.com/send/?phone=201005187712&text&type=phone_number&app_absent=0"
          className="size-20 p-3 block bottom-1 left-1 fixed z-50"
        >
          <Image
            src="https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/store/whatsapp.png"
            alt="whatsapp"
            width={250}
            height={250}
            className="drop-shadow shadow-red-800"
          />
        </Link>
      </body>
    </html>
  );
}
