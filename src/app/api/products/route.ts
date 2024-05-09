import prisma from "@/lib/db";
import { formatProduct } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const productRequestSchema = z.object({
  id: z.coerce.number().optional(),
  category: z.coerce.number().optional(),
});

export async function POST(request: NextRequest) {
  let json: any = {};
  try {
    json = await request.json();
  } catch {}

  const result = productRequestSchema.safeParse(json);
  if (result.success) {
    let query: any = { where: { AND: [] } };

    for (const key in result.data) {
      if (Object.prototype.hasOwnProperty.call(result.data, key)) {
        const value = result.data[key];
        query.where.AND.push({ [key]: { equals: value } });
      }
    }
    const products = await prisma.product.findMany(query);

    return NextResponse.json({
      products: products.map((product) => formatProduct(product)),
    });
  } else {
    return NextResponse.json({}, { status: 400 });
  }
}
const productDeleteSchema = z.object({ id: z.coerce.number() });

export async function DELETE(request: NextRequest) {
  let json: any = {};
  try {
    json = await request.json();
  } catch {}
  const result = productDeleteSchema.safeParse(json);
  if (result.success) {
    await prisma.product.delete({ where: { id: result.data.id } });
    return NextResponse.json({});
  } else {
    return NextResponse.json({}, { status: 400 });
  }
}
const productUpdateSchema = z.object({
  id: z.coerce.number(),
  newProduct: z.object({
    title: z.string().min(1).optional(),
    price: z.coerce.number().optional(),
    newPrice: z.coerce.number().optional(),
    description: z.string().optional(),
  }),
});

export async function PATCH(request: NextRequest) {
  let json: any = {};
  try {
    json = await request.json();
  } catch {}
  const result = productUpdateSchema.safeParse(json);
  if (result.success) {
    const prod = await prisma.product.update({
      where: { id: result.data.id },
      data: result.data.newProduct,
    });
    return NextResponse.json({ product: formatProduct(prod) });
  } else {
    return NextResponse.json({ product: null }, { status: 400 });
  }
}
