import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#22c55e", "#ef4444"]; // green = income, red = expense

const IncomeExpensePieChart = ({ income, expense }) => {
  const data = [
    { name: "Income", value: 455000 },
    { name: "Expenses", value: 544 },
  ];

  const isEmpty = data.every((item) => item.value === 0);

  if (isEmpty) {
    return (
      <p style={{ textAlign: "center", color: "gray", marginTop: "1rem" }}>
        No income or expense data to visualize yet.
      </p>
    );
  }

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeExpensePieChart;
