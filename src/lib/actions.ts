"use server";

import prisma from "./db";
import { createEmail } from "./email-creater";
import { sendEmail } from "./mailService";
import { formatProduct } from "./utils";
import { orderSchema } from "./zod-objects";

export async function getProducts(match: { [key: string]: any } = {}) {
  const products = await prisma.product.findMany({ where: match });
  return products.map((prod) => formatProduct(prod));
}

export async function getProductsArray(ids: number[]) {
  const products = await prisma.product.findMany({
    where: { id: { in: ids } },
  });
  return products.map((prod) => formatProduct(prod));
}

export async function placeOrder(values: any) {
  const result = orderSchema.safeParse(values);
  if (result.success) {
    const products = (
      await prisma.product.findMany({
        where: { id: { in: result.data.products.map((prod) => prod.id) } },
      })
    ).map((prod) => {
      return {
        id: prod.id,
        title: prod.title,
        image: prod.mainImage,
        price: prod.newPrice ? prod.newPrice : prod.price,
        quantity: result.data.products.filter(
          (product) => product.id === prod.id
        )[0].quantity,
      };
    });
    const order = await prisma.order.create({
      data: {
        info: JSON.stringify(result.data.info),
        products: JSON.stringify(products),
        status: "معلق",
      },
    });

    if (result.data.info.email) {
      // await sendEmail(
      //   "sagdaroom@gmail.com",
      //   "تم تأكيد الطلب",
      //   createEmail({ values: result.data, id: order.id})
      // );
      const status = await sendEmail(
        result.data.info.email,
        "تم تأكيد الطلب",
        createEmail({
          values: { products: products, info: result.data.info },
          id: order.id,
        })
      );
      if (!status) {
        console.error("couldn't send order email");
      }
    }
    return { order: { products: products, info: result.data.info } };
  } else {
    console.error(
      "couldn't place order || zod error:",
      result.error.stack,
      "|| order:",
      values
    );
    return { order: null };
  }
}
