import './App.css';
import ProductDetail from './client/pages/ProductDetail';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './client/pages/register/register.jsx';
import Login from './client/pages/login/login.jsx';
import HeaderAdmin from './admin/components/HeaderAdmin.js';
import Header from './client/components/Header.js';
import ProductPage from './admin/pages/ProductPage.js';
import ProtectedRoute from './client/reducers/ProtectedRoute.js';
import CartPage from './client/pages/CartPage.js';



function App() {
  return (

    <BrowserRouter basename="/">
      <div className="main--content">
        <Routes>
          {/* Routes dành cho Admin */}
          <Route element={ProtectedRoute} />
            <Route path="/admin" element={<HeaderAdmin />}>
              <Route index element={<ProductPage />} />
              {/* Viết các route của admin bên dưới đây nha */}
            </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route>
            <Route path="/" element={<Header />}>
              <Route index element={<ProductDetail />} />
              <Route path='register' element={<Register />} />
              <Route path='login' element={<Login />} />
              <Route path='cart' element={<CartPage />} />
              

              

              {/* Viết các route của user dưới đây nha */}
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
// import Footer from './client/components/Footer';
// import ProductDetail from './client/pages/ProductDetail'; 
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import Header from './client/components/Header'; 
// import RelatedProducts from './client/pages/RelatedProducts';
// function App() {
//   return (
//     <Router>
//       <header><Header/></header>
//       <div className="App">
//         <header className="App-header">
        
//           <Link to="/" className="App-link">Trang Chủ</Link>
//           <Link to="/product-detail" className="App-link">Xem Chi Tiết Sản Phẩm</Link>
//         </header>

//         <Routes>
         
//           <Route path="/product-detail" element={<ProductDetail />} /> {/* Đường dẫn đến ProductDetail */}
          
//         </Routes>
//       </div>
//       <footer><Footer/></footer>
//     </Router>

  );
}
export default App;