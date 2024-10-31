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
import Comments from './admin/pages/commentPage/commentList.jsx';    
import Statistics from './admin/pages/Statistics/Statistics.jsx';

// Component Client
import ProductDetail from './client/pages/ProductDetail';
import Home from './client/pages/HomePage.js';
import About from './client/pages/About.js';
import CategoryProducts from './client/pages/CategoryProducts.js';
import Search from './client/pages/Search.js';
import RegisterLogin from './client/pages/register_login/register_login.jsx';
import CartPage from './client/pages/CartPage.js';
import ForgotPassword from './client/pages/forgotPassword.js';
import ResetPassword from './client/pages/resetPassword.js';

function App() {
  return (
    <BrowserRouter basename="/">
<<<<<<< HEAD
      <Routes>
        {/* <Route element={<ProtectedRoute />}> */}
        <Route path="/admin" element={<HomeAdmin />}>
          <Route index element={<Statistics />} />
          <Route path="products" element={<ProductList />} />
          <Route path="product-add" element={<ProductAdd />} />
          <Route path="productUpdate/:id" element={<ProductUpdate />} />
          <Route path="category" element={<CategoryList />} />
          <Route path="categoryAdd" element={<CategoryAdd />} />
          <Route path="categoryUpdate/:id" element={<CategoryUpdate />} />
          <Route path="comments" element={<Comments />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/register_login" element={<RegisterLogin />} />
        <Route path="/productDetail/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/category/:Category_ID" element={<CategoryProducts />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
=======
        <Routes>

          {/* Admin Routes */}
  {/* <Route element={<ProtectedRoute />}> */}

          <Route path="/admin" element={<HomeAdmin />}>
            <Route index element={<Statistics />} />
            <Route path="products" element={<ProductList />} />
            <Route path="product-add" element={<ProductAdd />} />
            <Route path="productUpdate/:id" element={<ProductUpdate />} />
            <Route path="category" element={<CategoryList />} />
            <Route path="categoryAdd" element={<CategoryAdd />} />
            <Route path="categoryUpdate/:id" element={<CategoryUpdate />} />
            <Route path="comments" element={<Comments />} />

            {/* Các route admin khác có thể thêm bên dưới */}
          </Route>
          {/* </Route> */}


          <Route path="/" element={<Home />}>

          </Route>

          {/* Client Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register_login" element={<RegisterLogin />} />

          <Route path="/productDetail/:id" element={<ProductDetail />} />
          {/* <Route path="/productsaddtocart" element={<ProductAddtocart />} /> */}
          <Route />

        
          <Route path="/" element={<Home />}></Route>

          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/productDetail/:id" element={<ProductDetail />} />
          <Route path="/category/:Category_ID" element={<CategoryProducts />} />
          <Route path="/cart" element={<CartPage />} />


        </Routes>
>>>>>>> 67532b05ca6f15896d26b8bdbac23ba24afe3ee8
    </BrowserRouter>
  );
}

export default App;
