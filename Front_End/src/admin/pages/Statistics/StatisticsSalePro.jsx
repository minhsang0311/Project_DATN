import React, { Fragment, useEffect, useState } from 'react';
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
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [quarterlyData, setQuarterlyData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const opt = {
      method: 'GET',
      headers: { "Content-type": "application/json", 'Authorization': 'Bearer ' + token }
    };

    axios.get('http://localhost:3000/admin/stats-weekSalePro', opt)
      .then(response => setWeeklyData(response.data))
      .catch(error => console.error('Lỗi lấy dữ liệu sản phẩm bán hàng tuần:', error));

    axios.get('http://localhost:3000/admin/stats-monthSalePro', opt)
      .then(response => setMonthlyData(response.data))
      .catch(error => console.error('Lỗi lấy dữ liệu sản phẩm bán hàng tháng:', error));

    axios.get('http://localhost:3000/admin/stats-quarterSalePro', opt)
      .then(response => setQuarterlyData(response.data))
      .catch(error => console.error('Lỗi lấy dữ liệu sản phẩm bán theo quý:', error));

    axios.get('http://localhost:3000/admin/stats-yearSalePro', opt)
      .then(response => setYearlyData(response.data))
      .catch(error => console.error('Lỗi lấy dữ liệu sản phẩm bán theo năm:', error));
  }, []);

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
    <Fragment>
      <h2>Thống kê tổng sản phẩm bán được</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        <div style={{ width: '45%', minHeight: '300px' }}>
          <h3>Sản phẩm bán theo tuần</h3>
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
        </div>

        <div style={{ width: '45%', minHeight: '300px' }}>
          <h3>Sản phẩm bán theo tháng</h3>
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
        </div>

        <div style={{ width: '45%', minHeight: '300px' }}>
          <h3>Sản phẩm bán theo quý</h3>
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
        </div>

        <div style={{ width: '45%', minHeight: '300px' }}>
          <h3>Sản phẩm bán theo năm</h3>
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
        </div>
      </div>
    </Fragment>
  );
};

export default StatisticsSalePro;
