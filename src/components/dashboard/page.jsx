// app/page.jsx (or your parent component)
import React from "react";
import "./dashboard.modules.scss";
import PieChartComponent from "@/components/charts/PieChart";
import Table from "../users/Table";

export default function Dashboard() {
  const sampleData = [
    {name: `Active Products`, value: 400},
    {name: `Inactive Products`, value: 300},
  ];

  return (
    <main className="dashboard">
      <div className="dashboard__main-top">
        <div className="dashboard__left">
          <h2 className="dashboard__title">Dashboard</h2>
          <div className="dashboard__top-boxes">
            <span className="dashboard__tboxes-item">
              <span className="dashboard__tbox-health-title">database:</span>
              <span className="dashboard__tbox-health-sub">up</span>
            </span>
            <span className="dashboard__tboxes-item">
              <span className="dashboard__tbox-health-title">uptime:</span>
              <span className="dashboard__tbox-health-sub">5364523+ sec</span>
            </span>
            <span className="dashboard__tboxes-item">
              <span className="dashboard__tbox-health-title">timestamp:</span>
              <span className="dashboard__tbox-health-sub">
                493-49304-3-43-9
              </span>
            </span>
          </div>

          <div className="dashboard__top-cards">
            <div className="dashboard__tcards-item">
              <span className="dashboard__tcards-item-box">
                Total products:
                <span className="dashboard__tcards-item-mtxt">2390</span>
              </span>
              <span className="dashboard__tcards-item-svg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 1L21.5 6.5V17.5L12 23L2.5 17.5V6.5L12 1ZM6.49896 9.97089L11 12.5768V17.6252H13V12.5768L17.501 9.9709L16.499 8.24005L12 10.8447L7.50104 8.24004L6.49896 9.97089Z"></path>
                </svg>
              </span>
            </div>
            <div className="dashboard__tcards-item">
              <span className="dashboard__tcards-item-box">
                Total categories:
                <span className="dashboard__tcards-item-mtxt">2390</span>
              </span>
              <span className="dashboard__tcards-item-svg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M10.9042 2.10025L20.8037 3.51446L22.2179 13.414L13.0255 22.6063C12.635 22.9969 12.0019 22.9969 11.6113 22.6063L1.71184 12.7069C1.32131 12.3163 1.32131 11.6832 1.71184 11.2926L10.9042 2.10025ZM13.7327 10.5855C14.5137 11.3666 15.78 11.3666 16.5611 10.5855C17.3421 9.80448 17.3421 8.53815 16.5611 7.7571C15.78 6.97606 14.5137 6.97606 13.7327 7.7571C12.9516 8.53815 12.9516 9.80448 13.7327 10.5855Z"></path>
                </svg>
              </span>
            </div>
            <div className="dashboard__tcards-item">
              <span className="dashboard__tcards-item-box">
                Average Price:
                <span className="dashboard__tcards-item-mtxt">$2390</span>
              </span>
              <span className="dashboard__tcards-item-svg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M2 13H8V21H2V13ZM9 3H15V21H9V3ZM16 8H22V21H16V8Z"></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
        <PieChartComponent chartData={sampleData} />
      </div>
      <div className="dashboard__main-bottom">
        <Table/>
      </div>
    </main>
  );
}
