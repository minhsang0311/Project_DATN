import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const StatisticsRevenue = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleFetchData = () => {
    if (!startDate || !endDate) {
      alert("Vui lòng nhập ngày bắt đầu và ngày kết thúc!");
      return;
    }

    setLoading(true);
    fetch(`http://localhost:3000/admin/stats-statisticsRevenue?startDate=${startDate}&endDate=${endDate}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data || typeof data.TotalRevenue === "undefined") {
          alert("Dữ liệu trả về không hợp lệ.");
          return;
        }

        const totalRevenue = parseFloat(data.TotalRevenue);

        // Xác định label: nếu ngày giống nhau thì chỉ hiển thị tổng trong ngày
        const label =
          startDate === endDate
            ? `Tổng doanh thu ngày ${startDate}`
            : `Tổng doanh thu (${startDate} đến ${endDate})`;

        setChartData({
          labels: [label],
          datasets: [
            {
              label: "Tổng Doanh thu (VNĐ)",
              data: [totalRevenue],
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching total revenue data:", error);
        alert("Lỗi khi lấy dữ liệu tổng doanh thu.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="revenue-statistics">
      <h2>Thống Kê Tổng Doanh Thu</h2>
      <div className="filter-section">
        <label>
          Ngày bắt đầu:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label>
          Ngày kết thúc:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
        <button onClick={handleFetchData} disabled={loading}>
          {loading ? "Đang tải..." : "Thống kê"}
        </button>
      </div>
      <div className="chart-section">
        {chartData ? (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "top" },
                tooltip: {
                  callbacks: {
                    label: (context) => `${context.raw.toLocaleString()} VNĐ`,
                  },
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: (value) => `${value.toLocaleString()} VNĐ`,
                  },
                },
              },
            }}
          />
        ) : (
          <p>
            {/* Chọn ngày để hiển thị biểu đồ. */}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatisticsRevenue;
