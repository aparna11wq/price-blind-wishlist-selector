import { createContext, useContext, useCallback, useMemo, useState, useEffect } from "react";

const STORAGE_KEY = "gift-selection";

const defaultSelection = {
  productId: null,
  brandName: null,
  productName: null,
  size: null,
  colour: null,
  image: null,
  confirmed: false,
};

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSelection;
    const parsed = JSON.parse(raw);
    return {
      ...defaultSelection,
      ...parsed,
    };
  } catch {
    return defaultSelection;
  }
}

function saveToStorage(selection) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
  } catch (_) {}
}

const SelectionContext = createContext(null);

export function SelectionProvider({ children }) {
  const [selection, setSelectionState] = useState(loadFromStorage);

  useEffect(() => {
    saveToStorage(selection);
  }, [selection]);

  const setSelection = useCallback((next) => {
    setSelectionState((prev) => (typeof next === "function" ? next(prev) : next));
  }, []);

  const setSelectedProduct = useCallback((product, size, colour) => {
    const image = product.images && product.images[0] ? product.images[0] : null;
    setSelectionState((prev) => ({
      ...prev,
      productId: product.id,
      brandName: product.brandName,
      productName: product.productName,
      size,
      colour,
      image,
      confirmed: false,
    }));
  }, []);

  const confirmSelection = useCallback(() => {
    setSelectionState((prev) => ({ ...prev, confirmed: true }));
  }, []);

  const clearSelection = useCallback(() => {
    setSelectionState(defaultSelection);
  }, []);

  const value = useMemo(
    () => ({
      selection,
      setSelection,
      setSelectedProduct,
      confirmSelection,
      clearSelection,
    }),
    [selection, setSelection, setSelectedProduct, confirmSelection, clearSelection]
  );

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error("useSelection must be used within SelectionProvider");
  return ctx;
}
