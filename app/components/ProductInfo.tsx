import { useState } from "react";
import type { Product } from "~/types/product";
import Collapsible from "../components/Collapsible";

type Props = {
  product: Product;
};

export default function ImageGallery({ product }: Props) {
  const colors = [
    { name: "Rose", value: "#e6b8b8" },
    { name: "Brown", value: "#8b7355" },
    { name: "Black", value: "#111111" },
  ];

  const sizes = ["XS", "S", "M", "L", "XL"];

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className="w-full lg:w-1/3 space-y-3">
      {/* TAGS */}
      <div className="flex gap-3">
        <span className="border border-black px-3 py-1 text-xs tracking-wide uppercase font-semibold">
          Best Seller
        </span>

        <span className="border border-black px-3 py-1 text-xs tracking-wide uppercase font-semibold">
          New Color
        </span>
      </div>

      {/* TITLE */}
      <h1 className="text-1xl font-bold uppercase tracking-wide leading-snug">
        {product.title}
      </h1>

      {/* PRICE + STOCK */}
      <div className="flex items-center gap-3 mt-2">
        <span className="text-1xl font-bold">${product.price.toFixed(2)}</span>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#18A249]"></span>
          <span className="text-sm text-gray-500">In Stock</span>
        </div>
      </div>

      <p className="text-sm text-gray-400 mt-2">
        Or 4 <span className="font-semibold">interest free</span> payments of{" "}
        <span className="font-semibold text-[#151515]">
          ${(product.price / 4).toFixed(2)}
        </span>
      </p>

      {/* COLOR SECTION */}
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-wide font-semibold">
          Color:{" "}
          <span className="normal-case font-medium">{selectedColor.name}</span>
        </p>

        <div className="flex gap-4">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color)}
              className={`w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer ${
                selectedColor.name === color.name
                  ? "ring-2 ring-black ring-offset-2"
                  : ""
              }`}
              style={{ backgroundColor: color.value }}
            />
          ))}
        </div>
      </div>

      {/* SIZE SECTION */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <p className="text-sm uppercase tracking-wide font-semibold">Size</p>

          <button className="text-sm uppercase tracking-wide font-semibold underline">
            Size Guide
          </button>
        </div>

        <div className="grid grid-cols-5 border border-gray-200 mt-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-3 text-sm border-r border-gray-200 last:border-r-0 transition cursor-pointer ${
                selectedSize === size
                  ? "bg-black text-white"
                  : "hover:bg-gray-50"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <button
        disabled={!selectedSize}
        className={`w-full py-4 text-sm tracking-wide uppercase transition  ${
          selectedSize
            ? "bg-black text-white cursor-pointer"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Add 1 Item To Bag
      </button>

      <div className="mt-6">
        <Collapsible
          title="Size & Fit"
          sectionKey="fit"
          openSection={openSection}
          toggleSection={toggleSection}
        >
          True to size with a supportive athletic fit.
        </Collapsible>

        <Collapsible
          title="Highlights"
          sectionKey="highlights"
          openSection={openSection}
          toggleSection={toggleSection}
        >
          <ul className="list-disc pl-5">
            <li>Breathable performance fabric</li>
            <li>Four-way stretch</li>
            <li>Moisture-wicking technology</li>
          </ul>
        </Collapsible>

        <Collapsible
          title="Description"
          sectionKey="description"
          openSection={openSection}
          toggleSection={toggleSection}
        >
          {product.description}
        </Collapsible>
      </div>
    </div>
  );
}
