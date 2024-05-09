import { z } from "zod";

export const infoSchema = z.object({
  username: z.string().min(3, "الاسم الثلاثي مطلوب"),
  governorate: z.string().min(1, "المحافظة مطلوبة"),
  city: z.string().min(1, "المدينة مطلوبة"),
  address: z.string().min(1, "العنوان مطلوب"),
  phone: z.string().min(1, "رقم الهاتف مطلوب"),
  email: z.string().optional(),
  additions: z.string().optional(),
});

export const productsSchema = z.object({
  id: z.coerce.number().min(1),
  quantity: z.coerce.number().min(1),
});

export const orderSchema = z.object({
  products: z.array(productsSchema).min(1),
  info: infoSchema,
});
