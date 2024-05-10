export type cartProductType = {
  id:number;
  title: string;
  image:{url:string,hash:string};
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
  mainImage: {url:string,hash:string};
  secondaryImages: {url:string,hash:string}[];
  created_at: string;
  updated_at: string;
};