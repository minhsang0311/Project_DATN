import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StatisticsSalePro = () => {
  const [daylyData, setDaylyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [quarterlyData, setQuarterlyData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const opt = {
          method: 'GET',
          headers: { "Content-type": "application/json", 'Authorization': `Bearer ${token}` }
        };

        // Lấy dữ liệu sản phẩm bán theo ngày
        const daylyRes = await axios.get('http://localhost:3000/admin/stats-daySalePro', opt);
        setDaylyData(daylyRes.data);

        // Các API khác cho tuần, tháng, quý, năm
        const weeklyRes = await axios.get('http://localhost:3000/admin/stats-weekSalePro', opt);
        setWeeklyData(weeklyRes.data);

        const monthlyRes = await axios.get('http://localhost:3000/admin/stats-monthSalePro', opt);
        setMonthlyData(monthlyRes.data);

        const quarterlyRes = await axios.get('http://localhost:3000/admin/stats-quarterSalePro', opt);
        setQuarterlyData(quarterlyRes.data);

        const yearlyRes = await axios.get('http://localhost:3000/admin/stats-yearSalePro', opt);
        setYearlyData(yearlyRes.data);

      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };

    fetchData();
  }, [token]);

  const createChartData = (labels, data, label, color) => ({
    labels,
    datasets: [
      {
        label,
        data,
        backgroundColor: color,
        borderColor: color.replace('0.6', '1'),
        borderWidth: 1,
      },
    ],
  });

  return (
    <div className='statistics-chillrend-header'>
      <h2>Thống kê tổng sản phẩm bán được</h2>
      {/* Sản phẩm bán theo ngày */}
      <div style={{ width: '100%', minHeight: '300px' }}>
        <h3>Sản phẩm bán theo ngày</h3>
        {daylyData.length > 0 ? (
          <div>
            {/* Table to display daily sales */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Ngày</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Số lượng sản phẩm bán</th>
                </tr>
              </thead>
              <tbody>
                {daylyData.map((day, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                      {day.sale_date}
                    </td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                      {day.total_sale_quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Đang tải dữ liệu...</p>
        )}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {/* Sản phẩm bán theo tuần */}
        <div style={{ width: '45%', minHeight: '300px' }}>
          <h3>Sản phẩm bán theo tuần</h3>
          {weeklyData.length > 0 ? (
            <Bar
              data={createChartData(
                weeklyData.map(week => week.week_label),
                weeklyData.map(week => week.weekly_salepro),
                'Tổng sản phẩm bán theo tuần',
                'rgba(75, 192, 192, 0.6)'
              )}
              options={{
                responsive: true,
                plugins: { legend: { position: 'top' } },
                scales: { y: { beginAtZero: true } },
              }}
            />
          ) : (
            <p>Đang tải dữ liệu...</p>
          )}
        </div>

        {/* Sản phẩm bán theo tháng */}
        <div style={{ width: '45%', minHeight: '300px' }}>
          <h3>Sản phẩm bán theo tháng</h3>
          {monthlyData.length > 0 ? (
            <Bar
              data={createChartData(
                monthlyData.map(month => month.month),
                monthlyData.map(month => month.monthly_salepro),
                'Tổng sản phẩm bán theo tháng',
                'rgba(153, 102, 255, 0.6)'
              )}
              options={{
                responsive: true,
                plugins: { legend: { position: 'top' } },
                scales: { y: { beginAtZero: true } },
              }}
            />
          ) : (
            <p>Đang tải dữ liệu...</p>
          )}
        </div>

        {/* Sản phẩm bán theo quý */}
        <div style={{ width: '45%', minHeight: '300px' }}>
          <h3>Sản phẩm bán theo quý</h3>
          {quarterlyData.length > 0 ? (
            <Bar
              data={createChartData(
                quarterlyData.map(quarter => quarter.quarter_label),
                quarterlyData.map(quarter => quarter.quarterly_salepro),
                'Tổng sản phẩm bán theo quý',
                'rgba(255, 159, 64, 0.6)'
              )}
              options={{
                responsive: true,
                plugins: { legend: { position: 'top' } },
                scales: { y: { beginAtZero: true } },
              }}
            />
          ) : (
            <p>Đang tải dữ liệu...</p>
          )}
        </div>

        {/* Sản phẩm bán theo năm */}
        <div style={{ width: '45%', minHeight: '300px' }}>
          <h3>Sản phẩm bán theo năm</h3>
          {yearlyData.length > 0 ? (
            <Bar
              data={createChartData(
                yearlyData.map(year => year.year),
                yearlyData.map(year => year.yearly_salepro),
                'Tổng sản phẩm bán theo năm',
                'rgba(255, 99, 132, 0.6)'
              )}
              options={{
                responsive: true,
                plugins: { legend: { position: 'top' } },
                scales: { y: { beginAtZero: true } },
              }}
            />
          ) : (
            <p>Đang tải dữ liệu...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatisticsSalePro;
