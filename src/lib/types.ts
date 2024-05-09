export type cartProductType = {
  id:number;
  title: string;
  image:string;
  price: number;
  quantity: number;
};

export type categoryType={
  id:number,
  title:string
}

export type productType = {
  id: number;
  title: string;
  category: number;
  description: { title: string; rows: string[] }[];
  price: number;
  newPrice: number | null;
  mainImage: string;
  secondaryImages: string[];
  created_at: Date;
  updated_at: Date;
};

export type orderProductsType = {
  id: number;
  title: string;
  image: { url: string; hash: string };
  price: number;
  quantity: number;
};

export type orderInfoType = {
  username: string;
  governorate: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  additions: string | null;
};

export type orderType = {
  id: number;
  products: orderProductsType[];
  info: orderInfoType;
  created_at: string;
  status: "تم التوصيل" | "جاري الانشاء" | "معلق" | "تم الالغاء" | "محذوف";
};