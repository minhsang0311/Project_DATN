// import React, { useEffect, useState, Fragment } from 'react';
// import { Pie } from 'react-chartjs-2';
// import {
//     Chart as ChartJS,
//     ArcElement,
//     Tooltip,
//     Legend
// } from 'chart.js';

// ChartJS.register(
//     ArcElement,
//     Tooltip,
//     Legend
// );

// const StatisticsUser = () => {
//     const [categoryData, setCategoryData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetch('http://localhost:3000/admin/stats-procate')
//             .then(res => res.json())
//             .then(data => {
//                 setCategoryData(data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 setError('Lỗi lấy dữ liệu biểu đồ');
//                 setLoading(false);
//             });
//     }, []);

//     const totalProducts = categoryData.reduce((acc, category) => acc + category.totalProCate, 0);
//     const totalCategories = categoryData.length;

//     // Dữ liệu cho biểu đồ tròn (Pie chart)
//     const pieData = categoryData.length > 0 ? {
//         labels: categoryData.map(item => item.Category_Name),
//         datasets: [
//             {
//                 data: categoryData.map(item => item.totalProCate),
//                 backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
//                 hoverBackgroundColor: ['#38A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
//             },
//         ],
//     } : null;

//     if (loading) return <p>Đang tải dữ liệu...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <div className='statistics-chillrend'>
//             <h2>Bểu đồ thống kê sản phẩm</h2>
//             <div className='statistics'>
//                 <div className='right'>
//                     <table className="vertical-table">
//                         <tbody>
//                             <tr>
//                                 <th>Tổng số sản phẩm</th>
//                                 <td>{totalProducts}</td>
//                             </tr>
//                             <tr>
//                                 <th>Tổng số danh mục</th>
//                                 <td>{totalCategories}</td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//                 <div className='left'>
//                     <div>
//                         <h2>Sản phẩm theo danh mục</h2>
//                         {pieData && (
//                             <>
//                                 <Pie data={pieData} />
//                             </>
//                         )}
//                     </div>
//                 </div>
//                 <div className='left'>
//                     <div>
//                         <h2>Sản phẩm theo hãng</h2>
//                         {pieData && (
//                             <>
//                                 <Pie data={pieData} />
//                             </>
//                         )}
//                     </div>
//                 </div>
//             </div>
            
//         </div>
//     );
// };

// export default StatisticsUser;
