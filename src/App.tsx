import Header from "./components/header/Header";
import "./App.css";
import { Routes, Route } from "react-router";
import CatalogPage from "./components/pages/CatalogPage";
import Footer from "./components/footer/Footer";
import Homepage from "./components/pages/Homepage";
import About from "./components/pages/About";
import Contacts from "./components/pages/Contacts";
import Page404 from "./components/pages/Page404";
import ItemDetailsPage from "./components/pages/ItemDetailsPage";
import Cart from "./components/pages/Cart";

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
