import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const StatisticsRevenue = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [error, setError] = useState(null); // Xử lý lỗi hiển thị
  const token = localStorage.getItem("token");

  useEffect(() => {
    const now = new Date();
    const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    const formatDate = (date) => date.toLocaleDateString("en-CA");

    const start = formatDate(firstDayLastMonth);
    const end = formatDate(lastDayLastMonth);

    setStartDate(start);
    setEndDate(end);

    fetchTotalRevenue(); // Lấy tổng doanh thu
    handleFetchData(start, end); // Lấy dữ liệu mặc định
  }, []);

  const fetchTotalRevenue = () => {
    fetch(`${process.env.REACT_APP_HOST_URL}admin/stats-totalRevenue`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data || typeof data.TotalRevenue === "undefined") {
          setError("Dữ liệu tổng doanh thu không hợp lệ.");
          return;
        }
        setTotalRevenue(parseFloat(data.TotalRevenue));
      })
      .catch((error) => {
        console.error("Lỗi khi lấy tổng doanh thu:", error);
        setError("Lỗi khi lấy tổng doanh thu.");
      });
  };

  const handleFetchData = (start = startDate, end = endDate) => {
    if (!start || !end) {
      setError("Vui lòng nhập ngày bắt đầu và ngày kết thúc!");
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`${process.env.REACT_APP_HOST_URL}admin/stats-statisticsRevenue?startDate=${start}&endDate=${end}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Dữ liệu trả về không hợp lệ.");
        return res.json();
      })
      .then((data) => {
        if (!data || !data.data) {
          setError("Không có dữ liệu trong khoảng thời gian này.");
          return;
        }

        const labels = data.data.map((entry) => entry.Date.split("T")[0]);
        const revenues = data.data.map((entry) => parseFloat(entry.TotalRevenue));

        setChartData({
          labels,
          datasets: [
            {
              label: "Doanh thu (VNĐ)",
              data: revenues,
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => {
        console.log("Lỗi khi lấy dữ liệu doanh thu:", error);
        setError("Lỗi khi lấy dữ liệu doanh thu.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="revenue-statistics">
      <h2>THỐNG KÊ DOANH THU</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="table-section" style={{ marginBottom: "15px" }}>
        {totalRevenue !== null && (
          <table>
            <thead>
              <tr>
                <th>Tổng tất cả doanh thu</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{totalRevenue.toLocaleString()} VNĐ</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
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
        <button onClick={() => handleFetchData()} disabled={loading}>
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
                x: { title: { display: true, text: "Ngày" } },
                y: {
                  beginAtZero: true,
                  title: { display: true, text: "Doanh thu (VNĐ)" },
                  ticks: {
                    callback: (value) => `${value.toLocaleString()} VNĐ`,
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

export default StatisticsRevenue;
