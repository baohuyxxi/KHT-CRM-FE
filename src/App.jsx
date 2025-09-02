import Auth from "./routers/Auth";
import ScrollToTop from "~/components/ScrollToTop/ScrollToTop";
import { LoadingProvider } from "./context/LoadingContext";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <LoadingProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/*" element={<Auth />} />
      </Routes>
    </LoadingProvider>
  );
}
export default App;
