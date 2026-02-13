import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelection } from "../context/SelectionContext";

export default function Confirm() {
  const { selection, confirmSelection, clearSelection } = useSelection();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  console.log(selection);
  const hasSelection =
    selection.productId &&
    selection.brand &&
    selection.productName &&
    selection.size != null &&
    selection.colour;

  const handleYes = async () => {
    if (!hasSelection) return;
    setLoading(true);
    try {
      const res = await fetch("/api/submit-selection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: selection.productId,
          brand: selection.brand,
          productName: selection.productName,
          size: selection.size,
          colour: selection.colour,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      confirmSelection();
      setToast("Your selection has been confirmed 🎉");
    } catch (_) {
      setToast("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDifferent = () => {
    clearSelection();
    navigate("/explore");
  };

  if (!hasSelection) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No gift selected.</p>
          <button
            type="button"
            onClick={() => navigate("/explore")}
            className="text-black underline"
          >
            Browse sneakers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <h2 className="text-xl font-medium text-gray-900 mb-8">
          Is this the gift you want me to get you?
        </h2>

        <div className="flex gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50 text-left mb-8">
          <div className="w-24 h-24 shrink-0 rounded overflow-hidden bg-gray-200">
            <img
              src={selection.image || ""}
              alt=""
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'%3E%3Crect fill='%23e5e7eb' width='96' height='96'/%3E%3C/svg%3E";
              }}
            />
          </div>
          <div className="min-w-0">
            <p className="text-sm text-gray-500">{selection.brand}</p>
            <p className="font-medium text-gray-900">{selection.productName}</p>
            <p className="text-sm text-gray-600 mt-1">
              Size UK {selection.size} · {selection.colour}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={handleYes}
            disabled={true}
            className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Confirming…" : "Yes"}
          </button>
          <button
            type="button"
            onClick={handleSelectDifferent}
            className="px-6 py-3 border-2 border-gray-300 rounded-lg font-medium hover:border-gray-400 transition"
          >
            Select a different gift
          </button>
        </div>

        {toast && (
          <div
            role="alert"
            className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg"
          >
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}
