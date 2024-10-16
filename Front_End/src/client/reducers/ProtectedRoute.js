// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const user = useSelector(state => state.auth?.user);
  const daDangNhap = useSelector(state => state.auth?.daDangNhap);
  const isAdmin = user?.role === 'admin';

  if (!daDangNhap) {
    return <Navigate to="/dangnhap" />;
  }

  if (!isAdmin) {
    return <Navigate to="/" />; // Hoặc chuyển hướng đến trang không có quyền truy cập
  }

  return <Outlet />;
};

export default ProtectedRoute;
