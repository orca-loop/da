import { Routes, Route } from 'react-router';
import Home from '@/pages/Home';
import Stay from '@/pages/Stay';
import Menu from '@/pages/Menu';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import Confirmation from '@/pages/Confirmation';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stay" element={<Stay />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/confirmation" element={<Confirmation />} />
    </Routes>
  );
}
