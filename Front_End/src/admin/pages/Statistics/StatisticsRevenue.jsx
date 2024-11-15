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

const RevenueStatistics = () => {
  const [daylyData, setDaylyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [quarterlyData, setQuarterlyData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const opt = {
      method: 'GET',
      headers: { "Content-type": "application/json", 'Authorization': `Bearer ${token}` }
    };

    // Fetch daily revenue data
    axios.get('http://localhost:3000/admin/stats-dayRevenue', opt)
      .then(response => setDaylyData(response.data))
      .catch(error => console.error('Lỗi lấy dữ liệu doanh thu hàng ngày:', error));

    // Fetch other data (weekly, monthly, quarterly, yearly) as before
    axios.get('http://localhost:3000/admin/stats-weekRevenue', opt)
      .then(response => setWeeklyData(response.data))
      .catch(error => console.error('Lỗi lấy dữ liệu doanh thu hàng tuần:', error));

    axios.get('http://localhost:3000/admin/stats-monthRevenue', opt)
      .then(response => setMonthlyData(response.data))
      .catch(error => console.error('Lỗi lấy dữ liệu doanh thu hàng tháng:', error));

    axios.get('http://localhost:3000/admin/stats-quarterRevenue', opt)
      .then(response => setQuarterlyData(response.data))
      .catch(error => console.error('Lỗi lấy dữ liệu doanh thu theo quý:', error));

    axios.get('http://localhost:3000/admin/stats-yearRevenue', opt)
      .then(response => setYearlyData(response.data))
      .catch(error => console.error('Lỗi lấy dữ liệu doanh thu theo năm:', error));

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
      <h2>Thống kê doanh thu</h2>

      {/* Table for daily revenue */}
      <div style={{ width: '100%', minHeight: '300px' }}>
        <h3>Doanh thu theo ngày</h3>
        {daylyData.length > 0 ? (
          <div>
            {/* Table to display daily revenue */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Ngày</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Doanh thu (VNĐ)</th>
                </tr>
              </thead>
              <tbody>
                {daylyData.map((day, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                      {day.sale_date}
                    </td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                      {Number(day.total_revenue).toLocaleString('vi')} VNĐ
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

      {/* Bar charts for weekly, monthly, quarterly, and yearly revenue */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        <div style={{ width: '45%', minHeight: '300px' }}>
          <h3>Doanh thu theo tuần</h3>
          <Bar
            data={createChartData(
              weeklyData.map(week => week.week_label),
              weeklyData.map(week => week.weekly_revenue),
              'Doanh thu theo tuần (VNĐ)',
              'rgba(75, 192, 192, 0.6)'
            )}
            options={{
              responsive: true,
              plugins: { legend: { position: 'top' } },
              scales: { y: { beginAtZero: true } },
            }}
          />
        </div>

        <div style={{ width: '45%', minHeight: '300px' }}>
          <h3>Doanh thu theo tháng</h3>
          <Bar
            data={createChartData(
              monthlyData.map(month => month.month),
              monthlyData.map(month => month.monthly_revenue),
              'Doanh thu theo tháng (VNĐ)',
              'rgba(153, 102, 255, 0.6)'
            )}
            options={{
              responsive: true,
              plugins: { legend: { position: 'top' } },
              scales: { y: { beginAtZero: true } },
            }}
          />
        </div>

        <div style={{ width: '45%', minHeight: '300px' }}>
          <h3>Doanh thu theo quý</h3>
          <Bar
            data={createChartData(
              quarterlyData.map(quarter => quarter.quarter_label),
              quarterlyData.map(quarter => quarter.quarterly_revenue),
              'Doanh thu theo quý (VNĐ)',
              'rgba(255, 159, 64, 0.6)'
            )}
            options={{
              responsive: true,
              plugins: { legend: { position: 'top' } },
              scales: { y: { beginAtZero: true } },
            }}
          />
        </div>

        <div style={{ width: '45%', minHeight: '300px' }}>
          <h3>Doanh thu theo năm</h3>
          <Bar
            data={createChartData(
              yearlyData.map(year => year.year),
              yearlyData.map(year => year.yearly_revenue),
              'Doanh thu theo năm (VNĐ)',
              'rgba(255, 99, 132, 0.6)'
            )}
            options={{
              responsive: true,
              plugins: { legend: { position: 'top' } },
              scales: { y: { beginAtZero: true } },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RevenueStatistics;
