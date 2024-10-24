import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Statistics = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalCategories: 0,
        totalViews: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Gọi API để lấy dữ liệu thống kê
        axios.get('http://localhost:3000/admin/stats')
            .then(response => {
                setStats(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Lỗi lấy dữ liệu thống kê');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    // Dữ liệu cho biểu đồ tròn (Pie chart)
    const pieData = {
        labels: ['Sản phẩm', 'Danh mục'],
        datasets: [
            {
                data: [stats.totalProducts, stats.totalCategories],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    };

    // Dữ liệu cho biểu đồ cột (Bar chart)
    const barData = {
        labels: ['Lượt xem'],
        datasets: [
            {
                label: 'Tổng số lượt xem sản phẩm',
                data: [stats.totalViews],
                backgroundColor: '#36A2EB',
                hoverBackgroundColor: '#36A2EB',
            },
        ],
    };

    return (
        <div>
            <h2>Thống kê</h2>
            <div style={{ width: '400px', margin: 'auto' }}>
                <h3>Biểu đồ tròn: Sản phẩm vs Danh mục</h3>
                <Pie data={pieData} />

                <h3>Biểu đồ cột: Lượt xem sản phẩm</h3>
                <Bar data={barData} />
            </div>
        </div>
    );
};

export default Statistics;
