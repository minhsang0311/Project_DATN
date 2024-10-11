import logo from './logo.svg';
import './App.css';
import ProductDetail from './client/pages/ProductDetail'; 
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; 

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        
          <Link to="/" className="App-link">Trang Chủ</Link>
          <Link to="/product-detail" className="App-link">Xem Chi Tiết Sản Phẩm</Link>
        </header>

        <Routes>
         
          <Route path="/product-detail" element={<ProductDetail />} /> {/* Đường dẫn đến ProductDetail */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
