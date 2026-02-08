import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelection } from "./context/SelectionContext";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Product from "./pages/Product";
import Confirm from "./pages/Confirm";

function SafeguardRedirect({ children }) {
  const { selection } = useSelection();
  const location = useLocation();
  if (selection.confirmed && location.pathname !== "/confirm") {
    return <Navigate to="/confirm" replace />;
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/explore"
        element={
          <SafeguardRedirect>
            <Explore />
          </SafeguardRedirect>
        }
      />
      <Route
        path="/product/:id"
        element={
          <SafeguardRedirect>
            <Product />
          </SafeguardRedirect>
        }
      />
      <Route path="/confirm" element={<Confirm />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
