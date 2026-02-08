import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { sneakers } from "../data/sneakers";

const CATEGORIES = [
  { id: "sneakers", label: "Sneaker" },
  { id: "running", label: "Running Shoes" },
];
const SIZES = [6, 7, 8];
const COLOURS = [
  { id: "black", label: "Black" },
  { id: "white", label: "White" },
  { id: "green", label: "Green" },
];

function ProductCard({ product }) {
  const mainImage = product.images?.[0] ?? "/images/placeholder.svg";
  return (
    <Link
      to={`/product/${product.id}`}
      className="block rounded-lg border border-gray-200 overflow-hidden bg-white hover:shadow-md transition shadow-sm"
    >
      <div className="aspect-square bg-gray-100 relative">
        <img
          src={mainImage}
          alt=""
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23f3f4f6' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='14'%3ENo image%3C/text%3E%3C/svg%3E";
          }}
        />
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500 uppercase tracking-wide">{product.brandName}</p>
        <p className="font-medium text-gray-900">{product.productName}</p>
      </div>
    </Link>
  );
}

export default function Explore() {
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [sizeFilters, setSizeFilters] = useState([]);
  const [colourFilters, setColourFilters] = useState([]);

  const toggleFilter = (setter, value) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]
    );
  };

  const filtered = useMemo(() => {
    return sneakers.filter((s) => {
      if (categoryFilters.length && !categoryFilters.includes(s.category)) return false;
      if (sizeFilters.length && !s.sizes.some((size) => sizeFilters.includes(size))) return false;
      if (colourFilters.length) {
        const productColours = s.colours.map((c) => c.value.toLowerCase());
        if (!colourFilters.some((f) => productColours.includes(f))) return false;
      }
      return true;
    });
  }, [categoryFilters, sizeFilters, colourFilters]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-56 shrink-0 border-r border-gray-200 bg-white p-4">
        <h2 className="font-semibold text-gray-900 mb-3">Filters</h2>

        <div className="mb-4">
          <p className="text-xs font-medium text-gray-500 uppercase mb-2">Category</p>
          {CATEGORIES.map((c) => (
            <label key={c.id} className="flex items-center gap-2 mb-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={categoryFilters.includes(c.id)}
                onChange={() => toggleFilter(setCategoryFilters, c.id)}
                className="rounded border-gray-300"
              />
              <span className="text-sm">{c.label}</span>
            </label>
          ))}
        </div>

        <div className="mb-4">
          <p className="text-xs font-medium text-gray-500 uppercase mb-2">Size</p>
          {SIZES.map((s) => (
            <label key={s} className="flex items-center gap-2 mb-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={sizeFilters.includes(s)}
                onChange={() => toggleFilter(setSizeFilters, s)}
                className="rounded border-gray-300"
              />
              <span className="text-sm">UK {s}</span>
            </label>
          ))}
        </div>

        <div>
          <p className="text-xs font-medium text-gray-500 uppercase mb-2">Colour</p>
          {COLOURS.map((c) => (
            <label key={c.id} className="flex items-center gap-2 mb-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={colourFilters.includes(c.id)}
                onChange={() => toggleFilter(setColourFilters, c.id)}
                className="rounded border-gray-300"
              />
              <span className="text-sm">{c.label}</span>
            </label>
          ))}
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-gray-500 text-center py-12">No sneakers match your filters.</p>
        )}
      </main>
    </div>
  );
}
