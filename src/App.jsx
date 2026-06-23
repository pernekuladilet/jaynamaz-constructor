import { BrowserRouter, Routes, Route, ScrollRestoration } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import TemplatesPage from './pages/TemplatesPage.jsx';
import CustomizerPage from './pages/CustomizerPage.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/"          element={<HomePage />} />
              <Route path="/templates" element={<TemplatesPage />} />
              <Route path="/customize" element={<CustomizerPage />} />
              <Route path="/cart"      element={<CartPage />} />
              <Route path="/checkout"  element={<CheckoutPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
