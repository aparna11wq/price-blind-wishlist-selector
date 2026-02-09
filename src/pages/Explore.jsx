import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { sneakers } from "../data/sneakers";

const SIZES = Array.from(
  new Set(
    sneakers.flatMap((s) => s.sizes)
  )
)
  .sort((a, b) => a - b)
  .map((size) => ({
    id: size,
    label: size
  })
);

const COLORS = Array.from(
  new Map(
    sneakers.flatMap((s) =>
      s.colors.map((obj) => [
        obj.value,
        {
          id: obj.value.toLowerCase(),
          label: obj.value,
          colors: obj.colors
        }
      ])
    )
  ).values()
);
const BRANDS = [...new Set(sneakers.map((s) => s.brand))].sort().map((name) => ({
  id: name,
  label: name,
}));

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
        <p className="text-sm text-gray-500 uppercase tracking-wide">{product.brand}</p>
        <p className="font-medium text-gray-900">{product.productName}</p>
      </div>
    </Link>
  );
}

export default function Explore() {
  const [sizeFilters, setSizeFilters] = useState([]);
  const [colourFilters, setColourFilters] = useState([]);
  const [brandFilters, setBrandFilters] = useState([]);

  const toggleFilter = (setter, value) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]
    );
  };

  const filtered = useMemo(() => {
    return sneakers.filter((s) => {
      if (brandFilters.length && !brandFilters.includes(s.brand)) return false;
      if (sizeFilters.length && !s.sizes.some((size) => sizeFilters.includes(size))) return false;
      if (colourFilters.length) {
        const productColours = s.colors.map((c) => c.value.toLowerCase());
        if (!colourFilters.some((f) => productColours.includes(f))) return false;
      }
      return true;
    });
  }, [brandFilters, sizeFilters, colourFilters]);

  return (
    <div className="min-h-screen bg-gray-50 flex m-6">
      <aside className="w-56 shrink-0 border-r border-gray-200 bg-white p-4 sticky top-0 self-start max-h-screen overflow-y-auto">
        <div className="font-semibold text-gray-900 mb-4 text-2xl">Filters</div>
        <div className="border-b border-gray-200 mb-4" />

        <div className="mb-5">
          <p className="text-xl font-medium text-gray-500 mb-4">Brand</p>
          {BRANDS.map((b) => (
            <label key={b.id} className="flex items-center gap-3 mb-2 cursor-pointer">
              <input
                type="checkbox"
                checked={brandFilters.includes(b.id)}
                onChange={() => toggleFilter(setBrandFilters, b.id)}
                className="rounded border-gray-300"
              />
              <span className="text-sm">{b.label}</span>
            </label>
          ))}
        </div>
        <div className="border-b border-gray-200 mb-4" />

        <div className="mb-5">
          <p className="text-xl font-medium text-gray-500 mb-4">Size</p>
          {SIZES.map((s) => (
            <label key={s.id} className="flex items-center gap-3 mb-2 cursor-pointer">
              <input
                type="checkbox"
                checked={sizeFilters.includes(s.label)}
                onChange={() => toggleFilter(setSizeFilters, s.label)}
                className="rounded border-gray-300"
              />
              <span className="text-sm">UK {s.label}</span>
            </label>
          ))}
        </div>
        <div className="border-b border-gray-200 mb-4" />

        <div className="mb-5">
          <p className="text-xl font-medium text-gray-500 mb-4">Colour</p>
          {COLORS.map((c) => (
            <label key={c.id} className="flex items-center gap-3 mb-2 cursor-pointer">
              <input
                type="checkbox"
                checked={colourFilters.includes(c.id)}
                onChange={() => toggleFilter(setColourFilters, c.id)}
                className="rounded border-gray-300"
              />
              <div
                className="w-4 h-4 rounded flex-shrink-0 border border-gray-300"
                style={{
                  background: c.colors.length === 1
                    ? c.colors[0]
                    : `linear-gradient(1800deg, rgb(128, 128, 128) 8px, rgb(245, 245, 220) 8px)`
                }}
                aria-hidden
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
