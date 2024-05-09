import ProductsPage from "@/components/pages/products-page";
import { consoleLog, consoleSuccess } from "@/lib/console";
import prisma from "@/lib/db";
import { productType } from "@/lib/types";
import { formatProduct } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}): Promise<Metadata> {
  const category = searchParams["id"];
  const search = searchParams["search"];
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
  return {
    title: `${search ? `${search} -` : "جميع المنتجات -"}${
      category &&
      categories.filter((categ) => categ.id.toString() === category.trim())[0]
        ? `${
            categories.filter(
              (categ) => categ.id.toString() === category.trim()
            )[0].title
          } -`
        : ""
    } بيت سجدة للأثاث المنزلي`,
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const category = searchParams["id"];
  const search = searchParams["search"];

  let products: productType[] = [];

  consoleLog("Fetching products || category:", category, "|| search:", search);

  if (category && search) {
    const dbProducts = await prisma.product.findMany({
      where: {
        AND: [
          { title: { contains: search } },
          { category: { equals: parseInt(category) } },
        ],
      },
    });

    if (dbProducts.length === 0) {
      notFound();
    }

    consoleSuccess(
      "products for Products page fetched successfully ||",
      dbProducts.length
    );

    products.push(...dbProducts.map((prod) => formatProduct(prod)));
  } else if (category) {
    const dbProducts = await prisma.product.findMany({
      where: { category: { equals: parseInt(category) } },
    });

    if (dbProducts.length === 0) {
      notFound();
    }

    consoleSuccess(
      "products for Products page fetched successfully ||",
      dbProducts.length
    );

    products.push(...dbProducts.map((prod) => formatProduct(prod)));
  } else if (search) {
    const dbProducts = await prisma.product.findMany({
      where: { title: { contains: search } },
    });

    if (dbProducts.length === 0) {
      notFound();
    }

    consoleSuccess(
      "products for Products page fetched successfully ||",
      dbProducts.length
    );

    products.push(...dbProducts.map((prod) => formatProduct(prod)));
  } else {
    const dbProducts = await prisma.product.findMany();

    if (dbProducts.length === 0) {
      notFound();
    }

    consoleSuccess(
      "products for Products page fetched successfully ||",
      dbProducts.length
    );

    products.push(...dbProducts.map((prod) => formatProduct(prod)));
  }
  return <ProductsPage _products={products} />;
}
