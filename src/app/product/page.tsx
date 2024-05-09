import ProductPage from "@/components/pages/product-page";
import { getProducts } from "@/lib/actions";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { productType } from "@/lib/types";
import { consoleError, consoleLog, consoleSuccess } from "@/lib/console";

export async function generateMetadata(
  { searchParams }: { searchParams: { [key: string]: string | undefined } },
): Promise<Metadata> {
  const id = searchParams["id"];

  if (!id) {
    consoleError("couldn't fetch product info for MetaData || id not provided");

    return { title: "هذا المنتج غير موجود" };
  }

  consoleLog("Fetching product info for MetaData");

  const products = await getProducts({ id: parseInt(id) });

  if (products.length !== 1) {
    return { title: "هذا المنتج غير موجود" };
  }

  consoleSuccess("product info fetched successfully ||", products.length);

  const product: productType = products[0];
  const productTitle = `${product.title} - بيت سجدة للأثاث المنزلي`;
  const productDescription = product.description.map(
    (des) => `${des.title} : ${des.rows.join(" - ")}`
  )[0];
  const productURL = `https://sajdahouse.netlify.app/product?title=${product.title}&id=${product.id}`;
  const productImages = [product.mainImage, ...product.secondaryImages];
  const productPrice = product.newPrice ? product.newPrice : product.price;
  return {
    metadataBase:new URL("https://sajdahouse.netlify.app"),
    title: productTitle,
    description: productDescription,
    openGraph: {
      url: productURL,
      type: "website",
      title: productTitle,
      description: productDescription,
      images: productImages,
      locale: "ar_EG",
      countryName: "Egypt",
      siteName: "بيت سجدة",
    },
    twitter: {
      card: "summary_large_image",
      title: productTitle,
      description: productDescription,
      images: productImages,
    },
    alternates: { canonical: productURL },
    other: {
      "twitter:label1": "السعر",
      "twitter:data1": `${productPrice.toLocaleString("en-us")} ج.م`,
      "twitter:label2": "التوفر",
      "twitter:data2": "متوفر في المخزون",
      "product:price:amount": productPrice,
      "product:price:currency": "EGP",
      "product:availability": "instock",
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const id = searchParams["id"];

  if (!id) {
    consoleError("couldn't get product for product page || id not provided");

    notFound();
  }

  consoleLog("Fetching product for product page");

  const products = await getProducts({ id: parseInt(id) });

  if (products.length !== 1) {
    notFound();
  }
  const categories = [
    {
      id: 5,
      title: "كرسي سفره",
    },
    {
      id: 1,
      title: "غرف المعيشة",
    },
    {
      id: 2,
      title: "غرف طعام",
    },
    {
      id: 7,
      title: "كنبه سرير",
    },
    {
      id: 6,
      title: "كنب",
    },
    {
      id: 3,
      title: "كراسي",
    },
    {
      id: 8,
      title: "سرير 200*120",
    },
    {
      id: 9,
      title: "سرير 200*160",
    },
    {
      id: 10,
      title: "سرير 200*180",
    },
    {
      id: 11,
      title: "سرير 200*200",
    },
  ];
  const product = products[0];
  const productTitle = `${product.title} - بيت سجدة للأثاث المنزلي`;
  const productDescription = product.description.map(
    (des) => `${des.title} : ${des.rows.join(" - ")}`
  )[0];
  const productURL = `https://sajdahouse.netlify.app/product?title=${product.title}&id=${product.id}`;
  const productImages = [product.mainImage, ...product.secondaryImages];

  let jsonLd: { [key: string]: any } = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id":productURL,
    name: productTitle,
    image: productImages[0],
    description: productDescription,
    category:categories.filter((categ)=>categ.id===product.category)[0].title,
    url:productURL,
    sku:"",
    offers: [
      {
        "@type": "Offer",
        name: productTitle,
        price:product.newPrice?product.newPrice:product.price,
        priceCurrency: "EGP",
        availability: "https://schema.org/InStock",
      },
    ],
  };

  return (
    <>
      <ProductPage product={product} />
      <section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </section>
    </>
  );
}
