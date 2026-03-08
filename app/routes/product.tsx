import { useLoaderData } from "react-router";

import type { Product } from "../types/product";

import ImageGallery from "~/components/ImageGallery";
import ProductInfo from "~/components/ProductInfo";

export async function loader(): Promise<Product> {
  const res = await fetch("https://fakestoreapi.com/products/1");

  if (!res.ok) {
    throw new Response("Failed to fetch product", { status: 500 });
  }

  return res.json();
}

export default function ProductRoute() {
  const product = useLoaderData<typeof loader>();

  return (
    <main className="min-h-screen bg-white text-[#151515]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* LEFT SIDE - IMAGE GRID */}
          <ImageGallery product={product} />

          {/* RIGHT SIDE - PRODUCT INFO */}

          <ProductInfo product={product} />
        </div>
      </div>
    </main>
  );
}
