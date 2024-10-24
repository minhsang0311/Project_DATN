import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Component Admin
import HomeAdmin from './admin/components/HomeAdmin.js';
import ProductList from './admin/pages/productPage/ProductList.jsx';
import CategoryList from './admin/pages/categoryPage/CategoryList.jsx';
import ProductAdd from './admin/pages/productPage/ProductAdd.jsx';
import ProductUpdate from './admin/pages/productPage/ProductUpdate.jsx';

// Component Client
import ProductDetail from './client/pages/ProductDetail';
import Register from './client/pages/register/register.jsx';
import Login from './client/pages/login/login.jsx';
import Header from './client/components/Header.js';
import ProtectedRoute from './client/reducers/ProtectedRoute.js';
import Home from './client/pages/HomePage.js';
import Nav from './client/components/Nav.js';
import Footer from './client/components/Footer.js';

function App() {
  return (
    <BrowserRouter basename="/">
      <div className="container">
        <Header />
        <Nav />
        <Routes>
          {/* Routes dành cho Admin */}
          {/* <Route element={<ProtectedRoute />}> */}
            <Route path="/admin" element={<HomeAdmin />}>
              <Route path="products" element={<ProductList />} />
              <Route path="categories" element={<CategoryList />} />
              <Route path="product-add" element={<ProductAdd />} />
              <Route path="product-update/:id" element={<ProductUpdate />} />
              {/* Các route admin khác có thể thêm bên dưới */}
            </Route>
          {/* </Route> */}

          {/* Routes dành cho người dùng */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />}>
         

            </Route>
          {/* Các route khác của user */} 
          <Route path="/productDetail/:id" element={<ProductDetail />} >
          
          </Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
