import prisma from "@/lib/db";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const dbProducts = await prisma.product.findMany();
  if (dbProducts.length === 0) {
    console.error("sitemapError-Supabase:");
    return [];
  }
  const dbCategories = [
    {
      id: 1,
      title: "غرف المعيشة",
    },
    {
      id: 2,
      title: "غرف طعام",
    },
    {
      id: 3,
      title: "كراسي",
    },
    {
      id: 5,
      title: "كرسي سفره",
    },
    {
      id: 6,
      title: "كنب",
    },
    {
      id: 7,
      title: "كنبه سرير",
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
  const categories: {
    url: string;
    lastModified: Date;
    changeFrequency:
      | "weekly"
      | "always"
      | "hourly"
      | "daily"
      | "monthly"
      | "yearly"
      | "never"
      | undefined;
    priority: number;
  }[] = dbCategories.map((categ) => {
    const url = new URL("https://sajdahouse.netlify.app/products");
    url.searchParams.append("category", categ.title);
    url.searchParams.append("id", categ.id.toString());
    return {
      url: url.toString().replace("&","&amp;"),
      lastModified: new Date(1714456474967),
      changeFrequency: "weekly",
      priority: 0.8,
    };
  });
  const products: {
    url: string;
    lastModified: Date;
    changeFrequency:
      | "weekly"
      | "always"
      | "hourly"
      | "daily"
      | "monthly"
      | "yearly"
      | "never"
      | undefined;
    priority: number;
  }[] = dbProducts.map((prod) => {
    const url = new URL("https://sajdahouse.netlify.app/product");
    url.searchParams.append("title", prod.title);
    url.searchParams.append("id", prod.id.toString());
    return {
      url: url.toString().replace("&","&amp;"),
      lastModified: prod.updated_at??new Date(Date.now()),
      changeFrequency: "daily",
      priority: 1,
    };
  });
  const sitemap: {
    url: string;
    lastModified: Date;
    changeFrequency:
      | "weekly"
      | "always"
      | "hourly"
      | "daily"
      | "monthly"
      | "yearly"
      | "never"
      | undefined;
    priority: number;
  }[] = [
    {
      url: "https://sajdahouse.netlify.app",
      lastModified: new Date(1714456474967),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...categories,
    ...products,
  ];
  return sitemap;
}
