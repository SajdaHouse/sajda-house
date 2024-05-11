"use server";

import { consoleError, consoleLog, consoleSuccess } from "./console";
import { createEmail } from "./email-creater";
import { sendEmail } from "./mailService";
import { createClient } from "./supabase/server";
import { orderSchema } from "./zod-objects";

export async function getProducts(match: { [key: string]: any } = {}) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .match(match);
  return { data, error };
}
export async function getProductsArray(ids: number[]) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .in("id",ids);
  return { data, error };
}
export async function placeOrder(values: any) {
  const result = orderSchema.safeParse(values);
  if (result.success) {
    const supabase = createClient();
    consoleLog("placing order");
    const { data, error } = await supabase
      .from("orders")
      .insert({ ...values, status: "معلق" })
      .select("*");
    if (!error && data && data.length === 1) {
      consoleSuccess("order placed successfully");

      if (result.data.info.email) {
        // await sendEmail(
        //   "sagdaroom@gmail.com",
        //   "تم تأكيد الطلب",
        //   createEmail({ values: result.data, id: data[0].id })
        // );
        const status = await sendEmail(
          result.data.info.email,
          "تم تأكيد الطلب",
          createEmail({ values: result.data, id: data[0].id })
        );
        if (!status) {
          consoleError("couldn't send order email");
        }
      }
      return { error: false };
    } else {
      consoleError(
        "couldn't place order || supabase error:",
        error,
        "|| data:",
        data,
        "|| order:",
        values
      );
      return { error: true };
    }
  } else {
    consoleError(
      "couldn't place order || zod error:",
      result.error.stack,
      "|| order:",
      values
    );
    return { error: true };
  }
}
