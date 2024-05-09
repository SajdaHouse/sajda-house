import prisma from "@/lib/db";
import { formatOrder } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const orderRequestSchema = z.object({ id: z.coerce.number().optional() });

export async function POST(request: NextRequest) {
  let json: any = {};
  try {
    json = await request.json();
  } catch {}

  const result = orderRequestSchema.safeParse(json);
  if (result.success) {
    let orders = [];
    if (result.data.id) {
      orders.push(
        ...(await prisma.order.findMany({
          where: { id: { equals: result.data.id } },
        }))
      );
    } else {
      orders.push(...(await prisma.order.findMany({})));
    }
    return NextResponse.json({
      orders: orders.map((order) => formatOrder(order)),
    });
  } else {
    return NextResponse.json({}, { status: 400 });
  }
}

const orderUpdateSchema = z.object({
  id: z.coerce.number(),
  newStatus: z.enum([
    "تم التوصيل",
    "جاري الانشاء",
    "معلق",
    "تم الالغاء",
    "محذوف",
  ]),
});

export async function PATCH(request: NextRequest) {
  let json: any = {};
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({}, { status: 400 });
  }
  const result = orderUpdateSchema.safeParse(json);
  if (result.success) {
    await prisma.order.update({
      where: { id: result.data.id },
      data: { status: result.data.newStatus },
    });
    return NextResponse.json({}, { status: 200 });
  } else {
    return NextResponse.json({}, { status: 400 });
  }
}
