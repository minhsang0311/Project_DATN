import logo from './logo.svg';
import './App.css';
import Footer from './client/components/Footer';
import ProductDetail from './client/pages/ProductDetail'; 
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './client/components/Header'; 
import RelatedProducts from './client/pages/RelatedProducts';
function App() {
  return (
    <Router>
      <header><Header/></header>
      <div className="App">
        <header className="App-header">
        
          <Link to="/" className="App-link">Trang Chủ</Link>
          <Link to="/product-detail" className="App-link">Xem Chi Tiết Sản Phẩm</Link>
        </header>

        <Routes>
         
          <Route path="/product-detail" element={<ProductDetail />} /> {/* Đường dẫn đến ProductDetail */}
          
        </Routes>
      </div>
      <footer><Footer/></footer>
    </Router>
  );
}

export default App;
