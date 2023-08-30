import Header from "./components/header/Header";
import "./App.css";
import { Routes, Route } from "react-router";
import CatalogPage from "./pages/CatalogPage";
import Footer from "./components/footer/Footer";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Page404 from "./pages/Page404";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import Cart from "./pages/Cart";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<ItemDetailsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
