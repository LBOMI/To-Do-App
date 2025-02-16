import React from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from "recharts";
import styled from "styled-components";

const Dashboard = ({ tasks }) => {
  // 완료된 할 일 & 미완료 할 일 개수 계산
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  // 원형 차트 데이터 (완료 vs 미완료)
  const pieData = [
    { name: "완료", value: completedTasks },
    { name: "미완료", value: pendingTasks },
  ];
  const COLORS = ["#00C49F", "#FFBB28"]; // 완료(초록), 미완료(노랑)

  // 마감 기한별 할 일 개수 분석 (막대 그래프)
  const getDaysLeft = (deadline) => {
    const now = new Date();
    const dueDate = new Date(deadline);
    return Math.max(0, Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24))); // 남은 일 수 계산
  };

  const deadlineData = tasks.map((task) => ({
    name: `${getDaysLeft(task.deadline)}일 후`,
    count: 1,
  }));

  // 일주일간 완료된 할 일 개수 (라인 차트)
  const last7Days = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split("T")[0];
  }).reverse();

  const weeklyData = last7Days.map((day) => ({
    date: day,
    count: tasks.filter((task) => task.completed && task.deadline.startsWith(day)).length,
  }));

  return (
    <DashboardContainer>
      <h2>📊 할 일 통계</h2>
      <ChartContainer>
      {/* 완료된 할 일 vs 미완료 할 일 (원형 차트) */}
      <ChartWrapper>
        <h3>완료율</h3>
        <PieChart width={200} height={200}>
          <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8">
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ChartWrapper>

      {/* 마감 기한별 할 일 개수 (막대 차트) */}
      <ChartWrapper>
        <h3>마감 기한 분포</h3>
        <BarChart width={300} height={200} data={deadlineData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ChartWrapper>

      {/* 일주일간 완료한 할 일 개수 (라인 차트) */}
      {/* <ChartWrapper>
        <h3>일주일간 완료한 할 일</h3>
        <LineChart width={300} height={200} data={weeklyData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </ChartWrapper> */}
      </ChartContainer>
    </DashboardContainer>
  );
};

export default Dashboard;

const ChartContainer = styled.div`
  float: right;
  display: flex;
  padding: 20px;
  text-align: center;
  color: ${(props) => props.theme.text};
  border-radius: 10px;
`;

const DashboardContainer = styled.div`
  max-width: 600px;
  margin: 20px 10px;
  text-align: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.backgroundTodo};
  color: ${(props) => props.theme.text};
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const ChartWrapper = styled.div`
  margin: 20px 0;
`;
