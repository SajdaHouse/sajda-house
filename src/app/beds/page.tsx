import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";


export const metadata: Metadata = {
  title: "سراير - بيت سجدة للأثاث المنزلي",
};

export default function Page() {
  const urls = [
    {
      alt: "120*200",
      url: "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/store/120.png",
      id: 8,
    },
    {
      alt: "160*200",
      url: "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/store/160.png",
      id: 9,
    },
    {
      alt: "180*200",
      url: "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/store/180.png",
      id: 10,
    },
    {
      alt: "200*200",
      url: "https://vtjclpwgljeqcdjmitvj.supabase.co/storage/v1/object/public/store/200.png",
      id: 11,
    },
  ];
  return (
    <div className="container flex flex-wrap items-center justify-center pb-5">
      {urls.map((image, index) => (
        <Link
          key={index}
          href={`/products?category=${image.alt}&id=${image.id}`}
          className="p-1 w-1/2 md:w-1/4 md:p-2 "
        >
          <Image
            src={image.url}
            alt={image.alt}
            width={500}
            height={500}
            className="shadow-lg rounded-md"
          />
        </Link>
      ))}
    </div>
  );
}
