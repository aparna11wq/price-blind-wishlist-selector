import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { sneakers } from "../data/sneakers";
import { useSelection } from "../context/SelectionContext";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setSelectedProduct } = useSelection();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColour, setSelectedColour] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const product = sneakers.find((s) => s.id === id);
  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Product not found.</p>
      </div>
    );
  }

  const images = product.images?.length ? product.images : ["/images/placeholder.svg"];
  const canSubmit = selectedSize != null && selectedColour != null;

  const handleChooseGift = () => {
    if (!canSubmit) return;
    const colourObj = product.colors.find((c) => c.value.toLowerCase() === selectedColour.toLowerCase());
    setSelectedProduct(
      product,
      selectedSize,
      colourObj ? colourObj.value : selectedColour
    );
    navigate("/confirm");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: images */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 shrink-0">
              {images.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImageIndex(i)}
                  className={`w-16 h-16 rounded border-2 overflow-hidden shrink-0 ${
                    activeImageIndex === i ? "border-black" : "border-gray-200"
                  }`}
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect fill='%23f3f4f6' width='64' height='64'/%3E%3C/svg%3E";
                    }}
                  />
                </button>
              ))}
            </div>
            <div className="aspect-square flex-1 max-w-[35rem] bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={images[activeImageIndex]}
                alt=""
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect fill='%23f3f4f6' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af'%3ENo image%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
          </div>

          {/* Right: details */}
          <div className="flex-1">
            <p className="text-xl text-gray-500 uppercase font-bold tracking-wide">{product.brand}</p>
            <h1 className="text-2xl font-semibold text-gray-900 mt-2">{product.productName}</h1>
            {product.rating && product.reviewCount && <div className="flex items-center gap-2 mt-2 text-m text-gray-600">
              <span>★ {product.rating}</span>
              <span>({product.reviewCount} reviews)</span>
            </div>}

            <div className="mt-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Size</p>
              <div className="flex gap-3 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`w-16 h-12 px-2 py-2 rounded border text-sm font-medium ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    UK {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Colour</p>
              <div className="flex gap-3 flex-wrap">
                {product.colors.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setSelectedColour(c.value)}
                    className={`px-4 py-2 rounded border text-sm font-medium ${
                      selectedColour === c.value
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleChooseGift}
              disabled={!canSubmit}
              className="mt-8 w-full max-w-sm bg-black text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition"
            >
              Choose this gift
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
