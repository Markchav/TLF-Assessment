import { useRef, useState } from "react";
import type { Product } from "../types/product";

type Props = {
  product: Product;
};

export default function ImageGallery({ product }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [product.image, product.image, product.image, product.image];

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const index = Math.floor(
      (el.scrollLeft + el.offsetWidth / 2) / el.offsetWidth,
    );
    setActiveIndex(index);
  };

  return (
    <div className="w-full lg:w-[60%]">
      <div className="relative bg-transparent lg:bg-[#f3f3f3]">
        {/* Heart Button */}
        <button className="absolute top-3 right-3 bg-white w-10 h-10 flex items-center justify-center shadow-sm cursor-pointer z-10">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#151515"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-7 h-7 "
          >
            <path d="M20.8 4.6c-1.5-1.5-3.9-1.5-5.4 0l-.4.4-.4-.4c-1.5-1.5-3.9-1.5-5.4 0-1.5 1.5-1.5 3.9 0 5.4l5.8 5.8 5.8-5.8c1.5-1.5 1.5-3.9 0-5.4z" />
          </svg>
        </button>

        {/* MOBILE IMAGE SECTION */}
        <div className="block lg:hidden">
          <div className="bg-[#f3f3f3] pt-4 relative">
            {/* Wishlist Button */}

            {/* Scrollable Track */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex overflow-x-scroll snap-x snap-mandatory scroll-smooth no-scrollbar"
            >
              {images.map((img, i) => (
                <div
                  key={i}
                  className="min-w-full flex justify-center snap-start"
                >
                  <img
                    src={img}
                    alt="Product"
                    className="h-[340px] object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="h-[1.5px] bg-gray-300 mt-4">
              <div
                className="h-[1.5px] bg-gray-500 transition-all duration-300"
                style={{
                  width: `${((activeIndex + 1) / images.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Dots OUTSIDE gray box */}
          <div className="flex justify-center gap-1.5 mt-3">
            {images.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === activeIndex ? "bg-black" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* DESKTOP IMAGE SECTION */}
        <div className="hidden lg:grid grid-cols-2 gap-1">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-[380px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
