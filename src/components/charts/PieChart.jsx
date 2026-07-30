// components/PieChartComponent.jsx
"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["var(--app-blue)", "var(--app-green)", "var(--app-yellow)", "var(--app-red)", "var(--app-purple)"];

const RenderCustomLegend = ({payload}) => {
  return (
    <ul className="dashboard__pie-ul">
      {payload.map((entry, index) => (
        <li key={`item-${index}`} className="dashboard__pie-li">
          <span
            className="dashboard__pie-span-color"
            style={{
              backgroundColor: entry.color,
              width: "12px",
              height: "12px",
              borderRadius: "50px",
            }}
          />
          <span style={{fontWeight: "500", color: "var(--text-main"}}>
            {entry.value}:{" "}
            <span style={{color: "var(--text-muted)"}}>
              {entry.payload.value}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
};

export default function PieChartComponent({chartData}) {
  return (
    <div className="dashboard__pie dashboard__tcards-item">
      <ResponsiveContainer>
        <PieChart >
          <span>
            <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            dataKey="value"
            stroke="none" 
            activeShape={false}
            
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          </span>
          
          <Tooltip/>
          <Legend layout="vertical" 
            verticalAlign="middle" 
            align="right"  content={<RenderCustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
