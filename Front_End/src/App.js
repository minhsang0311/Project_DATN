import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//Component Admin
import HomeAdmin from './admin/components/HomeAdmin.js';
import ProductList from './admin/pages/productPage/ProductList.jsx';
import CategoryList from './admin/pages/categoryPage/CategoryList.jsx';
//Component Client
import ProductDetail from './client/pages/ProductDetail';
import Register from './client/pages/register/register.jsx';
import Login from './client/pages/login/login.jsx';
import Header from './client/components/Header.js';
import ProtectedRoute from './client/reducers/ProtectedRoute.js';
import Home from './client/pages/HomePage.js';
import Nav from './client/components/Nav.js';
import Footer from './client/components/Footer.js';
import ProductAdd from './admin/pages/productPage/ProductAdd.jsx';
import ProductUpdate from './admin/pages/productPage/ProductUpdate.jsx';



function App() {
  return (
    <BrowserRouter basename="/">
      <div className="container">
        <Header/>
        <Nav/>
        <Routes>
          {/* Routes dành cho Admin */}
          <Route element={ProtectedRoute} />
            <Route path="/admin" element={<HomeAdmin />}>
              <Route path="products" element={<ProductList/>}/>
              <Route path="categories" element={<CategoryList/>}/>
              <Route path="product-add" element={<ProductAdd/>}/>
              <Route path="productUpdate/:id" element={<productUpdate/>}/>
              {/* Viết các route của admin bên dưới đây nha */}
            </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route>
            <Route path="/" element={<Home />}>
              <Route index element={<ProductDetail />} />
              {/* Viết các route của user dưới đây nha */}
            </Route>
          </Route>
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}
export default App;