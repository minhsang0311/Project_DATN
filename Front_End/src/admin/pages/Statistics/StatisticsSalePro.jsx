import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

// Đăng ký các thành phần của Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const StatisticsSalePro = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  // Hàm gọi API để lấy tổng doanh thu
  const handleFetchData = () => {
    if (!startDate || !endDate) {
      alert("Vui lòng nhập ngày bắt đầu và ngày kết thúc!");
      return;
    }

    setLoading(true);
    setError(""); // Reset lỗi trước khi gọi API

    fetch(`http://localhost:3000/admin/stats-statisticsSalePro?startDate=${startDate}&endDate=${endDate}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data || typeof data.TotalSalePro === "undefined") {
          setError("Dữ liệu trả về không hợp lệ.");
          return;
        }

        const totalRevenue = parseFloat(data.TotalSalePro); // Giả sử API trả về tổng doanh thu dưới trường "TotalSalePro"
        console.log(totalRevenue)
        // Xác định label: nếu ngày giống nhau thì chỉ hiển thị tổng trong ngày
        const label =
          startDate === endDate
            ? `Tổng sản phẩm bán được trong ngày ${startDate}`
            : `Tổng sản phẩm bán đưcọ từ (${startDate} đến ${endDate})`;

        // Cập nhật dữ liệu cho biểu đồ
        setChartData({
          labels: [label],
          datasets: [
            {
              label: "Tổng sản phẩm bán được (VNĐ)",
              data: [totalRevenue],
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="revenue-statistics">
      <h2>Thống Kê Tổng Sản Phẩm Đã Bán</h2>
      <div className="filter-section">
        <label>
          Ngày bắt đầu:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          Ngày kết thúc:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <button onClick={handleFetchData} disabled={loading}>
          {loading ? "Đang tải..." : "Thống kê"}
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
                    label: (context) => `${context.raw.toLocaleString()} sản phẩm`,
                  },
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: (value) => `${value.toLocaleString()} sp`,
                  },
                },
              },
            }}
          />
        ) : (
          <p>Chọn ngày để hiển thị biểu đồ.</p>
        )}
      </div>
    </div>
  );
};

export default StatisticsSalePro;
