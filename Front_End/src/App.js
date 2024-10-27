import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Component Admin
import HomeAdmin from './admin/components/HomeAdmin.js';
import ProductList from './admin/pages/productPage/ProductList.jsx';
import ProductAdd from './admin/pages/productPage/ProductAdd.jsx';
import CategoryList from './admin/pages/categoryPage/CategoryList.jsx';
import CategoryAdd from './admin/pages/categoryPage/CategoryAdd.jsx';
import CategoryUpdate from './admin/pages/categoryPage/CategoryUpdate.jsx';
import ProductUpdate from './admin/pages/productPage/ProductUpdate.jsx';
import Statistics from './admin/pages/Statistics/Statistics.jsx';

// Component Client
import ProductDetail from './client/pages/ProductDetail';
import Register from './client/pages/register/register.jsx';
import Login from './client/pages/login/login.jsx';
import Header from './client/components/Header.js';
import ProtectedRoute from './client/reducers/ProtectedRoute.js';
import Home from './client/pages/HomePage.js';
import Nav from './client/components/Nav.js';
import Footer from './client/components/Footer.js';
import DangNhap from './client/pages/login/login.jsx';

import CategoryProducts from './client/pages/CategoryProducts.js';



import Productsbycategory from './client/pages/Productsbycategory.js';
import ProductAddtocart from './client/pages/Addtocart.js';


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
              <Route index element={<Statistics />} />
              <Route path="products" element={<ProductList />} />
              <Route path="product-add" element={<ProductAdd />} />
              <Route path="productUpdate/:id" element={<ProductUpdate />} /> 
              <Route path="category" element={<CategoryList />} />
              <Route path="categoryAdd" element={<CategoryAdd />} />
              <Route path="categoryUpdate/:id" element={<CategoryUpdate />} />
              {/* Các route admin khác có thể thêm bên dưới */}
            </Route>
          {/* </Route> */}

          {/* Routes dành cho người dùng */}
          <Route path="/login" element={<DangNhap />} />
          <Route path="/register" element={<Register />} />
          {/* <HEAD></HEAD> */}
          <Route/>
            <Route path="/" element={<Home />}>
           
              {/* Viết các route của user dưới đây nha */}
            </Route>
            <Route path="/productDetail/:id" element={<ProductDetail/>}/>
            <Route path="/productsbycategory/:id" element={<Productsbycategory />} />
            <Route path="/productsaddtocart" element={<ProductAddtocart/>}/>
          <Route path="/" element={<Home />}>

          </Route>
          {/* Các route khác của user */}

          <Route path="/productDetail/:id" element={<ProductDetail />} />
          <Route path="/category/:Category_ID" element={<CategoryProducts />} />  {/* Thêm route */}
         
  <Route path="/productDetail/:id" element={<ProductDetail />} ></Route>

        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
