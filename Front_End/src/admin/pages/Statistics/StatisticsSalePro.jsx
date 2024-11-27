import React, { useState, useEffect } from "react";
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

  // Tính toán ngày đầu và cuối của tháng trước khi component được render
  useEffect(() => {
    const now = new Date();
    const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // Định dạng yyyy-mm-dd cho input date
    const formatDate = (date) => date.toISOString().split("T")[0];

    setStartDate(formatDate(firstDayLastMonth));
    setEndDate(formatDate(lastDayLastMonth));
  }, []);

  // Tự động gọi API khi `startDate` và `endDate` được thiết lập
  useEffect(() => {
    if (startDate && endDate) {
      handleFetchData();
    }
  }, [startDate, endDate]);

  // Hàm gọi API để lấy tổng số sản phẩm bán được
  const handleFetchData = () => {
    if (!startDate || !endDate) {
      alert("Vui lòng nhập ngày bắt đầu và ngày kết thúc!");
      return;
    }

    setLoading(true);
    setError("");

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

        const totalSalePro = parseFloat(data.TotalSalePro); // Giả sử API trả về số sản phẩm bán được dưới trường "TotalSalePro"

        const label = `Tổng sản phẩm bán được từ ${startDate} đến ${endDate}`;

        setChartData({
          labels: [label],
          datasets: [
            {
              label: "Sản phẩm bán được",
              data: [totalSalePro],
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      })
      .catch(() => setError("Lỗi khi lấy dữ liệu thống kê."))
      .finally(() => setLoading(false));
  };

  return (
    <div className="revenue-statistics">
      <h2>THỐNG KÊ SẢN PHẨM ĐÃ BÁN</h2>
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
                    label: (context) => `${context.raw.toLocaleString()} sản phẩm`,
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
