// ShopItemServer.tsx (Server Component)

import ShopItemClient from "@/components/ShopItemClient/ShopItemClient";
import { client } from "@/sanity/lib/client";

type Product = {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  originalPrice?: number;
};

async function getData(): Promise<Product[]> {
  const query = `*[_type == "food"]{
    _id,
    name,
    price,
    "imageUrl": image.asset->url
  }`;
  const fetchData = await client.fetch<Product[]>(query);
  return fetchData;
}

const ShopItemServer = async ({ params }: { params: Promise<{
   id: string 
}> }) => {
  const resolvedParams = await params;
  console.log(resolvedParams)

  const products: Product[] = await getData();
  const product = products.find((prod) => prod._id === resolvedParams.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ShopItemClient product = {product} />;
};

export default ShopItemServer;